import { fetchPagingPaths, fetchPaging } from '@/utils/database';
import Layout from '@/components/layout';
import Card from '@/components/card';
import Pagination from '@/components/pagination';

export default function Page({ posts, current, total }) {
    return (
        <Layout title={`文章列表:第${current}页`}>
            <div className="space-y-4">
                {posts.map(post => (
                    <Card post={post} key={post.abbrlink} />
                ))}
            </div>
            <Pagination current={current} total={total} />
        </Layout>
    );
}

export async function getStaticProps({ params }) {
    const { posts, total } = await fetchPaging(params.id);
    return { props: { current: parseInt(params.id), posts, total } };
}

export async function getStaticPaths() {
    const num = await fetchPagingPaths();
    return {
        paths: Array(num - 1)
            .fill()
            .map((data, index) => {
                return { params: { id: (index + 2).toString() } };
            }),
        fallback: false,
    };
}
