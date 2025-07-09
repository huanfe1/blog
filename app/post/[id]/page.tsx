import { config } from '@/blog.config';
import GithubSlugger from 'github-slugger';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { metadata } from '@/app/layout';
import Comment from '@/components/common/comment';
import Markdown from '@/components/markdown';
import { type PostProps, getAllPosts } from '@/lib/data';
import { extractHeadingFromMarkdown } from '@/lib/utils';

import Header from './header';
import Toc from './toc';

export async function generateMetadata({ params }): Promise<Metadata> {
    const { id } = await params;
    const post = await getAllPosts().then(posts => posts.find(post => post.slug === id));
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
            modifiedTime: post.update,
            authors: [config.url],
            tags: post.tags,
            images: post.cover,
            url: '/post/' + post.slug,
            locale: config.language,
        },
        twitter: {
            site: config.url,
            creatorId: config.x,
            card: 'summary_large_image',
            title: post.title,
            description: post.summary,
            images: post.cover,
        },
        alternates: {
            canonical: '/post/' + post.slug,
        },
        other: { 'giscus:backlink': `${config.url}/post/${post.slug}` },
    };
}

export default async function Post({ params }) {
    const { id } = await params;
    const post: PostProps | undefined = await getAllPosts().then(posts => posts.find(post => post.slug === id));
    if (!post) notFound();

    const headingItems = extractHeadingFromMarkdown(post.content);

    return (
        <>
            <article>
                <Header post={post} />
                <div className="relative">
                    <Markdown className="mt-5">{post.content}</Markdown>
                    {!!headingItems.length && (
                        <div className="absolute top-0 hidden h-full translate-x-[885px] xl:block">
                            <Toc content={headingItems} />
                        </div>
                    )}
                </div>
            </article>
            <Link href="/posts" className="mt-5 flex w-fit items-center opacity-70 hover:underline">
                <span>返回文章页</span>
                <span className="i-mingcute-arrow-left-up-line ml-1 translate-y-[1px] text-lg"></span>
            </Link>
            <Comment className="mt-10" />
        </>
    );
}

export async function generateStaticParams() {
    const slugger = new GithubSlugger();
    const posts: PostProps[] = await getAllPosts();
    return posts.map(post => {
        const slug = slugger.slug(post.slug);
        if (slug !== post.slug) console.warn(`Slug normalized: ${post.slug} -> ${slug}`);
        return { id: slug };
    });
}
