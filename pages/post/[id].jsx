import Layout from '@/components/layout';
import License from '@/components/post/license';
import Code from '@/components/post/code';
import Waline from '@/components/post/waline';
import Img from '@/components/post/img';
import Link from 'next/link';
import { allPosts, allDrafts } from '@/.contentlayer/generated';
import { NextSeo } from 'next-seo';
import { parser } from 'posthtml-parser';
import { posthtmlToReact } from '@/utils/posthtmlToReact';

export default function Post({ post }) {
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
                            className="mt-10 hidden aspect-[5/2] rounded-xl border border-[--border] bg-gray-300 shadow-sm dark:bg-slate-700 sm:block"
                            style={{
                                backgroundImage: `url(${post.cover})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
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
                                {post.categories.length !== 0 && (
                                    <>
                                        <span className="mx-1">·</span>
                                        <Link className="hover:text-blue-600" href={'/categories/' + post.categories}>
                                            {post.categories}
                                        </Link>
                                    </>
                                )}
                            </div>
                        </header>
                        <section id="post" className="mb-20">
                            <PosthtmlToReact content={post.content} />
                        </section>
                    </article>
                </div>
            </Layout>
        </>
    );
}

function PosthtmlToReact({ content: tree }) {
    return posthtmlToReact(tree, { pre: Code, img: Img });
}

function formatNumber(number) {
    if (number >= 1000 && number < 1000000) {
        return (number / 1000).toFixed(1) + 'k';
    } else if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M';
    } else {
        return number.toString();
    }
}

export function getStaticProps({ params }) {
    const posts = [...allPosts];
    if (process.env.NODE_ENV === 'development') posts.push(...allDrafts);
    const post = posts.find(post => post.abbrlink === params.id);
    post.content = parser(post.body.html, { decodeEntities: true }).filter(item => item !== '\n');
    post.wordcount = formatNumber(post.wordcount);
    return {
        props: {
            post: {
                title: post.title,
                date: post.date,
                abbrlink: post.abbrlink,
                content: post.content,
                wordcount: post.wordcount,
                categories: post.categories,
                tags: post.tags,
                cover: post.cover,
                comments: post.comments,
                copyright: post.copyright,
                excerpt: post.excerpt,
            },
        },
    };
}

export function getStaticPaths() {
    const posts = [...allPosts];
    if (process.env.NODE_ENV === 'development') posts.push(...allDrafts);
    return {
        paths: posts.map(post => ({ params: { id: post.abbrlink } })),
        fallback: false,
    };
}
