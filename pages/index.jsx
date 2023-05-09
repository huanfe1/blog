import { fetchPaging } from '@/utils/database';
import Layout from '@/components/layout';
import Card from '@/components/card';
import Pagination from '@/components/pagination';

export default function Home({ posts, current, total }) {
    return (
        <Layout title="首页">
            <div className="space-y-4">
                {posts.map(post => (
                    <Card post={post} key={post.abbrlink} />
                ))}
            </div>
            <Pagination current={current} total={total} />
        </Layout>
    );
}

export async function getStaticProps() {
    const { posts, total } = await fetchPaging(1);
    return { props: { current: 1, posts, total } };
}
