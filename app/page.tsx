import type { Metadata } from 'next';

import List from '@/components/index/list';
import { PostProps, getAllPosts } from '@/utils/data';

export const metadata: Metadata = {
    title: '首页 - 幻非',
    description: '幻非的个人博客，记录一些技术或者想法',
};

export default async function Home() {
    const posts: PostProps[] = await getAllPosts();
    return <List posts={posts} current={1} />;
}
