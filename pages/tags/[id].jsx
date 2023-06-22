import Layout from '@/components/layout';
import Card from '@/components/card';
import { allPosts } from '@/.contentlayer/generated';
import dayjs from 'dayjs';
import { NextSeo } from 'next-seo';

export default function Tag({ tag }) {
    return (
        <>
            <NextSeo title={`标签: ${tag.name}`} />
            <Layout>
                <div className="flex h-96 items-center justify-center bg-slate-400 text-white dark:bg-slate-700">
                    <h1 className="text-5xl">{tag.name}</h1>
                </div>
                <div className="mx-auto my-10 w-full px-3 sm:w-[540px] md:w-[640px] lg:w-[768px] xl:w-[1024px] xl:p-0">
                    <div className="mt-3 space-y-4">
                        {tag.posts.map(post => (
                            <Card post={post} key={post.abbrlink} />
                        ))}
                    </div>
                </div>
            </Layout>
        </>
    );
}

export function getStaticProps({ params }) {
    const tag = {
        name: params.id,
        posts: allPosts
            .filter(post => post.tags.includes(params.id))
            .sort((a, b) => dayjs(b.date) - dayjs(a.date))
            .map(post => ({
                title: post.title,
                date: post.date,
                excerpt: post.excerpt,
                abbrlink: post.abbrlink,
            })),
    };
    return { props: { tag } };
}

export function getStaticPaths() {
    const tags = [...new Set(allPosts.map(post => post.tags).flat())];
    return { paths: tags.map(tag => ({ params: { id: tag } })), fallback: false };
}
