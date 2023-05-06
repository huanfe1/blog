import { fetchAllPosts } from '@/utils/database';
import Layout from '@/components/layout';
import Card from '@/components/card';

export default function Home(props) {
    const posts = props.posts;
    return (
        <Layout title="首页">
            <div className="space-y-4">
                {posts.map(post => (
                    <Card post={post} key={post.abbrlink} />
                ))}
            </div>
        </Layout>
    );
}

export async function getStaticProps() {
    const posts = await fetchAllPosts();
    return { props: { posts } };
}
