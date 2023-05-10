import React, { useEffect, useRef } from 'react';
import { init } from '@waline/client';
import '@waline/client/dist/waline.css';

export default function Waline() {
    const props = {
        serverURL: 'https://waline.ixory.com/',
        lang: 'zh-CN',
        imageUploader: false,
        login: 'disable',
        search: false,
        emoji: ['https://unpkg.com/@waline/emojis@1.1.0/tw-emoji', 'https://unpkg.com/@waline/emojis@1.1.0/bmoji'],
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

    useEffect(() => {
        walineInstanceRef.current?.update(props);
    }, props);

    return <div ref={containerRef} id='waline' />;
}
