import Layout from '@/components/layout';
import License from '@/components/license';
import Code from '@/components/post/code';
import Waline from '@/components/post/waline';
import Img from '@/components/post/img';
import Link from 'next/link';
import { allPosts, allDrafts } from '@/.contentlayer/generated';
import { NextSeo } from 'next-seo';
import { parser } from 'posthtml-parser';
import { posthtmlToReact } from '@/utils/posthtmlToReact';

function Tags({ tags }) {
    if (tags.length === 0) return;
    return (
        <div className="ml-2 mt-3 space-x-2">
            {tags.map(tag => (
                <Link href={'/tags/' + tag} className="text-[--link] hover:text-[--link-hover] hover:underline" key={tag}>
                    {'#' + tag}
                </Link>
            ))}
        </div>
    );
}

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
                <div className="overflow-hidden rounded-xl bg-[--main] shadow">
                    {post.cover && (
                        <div className="flex max-h-80 items-center overflow-hidden">
                            <img src={post.cover} alt="" />
                        </div>
                    )}
                    <article className="p-5">
                        <header>
                            <h1 className="mb-3 text-3xl">{post.title}</h1>
                            <div className="text-subtitle">
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
                        <section id="post">
                            <PosthtmlToReact content={post.content} />
                        </section>
                        <footer>
                            {post.copyright && <License />}
                            <Tags tags={post.tags} />
                        </footer>
                    </article>
                </div>
                {post.comments && process.env.NODE_ENV !== 'development' && (
                    <div className="mt-5 overflow-hidden rounded-xl bg-[--main] px-3 py-4 shadow">
                        <Waline />
                    </div>
                )}
            </Layout>
        </>
    );
}

function PosthtmlToReact({ content: tree }) {
    return posthtmlToReact(tree, { pre: Code, img: Img });
}

export function getStaticProps({ params }) {
    const posts = [...allPosts];
    if (process.env.NODE_ENV === 'development') posts.push(...allDrafts);
    const post = posts.find(post => post.abbrlink === params.id);
    return {
        props: {
            post: {
                title: post.title,
                date: post.date,
                abbrlink: post.abbrlink,
                content: parser(post.body.html),
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
