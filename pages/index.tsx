import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';

import List from '@/components/index/list';
import { PostProps, getAllPosts } from '@/utils/data';

export default function Home({ posts, current }: { posts: PostProps[]; current: number; total: number }) {
    return (
        <>
            <NextSeo
                title="首页"
                description="幻非的个人博客，记录一些技术或者想法"
                canonical="https://www.huanfei.top"
            />
            <List posts={posts} current={current} />
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const posts: PostProps[] = await getAllPosts();
    return {
        props: { posts, current: 1 },
        revalidate: 60,
    };
};
