import { Button } from '@nextui-org/button';
import hljs from 'highlight.js';
import { useState } from 'react';

export default function Code({ content, language }) {
    const [status, setStatus] = useState(false);
    const click = () => {
        navigator.clipboard.writeText(content).then(() => {
            setStatus(true);
            setTimeout(() => setStatus(false), 1500);
        });
    };
    return (
        <pre className="group relative" id="code">
            <Button
                className="absolute right-3 top-3 hidden text-default-600 group-hover:flex"
                isIconOnly
                onPress={click}
            >
                <Svg status={status} />
            </Button>
            <code dangerouslySetInnerHTML={{ __html: hljs.highlight(content, { language }).value }}></code>
        </pre>
    );
}

function Svg({ status }) {
    return !status ? (
        <svg viewBox="0 0 16 16" height="16" width="16" fill="currentColor">
            <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
            <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
        </svg>
    ) : (
        <svg height="16" viewBox="0 0 16 16" width="16" fill="currentColor">
            <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>
        </svg>
    );
}
