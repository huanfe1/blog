import { Card, CardBody } from '@nextui-org/card';
import dayjs from 'dayjs';
import type { Metadata } from 'next';
import Link from 'next/link';
import { JSX } from 'react';

import { type PostProps, getAllPosts } from '@/utils/data';

export const metadata: Metadata = { title: '归档页', alternates: { canonical: '/archives' } };

export default async function Archives() {
    const posts: PostProps[] = await getAllPosts();
    posts.sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf());
    const result: JSX.Element[] = [];
    let temp = '';
    for (const post of posts) {
        const year = dayjs(post.date).format('YYYY');
        if (year !== temp) {
            result.push(
                <h2 key={year} className="text-3xl font-bold">
                    {year}
                </h2>,
            );
            temp = year;
        }
        result.push(
            <Link href={'/post/' + post.slug} key={post.slug} className="block">
                <Card className="w-full bg-content2 hover:text-primary">
                    <CardBody className="flex flex-row items-center justify-between px-4 py-4">
                        <h3 className="truncate text-base md:text-lg">{post.title}</h3>
                        <time dateTime={post.date} title={post.date} className="ml-3 flex-none">
                            {dayjs(post.date).format('MM-DD')}
                        </time>
                    </CardBody>
                </Card>
            </Link>,
        );
    }
    return (
        <div className="resp mb-20">
            <div className="my-28 flex flex-col items-center justify-center rounded-2xl">
                <h1 className="text-5xl font-bold">归档</h1>
                <div className="mt-5">{`${posts.length} 篇文章`}</div>
            </div>
            <div className="space-y-8">{result}</div>
        </div>
    );
}
