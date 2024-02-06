import Layout from '@/components/layout';
import { PostProps } from '@/utils/data';

import Card from './card';
import Pagination from './pagination';

export default function List({ posts, current }: { posts: PostProps[]; current: number }) {
    const per_page = parseInt(process.env.PER_PAGE);
    const total = Math.ceil(posts.length / per_page);
    const start = per_page * (current - 1);
    const end = per_page + (current - 1) * per_page;
    return (
        <Layout>
            <h1 className="hidden">幻非</h1>
            <div className="resp space-y-10">
                {posts.slice(start, end).map(post => (
                    <Card post={post} key={post.slug} />
                ))}
                <Pagination current={current} total={total} />
            </div>
        </Layout>
    );
}
