import Layout from '@/components/layout';
import Card from '@/components/card';
import Pagination from '@/components/pagination';
import { allPosts } from '@/.contentlayer/generated';
import dayjs from 'dayjs';
import feed from '@/utils/feed';

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
    if (process.env.NODE_ENV !== 'development') feed();
    const per_page = 6;
    allPosts.sort((a, b) => dayjs(b.date) - dayjs(a.date));
    const posts = allPosts.slice(0, per_page).map(post => ({
        title: post.title,
        date: post.date,
        excerpt: post.excerpt,
        cover: post.cover,
        abbrlink: post.abbrlink,
    }));
    const total = Math.ceil(posts.length / per_page) + 1;
    return {
        props: { current: 1, posts, total },
    };
}
