import Layout from '@/components/layout';
import Code from '@/components/post/code';
import Img from '@/components/post/img';
import { type PostProps, allPosts } from '@/utils/notion';
import { posthtmlToReact } from '@/utils/posthtmlToReact';
import dayjs from 'dayjs';
import 'highlight.js/styles/github.css';
import { NextSeo } from 'next-seo';
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
                        tags: [...(post.tags as string[])],
                    },
                    // images: [{ url: post.cover }],
                }}
            />
            <Layout>
                <div className="resp">
                    <article className="rounded-xl border bg-[--main] p-10">
                        <header>
                            <h1 className="mb-3 text-center text-3xl font-bold">{post.title}</h1>
                            <div className="text-subtitle text-center text-gray-600">
                                <time dateTime={post.date}>{post.date}</time>
                                <span className="mx-1">·</span>
                                <span>{'约 ' + post.wordcount + ' 字'}</span>
                            </div>
                            {/* {post.update && (
                                <div className="mt-3 rounded-lg bg-blue-600 p-3 text-white">{`文章内容于 ${post.update} 进行过修改`}</div>
                            )} */}
                        </header>
                        <section id="post">
                            <PosthtmlToReact content={post.content} />
                        </section>
                    </article>
                    {/* {post.toc && <Toc content={post.toc} />} */}
                    {/* {post.comments && process.env.NODE_ENV !== 'development' && <Waline />} */}
                </div>
            </Layout>
        </>
    );
}

function PosthtmlToReact({ content }) {
    return posthtmlToReact(content, { pre: Code, img: Img });
}

export async function getStaticProps({ params }: { params: { id: string } }) {
    const post = allPosts.find(post => post.slug === params.id);
    const content = parser(post.content, { decodeEntities: true }).filter(item => item !== '\n');
    return {
        props: {
            post: {
                title: post.title,
                date: dayjs(post.date).format('YYYY-MM-DD'),
                content: content,
                wordcount: post.wordcount,
                tags: post.tags,
                copyright: 'post.copyright',
                excerpt: 'post.excerpt',
            },
        },
    };
}

export async function getStaticPaths() {
    return {
        paths: allPosts.map(post => ({ params: { id: post.slug } })),
        fallback: false,
    };
}
