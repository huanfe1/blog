import Link from 'next/link';
import probe from 'probe-image-size';
import ReactMarkdown from 'react-markdown';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import Code from './code';
import Img from './img';

export default async function Markdown({ children }: { children: string }) {
    const images = {};
    const urls = children.match(/!\[.*\]\(.*\)/g)?.map(_ => _.match(/\((.*?)\)/)![1]) || [];
    await Promise.all(urls.map(_ => probe(_).then(({ width, height }) => (images[_] = { width, height }))));
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
                    if (props.src! in images) {
                        return <Img {...images[props.src!]} {...props} />;
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
