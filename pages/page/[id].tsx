import { type AllPostsProps, getAllPosts } from '@/utils/notion';
import { NextSeo } from 'next-seo';

import { List, getPagePost } from '../index';

export default function Page({ posts, current, total }: { posts: AllPostsProps[]; current: number; total: number }) {
    return (
        <>
            <NextSeo title={`文章列表: 第${current}页`} />
            <List posts={posts} current={current} total={total} />
        </>
    );
}

export async function getStaticProps({ params }: { params: { id: string } }) {
    const current = parseInt(params.id);
    const posts: AllPostsProps[] = await getAllPosts();
    return { props: getPagePost(current, posts), revalidate: 1 };
}

export async function getStaticPaths() {
    const posts: AllPostsProps[] = await getAllPosts();
    return {
        paths: Array(getPagePost(1, posts).total - 1)
            .fill(0)
            .map((data, index) => {
                return { params: { id: (index + 2).toString() } };
            }),
        fallback: 'blocking',
    };
}
