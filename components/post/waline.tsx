import React, { useEffect, useRef, useState } from 'react';
import { init } from '@waline/client';
import '@waline/client/dist/waline.css';

export default function Comments() {
    const props = {
        serverURL: 'https://waline.huanfei.top/',
        lang: 'zh-CN',
        imageUploader: false,
        search: false,
        emoji: ['https://cdn.jsdelivr.net/gh/GamerNoTitle/ValineCDN/QQ'],
        dark: 'html.dark',
    };
    const walineInstanceRef = useRef(null);
    const containerRef = React.createRef();

    useEffect(() => {
        walineInstanceRef.current = init({
            ...props,
            el: containerRef.current,
        });

        return () => walineInstanceRef.current?.destroy();
    }, []);

    return <div ref={containerRef} id="waline" />;
}
