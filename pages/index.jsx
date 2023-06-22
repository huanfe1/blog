import Layout from '@/components/layout';
import Card from '@/components/card';
import Pagination from '@/components/pagination';
import { allPosts } from '@/.contentlayer/generated';
import dayjs from 'dayjs';
import feed from '@/utils/feed';
import sitemap from '@/utils/sitemap';
import { NextSeo } from 'next-seo';

export default function Home({ posts, current, total }) {
    return (
        <>
            <NextSeo
                title="首页"
                canonical="https://blog.huanfei.top/"
                description="幻非的个人博客，记录一些技术或者想法"
            />
            <Layout>
                <div className="mx-auto my-7 space-y-4 sm:w-[540px] md:w-[640px] lg:w-[768px] xl:w-[1024px]">
                    {posts.map(post => (
                        <Card post={post} key={post.abbrlink} />
                    ))}
                    <Pagination current={current} total={total} />
                </div>
            </Layout>
        </>
    );
}

export async function getStaticProps() {
    if (process.env.NODE_ENV !== 'development') {
        sitemap();
        feed();
    }
    const per_page = 6;
    allPosts.sort((a, b) => dayjs(b.date) - dayjs(a.date));
    const posts = allPosts.slice(0, per_page).map(post => ({
        title: post.title,
        date: post.date,
        excerpt: post.excerpt,
        cover: post.cover,
        abbrlink: post.abbrlink,
    }));
    const total = Math.ceil(posts.length / per_page) + 1;
    return {
        props: { current: 1, posts, total },
    };
}
