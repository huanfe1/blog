import Card from '@/components/card';
import Layout from '@/components/layout';
import Pagination from '@/components/pagination';
import feed from '@/utils/feed';
import { type PostProps, allPosts } from '@/utils/notion';
import sitemap from '@/utils/sitemap';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';

export function List({ posts, current, total }: { posts: PostProps[]; current: number; total: number }) {
    return (
        <Layout>
            <div className="resp space-y-8">
                {posts.map(post => (
                    <Card post={post} key={post.slug} />
                ))}
                <Pagination current={current} total={total} />
            </div>
        </Layout>
    );
}

export default function Home({ posts, current, total }: { posts: PostProps[]; current: number; total: number }) {
    return (
        <>
            <NextSeo title="首页" description="幻非的个人博客，记录一些技术或者想法" />
            <List posts={posts} current={current} total={total} />
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    if (process.env.NODE_ENV !== 'development') {
        sitemap();
        feed();
    }
    const posts: PostProps[] = allPosts;
    return {
        props: getPagePost(1, posts),
    };
};

/** 每页文章显示数量 */
export function getPagePost(current: number, posts: PostProps[]) {
    const per_page = parseInt(process.env.PER_PAGE);
    return {
        posts: posts.slice((current - 1) * per_page, per_page + (current - 1) * per_page),
        current,
        total: Math.ceil(posts.length / per_page),
    };
}
