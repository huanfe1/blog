import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import Code from '@/components/post/code';
import Img from '@/components/post/img';
import { PostProps } from '@/utils/data';

export default function Content({ post }: { post: PostProps }) {
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
            {post.content}
        </ReactMarkdown>
    );
}
