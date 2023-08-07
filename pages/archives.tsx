import { allPosts, Post } from '@/.contentlayer/generated';
import Layout from '@/components/layout';
import formatNumber from '@/utils/formatNumber';
import dayjs from 'dayjs';
import { NextSeo } from 'next-seo';
import Link from 'next/link';

export default function Archives({
    archives,
    data,
}: {
    archives: Archive[];
    data: { length: number; wordcount: string };
}) {
    return (
        <>
            <NextSeo title="归档页" description="文章的归档页面" />
            <Layout>
                <div className="my-28 flex flex-col items-center justify-center rounded-2xl">
                    <h1 className="text-5xl font-bold">归档</h1>
                    <div className="mt-5">{`${data.length} 篇文章，共 ${data.wordcount} 字`}</div>
                </div>
                <ul className="resp space-y-10">
                    {archives.map(categorie => (
                        <li key={categorie.year}>
                            <h2 className="pb-6 text-3xl font-bold">{categorie.year}</h2>
                            <ul className="space-y-4">
                                {categorie.posts.map(post => (
                                    <li key={post.abbrlink}>
                                        <Link
                                            href={'/post/' + post.abbrlink}
                                            className="flex items-center justify-between overflow-hidden rounded-xl bg-[--main] px-4 py-4 duration-100 active:scale-95"
                                        >
                                            <h3 className="truncate text-base md:text-lg">{post.title}</h3>
                                            <time dateTime={post.date} title={post.date} className="ml-3 flex-none">
                                                {dayjs(post.date).format('MM-DD')}
                                            </time>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </Layout>
        </>
    );
}

type Archive = {
    year: string;
    posts: { title: string; date: string; abbrlink: string }[];
};

export async function getStaticProps() {
    const posts = allPosts.filter(post => !post.draft).sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix());
    const archives = getArchives(posts);
    const showData = {
        length: allPosts.filter(post => !post.draft).length,
        wordcount: formatNumber(
            allPosts.filter(post => !post.draft).reduce((total, post) => total + post.wordcount, 0)
        ),
    };
    return {
        props: {
            archives,
            data: showData,
        },
    };
}

function getArchives(posts: Post[]) {
    const arr: Archive[] = [];
    posts.forEach(post => {
        const year = dayjs(post.date).format('YYYY');
        const index = arr.findIndex(item => item.year === year);
        const temp = {
            title: post.title,
            date: dayjs(post.date).format('YYYY-MM-DD'),
            abbrlink: post.abbrlink,
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
