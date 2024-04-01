import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import List from '@/components/index/list';
import { type PostProps, getAllPosts } from '@/utils/data';

export async function generateMetadata({ params }): Promise<Metadata> {
    const current = parseInt(params.id);
    return {
        title: `文章：第${current}页 - 幻非`,
        alternates: {
            canonical: '/page/' + params.id,
        },
    };
}

export default async function Page({ params }) {
    const current = parseInt(params.id);
    if (current === 1) notFound();
    const posts: PostProps[] = await getAllPosts();
    const per_page = parseInt(process.env.PER_PAGE as string);
    const total = Math.ceil(posts.length / per_page);
    if (current > total) notFound();
    return <List posts={posts} current={current} />;
}

export async function generateStaticParams() {
    const posts: PostProps[] = await getAllPosts();
    const per_page = parseInt(process.env.PER_PAGE as string);
    const total = Math.ceil(posts.length / per_page);
    return Array(total - 1)
        .fill(0)
        .map((_, index) => {
            return { id: (index + 2).toString() };
        });
}
