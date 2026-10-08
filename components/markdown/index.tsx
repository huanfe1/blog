import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import type { Options } from 'rehype-autolink-headings';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import type { ImageMeta } from '@/lib/data';
import { cn } from '@/lib/utils';

import Code from './code';
import Img from './img';

const articleClassName = cn(
    'prose max-w-none dark:prose-invert',
    'prose-p:leading-8 prose-img:mx-auto prose-img:my-0',
    // 超链接样式
    'prose-a:text-inherit hover:prose-a:opacity-70',
    // 分割线样式
    'prose-hr:mx-auto prose-hr:w-80',
    // 行代码块
    'prose-code:before:content-none prose-code:after:content-none',
    'prose-code:rounded prose-code:bg-zinc-200 prose-code:px-2 prose-code:py-1 dark:prose-code:bg-zinc-800',
);

export default function Markdown({ children, className, images = [] }: { children: string; className?: string; images?: ImageMeta[] }) {
    const imageByUrl = new Map(images.map(image => [image.url, image]));

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
                    img: ({ node: _, src, ...props }) => {
                        const meta = typeof src === 'string' ? imageByUrl.get(src) : undefined;
                        return <Img {...props} src={src} width={meta?.width || props.width} height={meta?.height || props.height} blurhash={meta?.blurhash || undefined} />;
                    },
                    h1: 'h2',
                    a: ({ node: _, ...props }) => {
                        if (props.href?.startsWith('#')) return <Link href={props.href || ''} {...props} />;
                        return <Link href={props.href || ''} {...props} target="_blank" />;
                    },
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
