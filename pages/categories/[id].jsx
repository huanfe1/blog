import Layout from '@/components/layout';
import Card from '@/components/card';
import { allPosts } from '@/.contentlayer/generated';
import dayjs from 'dayjs';

export default function Categories({ category }) {
    return (
        <Layout title={`分类: ${category.name}`}>
            <div className="flex justify-between rounded-xl bg-[--main] p-5 shadow">
                <div className="flex space-x-1">
                    <div>{`分类: ${category.name}`}</div>
                </div>
                <div>{`共 ${category.posts.length} 篇文章`}</div>
            </div>
            <div className="mt-3 space-y-4">
                {category.posts.map(post => (
                    <Card post={post} key={post.abbrlink} />
                ))}
            </div>
        </Layout>
    );
}

export function getStaticProps({ params }) {
    const category = {
        name: params.id,
        posts: allPosts
            .filter(post => post.categories === params.id)
            .sort((a, b) => dayjs(b.date) - dayjs(a.date))
            .map(post => ({
                title: post.title,
                date: post.date,
                excerpt: post.excerpt,
                abbrlink: post.abbrlink,
            })),
    };
    return { props: { category } };
}

export async function getStaticPaths() {
    const paths = allPosts.filter(post => post.categories).map(post => post.categories);
    return {
        paths: paths.map(path => ({ params: { id: path } })),
        fallback: false,
    };
}
