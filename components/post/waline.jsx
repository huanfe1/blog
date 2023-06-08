import React, { useEffect, useRef, useState } from 'react';
import { init } from '@waline/client';
import '@waline/client/dist/waline.css';

function Comments() {
    const props = {
        serverURL: 'https://waline.huanfei.top/',
        lang: 'zh-CN',
        imageUploader: false,
        search: false,
        emoji: ['https://cdn.jsdelivr.net/gh/walinejs/emojis@main/tw-emoji'],
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

    useEffect(() => {
        walineInstanceRef.current?.update(props);
    }, props);

    return <div ref={containerRef} id="waline" />;
}

export default function Waline() {
    const [status, setStatus] = useState(false);
    return status ? (
        <Comments />
    ) : (
        <div
            className="cursor-pointer text-center hover:text-[--link-hover]"
            onClick={() => {
                setStatus(true);
            }}
        >
            点击查看评论
        </div>
    );
}
