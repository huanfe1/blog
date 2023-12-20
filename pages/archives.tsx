import Layout from '@/components/layout';
import { archivesPostProps, getArchivesPost } from '@/utils/notion';
import dayjs from 'dayjs';
import { NextSeo } from 'next-seo';
import Link from 'next/link';

export default function Archives({ archives, length }: { archives: Archive[]; length: number }) {
    return (
        <>
            <NextSeo title="归档页" description="文章的归档页面" />
            <Layout>
                <div className="my-28 flex flex-col items-center justify-center rounded-2xl">
                    <h1 className="text-5xl font-bold">归档</h1>
                    <div className="mt-5">{`${length} 篇文章`}</div>
                </div>
                <ul className="resp mb-20 space-y-10">
                    {archives.map(categorie => (
                        <li key={categorie.year}>
                            <h2 className="pb-6 text-3xl font-bold">{categorie.year}</h2>
                            <ul className="space-y-4">
                                {categorie.posts.map(post => (
                                    <li key={post.slug}>
                                        <Link
                                            href={'/post/' + post.slug}
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

export async function getStaticProps() {
    const posts = await getArchivesPost();
    const archives = getArchives(posts);
    return {
        props: {
            archives,
            length: posts.length,
        },
    };
}

type Archive = {
    year: string;
    posts: { title: string; date: string; slug: string }[];
};

function getArchives(posts: archivesPostProps[]) {
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
