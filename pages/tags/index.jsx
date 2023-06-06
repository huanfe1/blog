import Layout from '@/components/layout';
import Link from 'next/link';
import { allPosts } from '@/.contentlayer/generated';
import { NextSeo } from 'next-seo';

export default function Tags({ tags }) {
    return (
        <>
            <NextSeo
                title="标签页"
                description="标签页，存放着本博客所有的标签链接"
                openGraph={{ url: 'https://blog.huanfei.top/tags/' }}
            />
            <Layout>
                <div className="flex justify-between rounded-xl bg-[--main] p-5 shadow">
                    <div className="flex space-x-1">
                        <div>标签页</div>
                    </div>
                    <div>{`共 ${tags.length} 个标签`}</div>
                </div>
                <div className="mt-3 rounded-xl bg-[--main] p-5 shadow">
                    {tags.map(tag => (
                        <span key={tag} className="mx-2 inline-block">
                            <Link href={`/tags/${tag}`} className="hover:text-blue-700">
                                {tag}
                            </Link>
                        </span>
                    ))}
                </div>
            </Layout>
        </>
    );
}

export async function getStaticProps() {
    const tags = [...new Set(allPosts.map(post => post.tags).flat())];
    return { props: { tags } };
}
