import Layout from '@/components/layout';
import { fetchAllTags } from '@/utils/database';
import Link from 'next/link';

export default function Tags({ tags }) {
    return (
        <Layout title="标签页">
            <div className="flex justify-between rounded-xl bg-white p-5 shadow">
                <div className="flex space-x-1">
                    <div>标签页</div>
                </div>
                <div>{`共${tags.length}个标签`}</div>
            </div>
            <div className="mt-3 rounded-xl bg-white p-5 shadow">
                {tags.map(tag => (
                    <span className="m-3" key={tag.name}>
                        <Link href={`/tags/${tag.name}`} className="hover:text-blue-700">
                            {tag.name}
                        </Link>
                    </span>
                ))}
            </div>
        </Layout>
    );
}

export async function getStaticProps() {
    const tags = await fetchAllTags();
    return {
        props: { tags },
    };
}
