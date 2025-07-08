import dayjs from 'dayjs';
import type { Metadata } from 'next';
import Link from 'next/link';

import { PostProps, getAllPosts } from '@/lib/data';

export const metadata: Metadata = { title: '文章' };

export default async function Post() {
    const posts = await getAllPosts();

    if (posts.length === 0) return <div>没有文章，请检查内容文件</div>;

    const items: { year: string; posts: PostProps[] }[] = [];
    posts.forEach(post => {
        const year = dayjs(post.date).format('YYYY');
        const item = items.find(item => item.year === year);
        if (item) {
            item.posts.push(post);
        } else {
            items.push({ year, posts: [post] });
        }
    });

    return (
        <>
            {items.map(item => (
                <div key={item.year} data-year={item.year}>
                    <h2 className="my-4 text-2xl font-bold">{item.year}</h2>
                    <div className="space-y-3">
                        {item.posts.map(post => (
                            <div key={post.slug} className="max-w-fit hover:opacity-70">
                                <Link href={'/post/' + post.slug} key={post.slug} className="flex space-x-3" title={post.title}>
                                    <h3 className="truncate">{post.title}</h3>
                                    <time dateTime={post.date} className="flex-none">
                                        {dayjs(post.date).format('MM-DD')}
                                    </time>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
}
