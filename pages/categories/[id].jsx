import Layout from '@/components/layout';
import { fetchCategories, fetchCategoriesPaths } from '@/utils/database';
import Card from '@/components/card';

export default function Categories({ category }) {
    return (
        <Layout title="分类">
            <div className="flex justify-between rounded-xl bg-white p-5 shadow">
                <div className="flex space-x-1">
                    <div>{`分类:${category.name}`}</div>
                </div>
                <div>{`共${category.length}篇文章`}</div>
            </div>
            <div className="mt-3 space-y-4">
                {category.posts.map(post => (
                    <Card post={post} key={post.abbrlink} />
                ))}
            </div>
        </Layout>
    );
}

export async function getStaticProps({ params }) {
    const category = await fetchCategories(params.id);
    return { props: { category } };
}

export async function getStaticPaths() {
    const paths = await fetchCategoriesPaths();
    return {
        paths: paths.map(path => ({ params: { id: path } })),
        fallback: false,
    };
}
