import List from '@/components/index/list';
import { type AllPostsProps, getAllPosts } from '@/utils/data';
import { NextSeo } from 'next-seo';

export default function Page({ posts, current }: { posts: AllPostsProps[]; current: number; total: number }) {
    return (
        <>
            <NextSeo title={`文章列表: 第${current}页`} />
            <List posts={posts} current={current} />
        </>
    );
}

export async function getStaticProps({ params }: { params: { id: string } }) {
    const current = parseInt(params.id);
    if (current === 1) return { notFound: true };
    const posts: AllPostsProps[] = await getAllPosts();
    const per_page = parseInt(process.env.PER_PAGE);
    const total = Math.ceil(posts.length / per_page);
    if (current > total) return { notFound: true };
    return {
        props: {
            posts,
            current,
        },
        revalidate: 60,
    };
}

export async function getStaticPaths() {
    const posts: AllPostsProps[] = await getAllPosts();
    const per_page = parseInt(process.env.PER_PAGE);
    const total = Math.ceil(posts.length / per_page);
    return {
        paths: Array(total - 1)
            .fill(0)
            .map((_, index) => {
                return { params: { id: (index + 2).toString() } };
            }),
        fallback: 'blocking',
    };
}
