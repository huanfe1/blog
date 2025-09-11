'use client';

import clsx from 'clsx';
import hljs from 'highlight.js';
import { useState } from 'react';

export default function Code(props) {
    const [status, setStatus] = useState(false);

    if (!props.children || !props.children.props) return null;

    const content = props.children.props.children;
    const language = props.children.props.className?.replace('language-', '');

    const click = () => {
        navigator.clipboard.writeText(content).then(() => {
            setStatus(true);
            setTimeout(() => setStatus(false), 1500);
        });
    };

    const validityLanguage = !!(language && hljs.getLanguage(language));

    return (
        <pre className="not-prose relative my-3 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800" id="code">
            <button className="absolute right-2 top-2 flex rounded-xl p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800" onClick={click} aria-label="复制代码">
                <span aria-hidden className={clsx('text-lg', !status ? 'i-mingcute-copy-2-line' : 'i-mingcute-check-line bg-green-600')} />
            </button>
            <code
                className="bg-default-100 block overflow-x-auto p-4"
                dangerouslySetInnerHTML={{
                    __html: validityLanguage ? hljs.highlight(content, { language }).value : hljs.highlightAuto(content).value,
                }}
            ></code>
        </pre>
    );
}
