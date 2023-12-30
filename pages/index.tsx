import Card from '@/components/card';
import Layout from '@/components/layout';
import { AllPostsProps, getAllPosts } from '@/utils/notion';
import { Pagination } from '@nextui-org/pagination';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

/** 首页文章列表 */
export function List({ posts, current, total }: { posts: AllPostsProps[]; current: number; total: number }) {
    const router = useRouter();
    function jump(num: number) {
        if (num === 1) {
            router.push('/');
        } else {
            router.push(`/page/${num}`);
        }
    }
    return (
        <Layout>
            <div className="resp space-y-10">
                {posts.map(post => (
                    <Card post={post} key={post.slug} />
                ))}
                <Pagination
                    onChange={jump}
                    className="flex justify-center"
                    size="lg"
                    showControls
                    initialPage={current}
                    total={total}
                />
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
