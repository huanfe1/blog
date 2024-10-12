import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import type { PostProps } from '@/utils/data';

import Code from './code';
import Img from './img';

type Props = { children: string; imagesSize?: PostProps['images'] };

export default async function Markdown({ children, imagesSize }: Props) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
                rehypeSlug,
                [
                    rehypeAutolinkHeadings,
                    {
                        behavior: 'prepend',
                        content: {
                            type: 'element',
                            tagName: 'span',
                            properties: { className: 'i-mingcute-link-line -scale-x-100', 'aria-hidden': 'true' },
                            children: [],
                        },
                        properties: (el: Element) => {
                            return {
                                className: 'anchor',
                                'aria-label': `Permalink: ${el.children[0]['value']}`,
                                tabIndex: -1,
                            };
                        },
                    },
                ],
                [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'external', 'nofollow', 'noreferrer'] }],
                rehypeRaw,
            ]}
            components={{
                pre: Code,
                img: props => {
                    if (imagesSize && props.src! in imagesSize) {
                        return <Img {...imagesSize[props.src!]} {...props} />;
                    }
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
