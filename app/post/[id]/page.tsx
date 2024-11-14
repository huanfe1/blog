import { config } from '@/blog.config';
import GithubSlugger from 'github-slugger';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { metadata } from '@/app/layout';
import Comment from '@/components/common/comment';
import Markdown from '@/components/markdown';
import { type PostProps, getAllPosts } from '@/utils/data';

import Header from './header';
import Toc from './toc';

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
            modifiedTime: post.update,
            authors: [config.url],
            tags: post.tags,
            images: post.cover,
            url: '/post/' + post.slug,
            locale: config.language,
        },
        alternates: {
            canonical: '/post/' + post.slug,
        },
        other: { 'giscus:backlink': `${config.url}/post/${post.slug}` },
    };
}

export default async function Post({ params }) {
    const post: PostProps | undefined = await getAllPosts().then(posts => posts.find(post => post.slug === params.id));
    if (!post) notFound();
    const slugger = new GithubSlugger();
    const tocContent = post.content.match(/^#{1,6} (.*)$/gm)?.map(item => {
        return {
            title: item.replace(/#{1,6} /g, ''),
            id: slugger.slug(item.replace(/#{1,6} /g, '')),
            level: (item.match(/#/g) as string[]).length,
        };
    });
    return (
        <>
            <article>
                <Header post={post} />
                <section className="article mt-5">
                    <Markdown>{post.content}</Markdown>
                </section>
            </article>
            {tocContent && <Toc content={tocContent} />}
            <Comment />
        </>
    );
}

export async function generateStaticParams() {
    const posts: PostProps[] = await getAllPosts();
    return posts.map(post => ({ id: post.slug }));
}
