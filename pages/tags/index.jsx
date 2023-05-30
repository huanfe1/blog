import Layout from '@/components/layout';
import Link from 'next/link';
import { allPosts } from '@/.contentlayer/generated';

export default function Tags({ tags }) {
    return (
        <Layout title="标签页">
            <div className="flex justify-between rounded-xl bg-white p-5 shadow">
                <div className="flex space-x-1">
                    <div>标签页</div>
                </div>
                <div>{`共${tags.length}个标签`}</div>
            </div>
            <div className="mt-3 space-x-6 space-y-2 rounded-xl bg-white p-5 shadow">
                {tags.map(tag => (
                    <span key={tag}>
                        <Link href={`/tags/${tag}`} className="hover:text-blue-700">
                            {tag}
                        </Link>
                    </span>
                ))}
            </div>
        </Layout>
    );
}

export async function getStaticProps() {
    const tags = [...new Set(allPosts.map(post => post.tags).flat())];
    return { props: { tags } };
}
