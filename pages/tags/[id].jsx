import Layout from '@/components/layout';
import { fetchAllTags, fetchTag } from '@/utils/database';
import Card from '@/components/card';

export default function Tag({ tag }) {
    return (
        <Layout>
            <div className="flex justify-between rounded-xl bg-white p-5 shadow">
                <div className="flex space-x-1">
                    <div>{`标签:${tag.name}`}</div>
                </div>
                <div>{`共${tag.length}篇文章`}</div>
            </div>
            <div className="mt-3 space-y-4">
                {tag.posts.map(post => (
                    <Card post={post} key={post.abbrlink} />
                ))}
            </div>
        </Layout>
    );
}

export async function getStaticPaths() {
    const tags = await fetchAllTags();
    const paths = tags.map(tag => ({
        params: { id: tag.name },
    }));
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const tag = await fetchTag(params.id);
    return {
        props: { tag },
    };
}
