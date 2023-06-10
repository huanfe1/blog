import { createPortal } from 'react-dom';
import { useState, useRef, useEffect } from 'react';

function Mask({ props, setStatus, imgRef }) {
    const [transform, setTransform] = useState('');
    const [opacity, setOpacity] = useState(0.7);
    const close = () => {
        setOpacity(0);
        setTransform('');
        setTimeout(() => {
            setStatus(false);
        }, 300);
    };
    useEffect(() => {
        const handleResize = () => {
            setTransform(calcFitScale(imgRef));
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    useEffect(() => {
        window.addEventListener('scroll', close);
        return () => window.removeEventListener('scroll', close);
    }, []);
    return createPortal(
        <div onClick={close} className="cursor-zoom-out">
            <div
                className="fixed bottom-0 left-0 right-0 top-0 bg-black"
                style={{
                    opacity,
                    transition: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            ></div>
            <img
                {...props}
                className="absolute"
                style={{
                    transition: 'transform 300ms cubic-bezier(.2, 0, .2, 1)',
                    top: imgRef.current.offsetTop,
                    left: imgRef.current.offsetLeft,
                    width: imgRef.current.offsetWidth,
                    height: imgRef.current.offsetHeight,
                    transform: transform,
                }}
            />
        </div>,
        document.body
    );
}

export default function Img(props) {
    const [status, setStatus] = useState(false);
    const imgRef = useRef(null);
    return (
        <>
            <img
                {...props}
                ref={imgRef}
                className={`cursor-zoom-in ${status ? 'invisible' : ''}`}
                onClick={() => {
                    setStatus(true);
                }}
                loading="lazy"
            />
            {status && <Mask props={props} setStatus={setStatus} imgRef={imgRef} />}
        </>
    );
}

/**
 * 计算图片缩放比例
 */
const calcFitScale = imgRef => {
    const margin = 5;
    const { top, left, width, height } = imgRef.current.getBoundingClientRect();
    const { naturalWidth, naturalHeight } = imgRef.current;
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;
    const scaleX = Math.min(Math.max(width, naturalWidth), viewportWidth) / width;
    const scaleY = Math.min(Math.max(height, naturalHeight), viewportHeight) / height;
    const scale = Math.min(scaleX, scaleY) - margin / Math.min(width, height) + 0.002;
    const translateX = ((viewportWidth - width) / 2 - left) / scale;
    const translateY = ((viewportHeight - height) / 2 - top) / scale;
    return `scale(${scale}) translate3d(${translateX}px, ${translateY}px, 0)`;
};
