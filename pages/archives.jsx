import Layout from '@/components/layout';
import Link from 'next/link';
import { allPosts } from '@/.contentlayer/generated';
import dayjs from 'dayjs';
import { NextSeo } from 'next-seo';

function getArchives(posts) {
    const arr = [];
    posts.forEach(post => {
        const year = dayjs(post.date).format('YYYY');
        const index = arr.findIndex(item => item.year === year);
        const temp = {
            title: post.title,
            date: dayjs(post.date).format('MM-DD'),
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
    arr.sort((a, b) => b.year - a.year);
    arr.forEach(item => {
        item.posts.sort((a, b) => b.date - a.date);
    });
    return arr;
}

export default function Archives({ archives }) {
    return (
        <>
            <NextSeo title="归档页" />
            <Layout>
                <div
                    className="flex h-96 items-center justify-center bg-gray-300 text-white dark:bg-slate-700 dark:brightness-[0.8]"
                    style={{
                        backgroundImage: 'url(123.jpg)',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                    }}
                >
                    <h1 className="text-5xl">归档</h1>
                </div>
                <ul className="mx-auto my-10 w-full px-3 sm:w-[540px] md:w-[640px] lg:w-[768px] xl:w-[1024px] xl:p-0">
                    {archives.map(categorie => (
                        <li key={categorie.year}>
                            <h2 className="py-3 text-3xl font-bold">{categorie.year}</h2>
                            <ul className="space-y-3">
                                {categorie.posts.map(post => (
                                    <li key={post.abbrlink} className="flex items-center justify-between py-4 pl-2 ">
                                        <Link href={'/post/' + post.abbrlink} className="overflow-hidden">
                                            <h3 className="truncate text-base hover:text-[--link-hover] md:text-xl">
                                                {post.title}
                                            </h3>
                                        </Link>
                                        <div className="ml-3 flex-none">{post.date}</div>
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
    const posts = allPosts
        .sort((a, b) => dayjs(b.date) - dayjs(a.date))
        .map(post => ({
            title: post.title,
            date: post.date,
            abbrlink: post.abbrlink,
        }));
    const archives = getArchives(posts);
    return {
        props: {
            archives,
        },
    };
}
