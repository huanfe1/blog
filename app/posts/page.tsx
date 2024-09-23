import dayjs from 'dayjs';
import type { Metadata } from 'next';
import Link from 'next/link';
import { JSX } from 'react';

import { getAllPosts } from '@/utils/data';

export const metadata: Metadata = { title: '文章' };

export default async function Post() {
    const posts = await getAllPosts();
    posts.sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf());
    const result: JSX.Element[] = [];
    let temp = '';
    for (const post of posts) {
        const year = dayjs(post.date).format('YYYY');
        if (year !== temp) {
            result.push(
                <h2 key={year} className="mb-5 text-2xl font-bold">
                    {year}
                </h2>,
            );
            temp = year;
        }
        result.push(
            <Link href={'/post/' + post.slug} key={post.slug} className="mb-3 block" title={post.title}>
                <div className="flex hover:opacity-70">
                    <h3 className="mr-3 truncate">{post.title}</h3>
                    <time dateTime={post.date} className="text-default-400 flex-none">
                        {dayjs(post.date).format('MM-DD')}
                    </time>
                </div>
            </Link>,
        );
    }
    return result;
}
