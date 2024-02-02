import List from '@/components/index/list';
import { AllPostsProps, getAllPosts } from '@/utils/data';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';

export default function Home({ posts, current }: { posts: AllPostsProps[]; current: number; total: number }) {
    return (
        <>
            <NextSeo title="首页" description="幻非的个人博客，记录一些技术或者想法" />
            <List posts={posts} current={current} />
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const posts: AllPostsProps[] = await getAllPosts();
    return {
        props: { posts, current: 1 },
        revalidate: 60,
    };
};
