import { Card, CardBody } from '@nextui-org/card';
import dayjs from 'dayjs';
import type { Metadata } from 'next';
import Link from 'next/link';

import { type PostProps, getAllPosts } from '@/utils/data';

export const metadata: Metadata = { title: '归档页' };

export default async function Archives() {
    const posts = await getAllPosts();
    const archives: Archive[] = getArchives(posts);
    const length = posts.length;
    return (
        <>
            <div className="my-28 flex flex-col items-center justify-center rounded-2xl">
                <h1 className="text-5xl font-bold">归档</h1>
                <div className="mt-5">{`${length} 篇文章`}</div>
            </div>
            <ul className="resp mb-20 space-y-10">
                {archives.map(categorie => (
                    <li key={categorie.year}>
                        <h2 className="pb-6 text-3xl font-bold">{categorie.year}</h2>
                        <div className="space-y-8">
                            {categorie.posts.map(post => (
                                <Link href={'/post/' + post.slug} key={post.slug} className="block">
                                    <Card className="w-full bg-content2 hover:text-primary">
                                        <CardBody className="flex flex-row items-center justify-between px-4 py-4">
                                            <h3 className="truncate text-base md:text-lg">{post.title}</h3>
                                            <time dateTime={post.date} title={post.date} className="ml-3 flex-none">
                                                {dayjs(post.date).format('MM-DD')}
                                            </time>
                                        </CardBody>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}

type Archive = {
    year: string;
    posts: { title: string; date: string; slug: string }[];
};

function getArchives(posts: PostProps[]) {
    const arr: Archive[] = [];
    posts.forEach(post => {
        const year = dayjs(post.date).format('YYYY');
        const index = arr.findIndex(item => item.year === year);
        const temp = {
            title: post.title,
            date: dayjs(post.date).format('YYYY-MM-DD'),
            slug: post.slug,
        };
        if (index !== -1) {
            arr[index].posts.push(temp);
        } else {
            arr.push({
                year,
                posts: [temp],
            });
        }
    });
    arr.sort((a, b) => parseInt(b.year) - parseInt(a.year));
    arr.forEach(item => {
        item.posts.sort((a, b) => parseInt(b.date) - parseInt(a.date));
    });
    return arr;
}
