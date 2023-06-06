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
                <div className="flex justify-between rounded-xl bg-[--main] p-5 shadow">
                    <div className="flex space-x-1">
                        <div>{`标签: ${tag.name}`}</div>
                    </div>
                    <div>{`共 ${tag.posts.length} 篇文章`}</div>
                </div>
                <div className="mt-3 space-y-4">
                    {tag.posts.map(post => (
                        <Card post={post} key={post.abbrlink} />
                    ))}
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
