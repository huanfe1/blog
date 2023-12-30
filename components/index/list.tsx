import Layout from '@/components/layout';
import { AllPostsProps } from '@/utils/notion';

import Card from './card';
import Pagination from './pagination';

export default function List({ posts, current }: { posts: AllPostsProps[]; current: number }) {
    const per_page = parseInt(process.env.PER_PAGE);
    const total = Math.ceil(posts.length / per_page);
    const start = per_page * (current - 1);
    const end = per_page + (current - 1) * per_page;
    return (
        <Layout>
            <div className="resp space-y-10">
                {posts.slice(start, end).map(post => (
                    <Card post={post} key={post.slug} />
                ))}
                <Pagination current={current} total={total} />
            </div>
        </Layout>
    );
}
