import { allPosts } from '@/.contentlayer/generated';
import Layout from '@/components/layout';
import Code from '@/components/post/code';
import Img from '@/components/post/img';
import Toc from '@/components/post/toc';
import Waline from '@/components/post/waline';
import { PostProps } from '@/types/post';
import formatNumber from '@/utils/formatNumber';
import { posthtmlToReact } from '@/utils/posthtmlToReact';
import { toc } from '@/utils/posthtmlToc';
import dayjs from 'dayjs';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { parser } from 'posthtml-parser';

export default function Post({ post }: { post: PostProps }) {
    return (
        <>
            <NextSeo
                title={post.title}
                description={post.excerpt}
                openGraph={{
                    type: 'article',
                    article: {
                        publishedTime: post.date,
                        modifiedTime: post.date,
                        authors: ['https://huanfei.top'],
                        tags: post.tags,
                    },
                    images: [{ url: post.cover }],
                }}
            />
            <Layout>
                <div className="resp">
                    <article className="rounded-xl border bg-[--main] p-10">
                        <header>
                            <h1 className="mb-3 text-center text-3xl font-bold">{post.title}</h1>
                            <div className="text-subtitle text-center text-[#999]">
                                <time dateTime={post.date}>{post.date}</time>
                                <span className="mx-1">·</span>
                                <span>{'约 ' + post.wordcount + ' 字'}</span>
                                {post.categories && (
                                    <>
                                        <span className="mx-1">·</span>
                                        <Link className="hover:text-blue-600" href={'/categories/' + post.categories}>
                                            {post.categories}
                                        </Link>
                                    </>
                                )}
                            </div>
                            {post.update && (
                                <div className="mt-3 rounded-lg bg-blue-600 p-3 text-white">{`文章内容于 ${post.update} 进行过修改`}</div>
                            )}
                        </header>
                        <section id="post">
                            <PosthtmlToReact content={post.content} />
                        </section>
                    </article>
                    {post.toc && <Toc content={post.toc} />}
                    {post.comments && process.env.NODE_ENV !== 'development' && <Waline />}
                </div>
            </Layout>
        </>
    );
}

function PosthtmlToReact({ content }) {
    return posthtmlToReact(content, { pre: Code, img: Img });
}

export function getStaticProps({ params }: { params: { id: string } }) {
    const post = allPosts.find(post => post.abbrlink === params.id);
    const content = parser(post.body.html, { decodeEntities: true }).filter(item => item !== '\n');
    const wordcount = formatNumber(post.wordcount);
    return {
        props: {
            post: {
                title: post.title,
                date: dayjs(post.date).format('YYYY-MM-DD'),
                update: post.update,
                abbrlink: post.abbrlink,
                content: content,
                wordcount: wordcount,
                categories: post.categories,
                tags: post.tags,
                comments: post.comments,
                copyright: post.copyright,
                excerpt: post.excerpt,
                toc: toc(content),
            },
        },
    };
}

export function getStaticPaths() {
    const isDev = process.env.NODE_ENV === 'development';
    const posts = isDev ? allPosts : allPosts.filter(post => !post.draft);
    return {
        paths: posts.map(post => ({ params: { id: post.abbrlink } })),
        fallback: false,
    };
}
