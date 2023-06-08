import { createPortal } from 'react-dom';
import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';

function Display({ props, setStatus, imgRef }) {
    const [transform, setTransform] = useState();
    const [opacity, setOpacity] = useState(70);
    const { top, left, width, height } = imgRef.current.getBoundingClientRect();
    const [placeholder, setPlaceholder] = useState({ top, left, width, height });
    const close = () => {
        setPlaceholder({
            ...placeholder,
            top: imgRef.current.offsetTop,
            left: imgRef.current.offsetLeft,
        });
        setOpacity(0);
        setTransform('scale(1)');
        setTimeout(() => {
            setStatus(false);
        }, 300);
    };
    useEffect(() => {
        setTransform(calcFitScale(imgRef));
        // const handleResize = () => {
        //     setTransform(calcFitScale(imgRef));
        // };
        // window.addEventListener('resize', handleResize);
        // return () => window.removeEventListener('resize', handleResize);
    }, []);
    useEffect(() => {
        window.addEventListener('scroll', () => close());
        return () => window.removeEventListener('scroll', () => close());
    }, []);
    return createPortal(
        <div onClick={close}>
            <div
                className={`fixed bottom-0 left-0 right-0 top-0 bg-black/${opacity} transition-colors duration-300`}
            ></div>
            <img
                {...props}
                className="absolute"
                style={{
                    transition: 'transform .3s cubic-bezier(.2,0,.2,1)',
                    top: imgRef.current.offsetTop,
                    left: imgRef.current.offsetLeft,
                    width: placeholder.width,
                    height: placeholder.height,
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
    const click = () => {
        setStatus(true);
    };
    return (
        <>
            <img {...props} ref={imgRef} className={classNames({ invisible: status })} onClick={click} loading="lazy" />
            {status && <Display props={props} setStatus={setStatus} imgRef={imgRef} />}
        </>
    );
}

const calcFitScale = imgRef => {
    const { top, left, width, height } = imgRef.current.getBoundingClientRect();
    const { naturalWidth, naturalHeight } = imgRef.current;
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;
    const scaleX = Math.min(Math.max(width, naturalWidth), viewportWidth) / width;
    const scaleY = Math.min(Math.max(height, naturalHeight), viewportHeight) / height;
    const scale = Math.min(scaleX, scaleY) + 0.002;
    const translateX = (-left + (viewportWidth - width) / 2) / scale;
    const translateY = (-top + (viewportHeight - height) / 2) / scale;
    console.log(scale, translateX, translateY);
    return `scale(${scale}) translate3d(${translateX}px, ${translateY}px, 0)`;
};
