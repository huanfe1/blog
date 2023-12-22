import Card from '@/components/card';
import Layout from '@/components/layout';
import Pagination from '@/components/pagination';
import { AllPostsProps, getAllPosts } from '@/utils/notion';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';

/** 首页文章列表 */
export function List({ posts, current, total }: { posts: AllPostsProps[]; current: number; total: number }) {
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

export default function Home({ posts, current, total }: { posts: AllPostsProps[]; current: number; total: number }) {
    return (
        <>
            <NextSeo title="首页" description="幻非的个人博客，记录一些技术或者想法" />
            <List posts={posts} current={current} total={total} />
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const posts: AllPostsProps[] = await getAllPosts();
    return {
        props: getPagePost(1, posts),
        revalidate: 1,
    };
};

/** 每页文章显示数量 */
export function getPagePost(current: number, posts: AllPostsProps[]) {
    const per_page = parseInt(process.env.PER_PAGE);
    const total = Math.ceil(posts.length / per_page);
    if (current > total) return;
    return {
        posts: posts.slice((current - 1) * per_page, per_page + (current - 1) * per_page),
        current,
        total,
    };
}
