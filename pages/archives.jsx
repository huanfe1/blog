import Layout from '@/components/layout';
import Link from 'next/link';
import { allPosts } from '@/.contentlayer/generated';
import dayjs from 'dayjs';
import { NextSeo } from 'next-seo';
import formatNumber from '@/utils/formatNumber';

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

export default function Archives({ archives, data }) {
    return (
        <>
            <NextSeo title="归档页" description="文章的归档页面" canonical="https://blog.huanfei.top/archives" />
            <Layout>
                <div
                    className="flex h-80 items-center justify-center bg-gray-300 bg-cover bg-center text-white dark:bg-slate-700 dark:brightness-[0.8] sm:h-96"
                    style={{
                        backgroundImage: 'url(https://pic.bibiu.cc/2023/06/28/649c535573d87.jpg)',
                    }}
                >
                    <div className="my-20 text-center">
                        <h1 className="text-5xl font-bold">归档</h1>
                        <p className="mt-5">{`${data.length} 篇文章，共 ${data.wordcount} 字`}</p>
                    </div>
                </div>
                <ul className="resp">
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
            data: {
                length: allPosts.length,
                wordcount: formatNumber(allPosts.reduce((total, post) => total + parseInt(post.wordcount), 0)),
            },
        },
    };
}
