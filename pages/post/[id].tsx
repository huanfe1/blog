import Layout from '@/components/layout';
import Code from '@/components/post/code';
import Waline from '@/components/post/waline';
import Img from '@/components/post/img';
import Link from 'next/link';
import { allPosts } from '@/.contentlayer/generated';
import { NextSeo } from 'next-seo';
import { parser } from 'posthtml-parser';
import { posthtmlToReact } from '@/utils/posthtmlToReact';
import formatNumber from '@/utils/formatNumber';
import { toc } from '@/utils/posthtmlToc';
import Toc from '@/components/post/toc';
import dayjs from 'dayjs';

export default function Post({ post, toc }) {
    return (
        <>
            <NextSeo
                title={post.title}
                canonical={'https://blog.huanfei.top/post/' + post.abbrlink}
                description={post.excerpt}
                openGraph={{
                    url: 'https://blog.huanfei.top/post/' + post.abbrlink,
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
                    {post.cover && (
                        <div
                            className="mt-10 hidden aspect-[5/2] rounded-xl border border-[--border] bg-gray-300 bg-cover bg-center shadow-sm dark:bg-slate-700 sm:block"
                            style={{
                                backgroundImage: `url(${post.cover})`,
                            }}
                        ></div>
                    )}
                    <article>
                        <header className="my-10">
                            <h1 className="mb-3 text-center text-3xl font-bold sm:text-4xl">{post.title}</h1>
                            <div className="text-subtitle text-center">
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
                        <section id="post" className="mb-20">
                            <PosthtmlToReact content={post.content} />
                        </section>
                    </article>
                    {toc && <Toc content={toc} />}
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
                cover: post.cover,
                comments: post.comments,
                copyright: post.copyright,
                excerpt: post.excerpt,
            },
            toc: toc(content),
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
