import Layout from '@/components/layout';
import Card from '@/components/card';
import { allPosts } from '@/.contentlayer/generated';
import dayjs from 'dayjs';
import { NextSeo } from 'next-seo';

export default function Categories({ category }) {
    return (
        <>
            <NextSeo
                title={`分类: ${category.name}`}
                description={`文章分类中为 ${category.name} 的文章`}
                canonical={`https://blog.huanfei.top/categories/${category.name}`}
            />
            <Layout>
                <div className="resp">
                    <div className="my-20 text-center text-6xl">{category.name}</div>
                    <div className="mt-3 space-y-16">
                        {category.posts.map(post => (
                            <Card post={post} key={post.abbrlink} />
                        ))}
                    </div>
                </div>
            </Layout>
        </>
    );
}

export function getStaticProps({ params }) {
    const category = {
        name: params.id,
        posts: allPosts
            .filter(post => post.categories === params.id)
            .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix())
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
    const paths: string[] = allPosts.filter(post => post.categories).map(post => post.categories);
    return {
        paths: paths.map(path => ({ params: { id: path } })),
        fallback: false,
    };
}
