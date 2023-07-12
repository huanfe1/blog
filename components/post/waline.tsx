import React, { useEffect, useRef } from 'react';
import { init } from '@waline/client';
import '@waline/client/dist/waline.css';

import type { WalineInstance, WalineInitOptions } from '@waline/client';

export type WalineOptions = Omit<WalineInitOptions, 'el'>;

export const Waline = ({ props }: { props: WalineOptions }) => {
    const walineInstanceRef = useRef<WalineInstance | null>(null);
    const containerRef = React.createRef<HTMLDivElement>();

    useEffect(() => {
        walineInstanceRef.current = init({
            ...props,
            el: containerRef.current,
        });

        return () => walineInstanceRef.current?.destroy();
    }, []);

    return <div ref={containerRef} />;
};

export default function Comment() {
    const props: WalineOptions = {
        serverURL: 'https://waline.huanfei.top/',
        lang: 'zh-CN',
        imageUploader: false,
        search: false,
        emoji: ['https://cdn.jsdelivr.net/gh/GamerNoTitle/ValineCDN/QQ'],
        dark: 'html.dark',
    };
    return <Waline props={props} />;
}
