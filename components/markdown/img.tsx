'use client';

import clsx from 'clsx';
import type { Dispatch, ImgHTMLAttributes, RefObject, SetStateAction } from 'react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { BlurhashCanvas } from 'react-blurhash';
import { createPortal } from 'react-dom';

type ImgProps = {
    props: ImgHTMLAttributes<HTMLImageElement>;
    setStatus: Dispatch<SetStateAction<boolean>>;
    imgRef: RefObject<HTMLImageElement>;
};

function Mask({ props, setStatus, imgRef }: ImgProps) {
    const duration = 300;

    const [opacity, setOpacity] = useState(0);
    const [transform, setTransform] = useState('');
    const { top, left, width, height } = imgRef.current.getBoundingClientRect();

    const calcTransfrom = () => {
        window.requestAnimationFrame(() => {
            setOpacity(0.7);
            setTransform(calcFitScale(imgRef.current));
        });
    };

    useEffect(() => calcTransfrom(), []);

    const close = () => {
        window.requestAnimationFrame(() => {
            setOpacity(0);
            setTransform('');
            setTimeout(() => setStatus(false), duration);
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
                className="fixed inset-0 z-30 bg-black transition-opacity"
                style={{
                    opacity,
                    transitionDuration: `${duration}ms`,
                }}
            />
            <img
                alt={props.alt || 'image'}
                src={props.src}
                className="absolute z-30 rounded transition-transform"
                style={{
                    transitionDuration: `${duration}ms`,
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

type BlogImgProps = ImgHTMLAttributes<HTMLImageElement> & {
    blurhash?: string;
};

function toPositiveNumber(value: ImgHTMLAttributes<HTMLImageElement>['width']) {
    const number = typeof value === 'number' ? value : typeof value === 'string' ? Number.parseInt(value, 10) : Number.NaN;
    return Number.isFinite(number) && number > 0 ? number : undefined;
}

export default function Img({ blurhash, style, width, height, className, alt, ...props }: BlogImgProps) {
    const [status, setStatus] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);
    const numericWidth = toPositiveNumber(width);
    const numericHeight = toPositiveNumber(height);

    useLayoutEffect(() => {
        setLoaded(imgRef.current?.complete ?? false);
    }, [props.src]);

    return (
        <>
            <span className={clsx('relative mx-auto my-[2em] block w-fit max-w-full overflow-hidden rounded shadow', status && 'invisible')}>
                {blurhash && <BlurhashCanvas hash={blurhash} width={32} height={32} aria-hidden className="absolute inset-0 h-full w-full" />}
                <img
                    {...props}
                    alt={alt || 'image'}
                    ref={imgRef}
                    width={numericWidth}
                    height={numericHeight}
                    className={clsx(
                        'relative h-auto max-w-full',
                        blurhash && 'transition-opacity duration-500',
                        blurhash && !loaded && 'opacity-0',
                        !status && 'cursor-zoom-in',
                        className,
                    )}
                    style={{
                        ...style,
                        aspectRatio: numericWidth && numericHeight ? `${numericWidth} / ${numericHeight}` : undefined,
                    }}
                    onClick={() => setStatus(true)}
                    onLoad={() => setLoaded(true)}
                    loading="lazy"
                />
            </span>
            {status && <Mask props={{ ...props, alt, src: props.src }} setStatus={setStatus} imgRef={imgRef as RefObject<HTMLImageElement>} />}
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
