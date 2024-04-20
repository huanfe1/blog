import { Image, Tooltip } from '@nextui-org/react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import probe from 'probe-image-size';
import ReactMarkdown from 'react-markdown';
import { readingTime } from 'reading-time-estimator';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkGithubAlerts from 'remark-github-alerts';

import { metadata } from '@/app/layout';
import Code from '@/components/post/code';
import Comment from '@/components/post/comment';
import Img from '@/components/post/img';
import Toc from '@/components/post/toc';
import { PostProps, getAllPosts } from '@/utils/data';

type images = { [key: string]: { width: string; height: string } };

export async function generateMetadata({ params }): Promise<Metadata> {
    const post = await getAllPosts().then(posts => posts.find(post => post.slug === params.id));
    if (!post) notFound();
    return {
        title: `${post.title}`,
        description: post.summary,
        keywords: [...(metadata.keywords as string[]), ...(post.tags ? post.tags : [])],
        openGraph: {
            title: post.title,
            description: post.summary,
            type: 'article',
            publishedTime: post.date,
            modifiedTime: post.update || post.date,
            authors: ['https://www.huanfei.top'],
            tags: post.tags,
            images: post.cover,
            url: '/post/' + post.slug,
        },
        alternates: {
            canonical: '/post/' + post.slug,
        },
        other: { 'giscus:backlink': 'https://www.huanfei.top/post/' + post.slug },
    };
}

export default async function Post({ params }) {
    const post: PostProps | undefined = await getAllPosts().then(posts => posts.find(post => post.slug === params.id));
    if (!post) notFound();
    const images: images = {};
    for (const image of post.content.match(/!\[.*\]\((.*)\)/g) || []) {
        const url = (image.match(/\((.*)\)/) as string[])[1];
        try {
            const { width, height } = await probe(url);
            images[url] = { width, height };
        } catch (e) {
            throw new Error(`Failed to get image size: ${url}`);
        }
    }
    return (
        <div className="pb-12">
            <article>
                <Header post={post} />
                <section id="post" className="resp max-w-[640px] text-[#4c4e4d] dark:text-[#dbdbdb]">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkGithubAlerts]}
                        rehypePlugins={[
                            rehypeSlug,
                            [
                                rehypeExternalLinks,
                                { target: '_blank', rel: ['noopener', 'external', 'nofollow', 'noreferrer'] },
                            ],
                            rehypeRaw,
                        ]}
                        components={{
                            pre: Code,
                            img: props => {
                                return <Img {...props} {...images[props.src as string]} />;
                            },
                            a: props => <Link {...(props as any)} />,
                        }}
                    >
                        {post.content}
                    </ReactMarkdown>
                </section>
            </article>
            <Comment />
            <Toc content={post.content} />
        </div>
    );
}

function Header({ post }) {
    return (
        <header>
            {post.cover ? (
                <div className="relative hidden pt-10 md:block">
                    <div className="absolute left-0 top-0 hidden h-[350px] w-full bg-content2 md:block"></div>
                    <div className="relative top-0 flex w-full justify-center">
                        <Image
                            src={post.cover}
                            width="720"
                            radius="sm"
                            className="aspect-video"
                            alt={post.title}
                            isBlurred
                        />
                    </div>
                </div>
            ) : (
                <div className="pt-1"></div>
            )}
            <h1 className="mt-10 text-center text-3xl font-bold">{post.title}</h1>
            <div className="my-5 text-center text-default-500">
                {post.update ? (
                    <Tooltip showArrow closeDelay={0} color="foreground" content={`发布于 ${post.date}`}>
                        <time dateTime={post.update} className="cursor-default">{`更新于 ${post.update}`}</time>
                    </Tooltip>
                ) : (
                    <time dateTime={post.date}>{post.date}</time>
                )}
                <span className="mx-1">·</span>
                <span>{'约 ' + readingTime(post.content, 300, 'cn').words + ' 字'}</span>
            </div>
        </header>
    );
}

export async function generateStaticParams() {
    const posts: PostProps[] = await getAllPosts();
    return posts.map(post => ({ id: post.slug }));
}
