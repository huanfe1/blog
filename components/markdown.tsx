import Link from 'next/link';
import ReactMarkdown, { Options } from 'react-markdown';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import Code from '@/components/post/code';
import Img from '@/components/post/img';

export default function Markdown(props: Options) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
                rehypeSlug,
                [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'external', 'nofollow', 'noreferrer'] }],
                rehypeRaw,
            ]}
            components={{
                pre: Code,
                img: props => {
                    return <Img {...props} />;
                },
                a: props => <Link {...(props as any)} />,
            }}
        >
            {props.children}
        </ReactMarkdown>
    );
}
