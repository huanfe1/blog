import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import type { Options } from 'rehype-autolink-headings';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { cn } from '@/lib/utils';

import Code from './code';
import Img from './img';

const articleClassName = cn(
    'prose max-w-none dark:prose-invert',
    'prose-p:leading-8 prose-img:mx-auto',
    // 超链接样式
    'prose-a:text-inherit hover:prose-a:opacity-70',
    // 分割线样式
    'prose-hr:mx-auto prose-hr:w-80',
    // 行代码块
    'prose-code:before:content-none prose-code:after:content-none',
    'prose-code:rounded prose-code:bg-zinc-200 prose-code:px-2 prose-code:py-1 dark:prose-code:bg-zinc-800',
);

export default function Markdown({ children, className }: { children: string; className?: string }) {
    return (
        <section className={cn(articleClassName, className)}>
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
                    a: ({ node: _, ...props }) => <Link href={props.href || ''} {...props} />,
                }}
            >
                {children}
            </ReactMarkdown>
        </section>
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
    properties: el => ({
        className: `not-prose absolute inset-y-0 hidden -translate-x-full pr-1.5 opacity-0 group-hover:opacity-100 lg:block`,
        'aria-label': `Permalink: ${el.children[0]['value']}`,
        tabIndex: -1,
    }),
};
