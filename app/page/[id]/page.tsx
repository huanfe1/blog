import List from '@/components/index/list';
import { type PostProps, getAllPosts } from '@/utils/data';

export default async function Page({ params }) {
    const current = parseInt(params.id);
    if (current === 1) return { notFound: true };
    const posts: PostProps[] = await getAllPosts();
    const per_page = parseInt(process.env.PER_PAGE as string);
    const total = Math.ceil(posts.length / per_page);
    if (current > total) return { notFound: true };
    return <List posts={posts} current={current} />;
}
