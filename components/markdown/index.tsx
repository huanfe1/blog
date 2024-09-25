import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import rehypeAutolinkHeadings, { type Options } from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import Code from './code';
import Img from './img';

export default function Markdown({ children }: { children: string }) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
                rehypeSlug,
                [
                    rehypeAutolinkHeadings,
                    {
                        behavior: 'prepend',
                        content: linkIconContent(),
                        properties: { className: 'anchor', ariaHidden: true, tabIndex: -1 },
                    },
                ],
                [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'external', 'nofollow', 'noreferrer'] }],
                rehypeRaw,
            ]}
            components={{
                pre: Code,
                img: props => {
                    return <Img {...props} />;
                },
                // eslint-disable-next-line no-unused-vars
                h1: ({ node, ...props }) => <h2 {...props}></h2>,
                // eslint-disable-next-line no-unused-vars
                a: ({ node, ...props }) => <Link {...(props as any)} />,
            }}
        >
            {children}
        </ReactMarkdown>
    );
}

function linkIconContent(): Options['content'] {
    const d =
        'm7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z';

    return {
        type: 'element',
        tagName: 'svg',
        properties: {
            viewBox: '0 0 16 16',
            version: '1.1',
            width: '18',
            height: '18',
            ariaHidden: 'true',
            fill: 'currentColor',
        },
        children: [{ type: 'element', tagName: 'path', properties: { d }, children: [] }],
    };
}
