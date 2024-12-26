import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import type { Options } from 'rehype-autolink-headings';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import Code from './code';
import Img from './img';

export default async function Markdown({ children }: { children: string }) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
                rehypeSlug,
                [rehypeAutolinkHeadings, linkHeadingsOptions],
                [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'external', 'nofollow', 'noreferrer'] }],
                rehypeRaw,
            ]}
            components={{
                pre: Code,
                img: ({ node: _, ...props }) => <Img {...props} />,
                h1: 'h2',
                a: ({ node: _, ...props }) => <Link {...props} />,
            }}
        >
            {children}
        </ReactMarkdown>
    );
}

const linkHeadingsOptions: Options = {
    behavior: 'prepend',
    content: {
        type: 'element',
        tagName: 'span',
        properties: { className: 'i-mingcute-link-line -scale-x-100 h-full', 'aria-hidden': 'true' },
        children: [],
    },
    headingProperties: {
        className: 'relative group',
    },
    properties: el => {
        return {
            className: '-translate-x-full not-prose inset-y-0 absolute pr-1.5 opacity-0 group-hover:opacity-100',
            'aria-label': `Permalink: ${el.children[0]['value']}`,
            tabIndex: -1,
        };
    },
};
