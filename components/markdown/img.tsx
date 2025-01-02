'use client';

import clsx from 'clsx';
import type { Dispatch, ImgHTMLAttributes, RefObject, SetStateAction } from 'react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type ImgProps = {
    props: ImgHTMLAttributes<HTMLImageElement>;
    setStatus: Dispatch<SetStateAction<boolean>>;
    imgRef: RefObject<HTMLImageElement>;
};

function Mask({ props, setStatus, imgRef }: ImgProps) {
    const [opacity, setOpacity] = useState(0.7);
    const [transform, setTransform] = useState('');
    const { top, left, width, height } = imgRef.current.getBoundingClientRect();

    const calcTransfrom = () => {
        window.requestAnimationFrame(() => setTransform(calcFitScale(imgRef.current)));
    };

    useEffect(() => calcTransfrom(), []);

    const close = () => {
        window.requestAnimationFrame(() => {
            setOpacity(0);
            setTransform('');
            setTimeout(() => setStatus(false), 300);
        });
    };

    // 绑定滚动跟窗口尺寸变化事件
    useEffect(() => {
        window.addEventListener('scroll', close);
        window.addEventListener('resize', calcTransfrom);
        return () => {
            window.removeEventListener('scroll', close);
            window.removeEventListener('resize', calcTransfrom);
        };
    }, []);

    return createPortal(
        <div onClick={close} className="cursor-zoom-out">
            <div
                className="fixed inset-0 z-30 bg-black"
                style={{
                    opacity,
                    transition: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            />
            <img
                alt={props.alt || 'image'}
                src={props.src}
                className="absolute z-30 rounded"
                style={{
                    transition: 'transform 300ms cubic-bezier(.2, 0, .2, 1)',
                    top: top + window.scrollY,
                    left: left + window.scrollX,
                    width,
                    height,
                    transform,
                }}
            />
        </div>,
        document.body,
    );
}

export default function Img(props: ImgHTMLAttributes<HTMLImageElement>) {
    const [status, setStatus] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    return (
        <>
            <img
                {...props}
                alt={props.alt || 'image'}
                ref={imgRef}
                className={clsx('rounded shadow', status ? 'invisible' : 'cursor-zoom-in')}
                onClick={() => setStatus(true)}
                loading="lazy"
            />
            {status && <Mask props={props} setStatus={setStatus} imgRef={imgRef as RefObject<HTMLImageElement>} />}
        </>
    );
}

/**
 * 计算图片缩放比例
 */
function calcFitScale(imgRef: HTMLImageElement) {
    const margin = 20;
    const { top, left, width, height } = imgRef.getBoundingClientRect();
    const { naturalWidth, naturalHeight } = imgRef;
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;
    const scaleX = Math.min(Math.max(width, naturalWidth), viewportWidth) / width;
    const scaleY = Math.min(Math.max(height, naturalHeight), viewportHeight) / height;
    const scale = Math.min(scaleX, scaleY) - margin / Math.min(width, height) + 0.002;
    const translateX = ((viewportWidth - width) / 2 - left) / scale;
    const translateY = ((viewportHeight - height) / 2 - top) / scale;
    return `scale(${scale}) translate3d(${translateX}px, ${translateY}px, 0)`;
}
