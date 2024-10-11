'use client';

import classNames from 'classnames';
import hljs from 'highlight.js';
import { useState } from 'react';

export default function Code(props) {
    const content = props.children.props.children;
    const language = props.children.props.className?.replace('language-', '');
    const [status, setStatus] = useState(false);
    const click = () => {
        navigator.clipboard.writeText(content).then(() => {
            setStatus(true);
            setTimeout(() => setStatus(false), 1500);
        });
    };
    return (
        <pre className="relative my-3 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800" id="code">
            <button
                className="absolute right-2 top-2 flex rounded-xl p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                onClick={click}
                aria-label="复制代码"
            >
                <span
                    aria-hidden
                    className={classNames('text-lg', {
                        'i-mingcute-copy-2-line': !status,
                        'i-mingcute-check-line bg-green-600': status,
                    })}
                ></span>
            </button>
            <code
                className="bg-default-100 block overflow-x-auto p-4"
                dangerouslySetInnerHTML={{
                    __html: language ? hljs.highlight(content, { language }).value : hljs.highlightAuto(content).value,
                }}
            ></code>
        </pre>
    );
}
