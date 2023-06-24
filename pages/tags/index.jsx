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
                <div
                    className="flex h-96 items-center justify-center bg-slate-400 text-white dark:bg-slate-700"
                    style={{
                        backgroundImage: 'url(https://w.wallhaven.cc/full/p9/wallhaven-p9jx2e.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <h1 className="text-5xl">标签</h1>
                </div>
                <div className="mx-auto my-10 w-full px-3 sm:w-[540px] md:w-[640px] lg:w-[768px] xl:w-[1024px] xl:p-0">
                    {tags.map(tag => (
                        <span key={tag} className="mx-2 inline-block">
                            <Link href={`/tags/${tag}`} className="text-xl hover:text-blue-700">
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
    tags.sort();
    return { props: { tags } };
}
