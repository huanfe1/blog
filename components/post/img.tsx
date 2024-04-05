'use client';

import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { Dispatch, ImgHTMLAttributes, MutableRefObject, SetStateAction } from 'react';
import { createPortal } from 'react-dom';

type MaskProps = {
    props: ImgHTMLAttributes<HTMLImageElement>;
    setModal: Dispatch<SetStateAction<boolean>>;
    imgRef: MutableRefObject<HTMLImageElement>;
};

function Mask({ props, setModal: setStatus, imgRef }: MaskProps) {
    useEffect(() => {
        const handle = () => setStatus(false);
        window.addEventListener('scroll', handle);
        window.addEventListener('resize', handle);
        return () => {
            window.removeEventListener('scroll', handle);
            window.removeEventListener('resize', handle);
        };
    }, []);

    const { width, height } = calculateSize({
        width: imgRef.current.naturalWidth,
        height: imgRef.current.naturalHeight,
    });
    const { top, left } = calculatePlace({ width, height });

    const initStyle = {
        width: imgRef.current.width,
        height: imgRef.current.height,
        top: imgRef.current.offsetTop,
        left: imgRef.current.offsetLeft,
    };

    return createPortal(
        <div onClick={() => setStatus(false)} className="cursor-zoom-out">
            <motion.div
                className="fixed bottom-0 left-0 right-0 top-0 z-50"
                initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
                animate={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
                exit={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
            />
            <motion.img
                alt={props.alt || 'images'}
                src={props.src}
                className="absolute z-50 rounded"
                initial={initStyle}
                animate={{ width, height, top, left }}
                exit={initStyle}
            />
        </div>,
        document.body,
    );
}

export default function Img(props: ImgHTMLAttributes<HTMLImageElement>) {
    const [modal, setModal] = useState(false);
    const imgRef = useRef() as MutableRefObject<HTMLImageElement>;
    const [rawImageDisplay, setRawImageDisplay] = useState(false);
    return (
        <>
            <img
                alt={props.alt || 'images'}
                src={props.src}
                {...props}
                ref={imgRef}
                className={classNames('rounded shadow', rawImageDisplay ? 'invisible' : 'cursor-zoom-in')}
                onClick={() => {
                    setModal(true);
                    setRawImageDisplay(true);
                }}
                loading="lazy"
            />
            <AnimatePresence onExitComplete={() => setRawImageDisplay(false)}>
                {modal && <Mask props={props} setModal={setModal} imgRef={imgRef} key="modal" />}
            </AnimatePresence>
        </>
    );
}

// 计算图片位置，让其在屏幕中间
function calculatePlace({ width, height }: { width: number; height: number }) {
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;
    return {
        top: document.documentElement.scrollTop + (viewportHeight - height) / 2,
        left: (viewportWidth - width) / 2,
    };
}

// 计算图片显示尺寸，防止超过屏幕大小
function calculateSize({ width, height }: { width: number; height: number }) {
    const screenWidth = document.documentElement.clientWidth;
    const screenHeight = document.documentElement.clientHeight;
    let zoomedWidth = width;
    let zoomedHeight = height;
    if (zoomedWidth > screenWidth || zoomedHeight > screenHeight) {
        let widthRatio = screenWidth / zoomedWidth;
        let heightRatio = screenHeight / zoomedHeight;
        let scale = Math.min(widthRatio, heightRatio);
        zoomedWidth *= scale;
        zoomedHeight *= scale;
    }

    return {
        width: zoomedWidth,
        height: zoomedHeight,
    };
}
