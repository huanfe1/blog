import Layout from '@/components/layout';
import Code from '@/components/post/code';
import Img from '@/components/post/img';
import Link from '@/components/post/link';
import Toc from '@/components/post/toc';
import { PostProps, getAllPosts, getPostBySlug } from '@/utils/notion';
import { posthtmlToReact } from '@/utils/posthtmlToReact';
import { Image } from '@nextui-org/image';
import { NextSeo } from 'next-seo';
import { parser } from 'posthtml-parser';

export default function Post({ post }: { post: PostProps }) {
    return (
        <>
            <NextSeo
                title={post.title}
                description={post.summary}
                openGraph={{
                    type: 'article',
                    article: {
                        publishedTime: post.date,
                        modifiedTime: post.date,
                        authors: ['https://huanfei.top'],
                        tags: [...(post.tags as string[])],
                    },
                    images: [{ url: post.cover }],
                }}
            />
            <Layout>
                <div>
                    <article className="pb-12">
                        <header>
                            {post.cover ? (
                                <div className="relative pt-10">
                                    <div className="absolute left-0 top-0 h-[350px] w-full bg-content2"></div>
                                    <div className="relative top-0 flex w-full justify-center">
                                        <Image src={post.cover} width="720" className="aspect-video" alt={post.title} />
                                    </div>
                                </div>
                            ) : (
                                <div className="pt-1"></div>
                            )}
                            <h1 className="mt-10 text-center text-3xl font-bold">{post.title}</h1>
                            <div className="my-5 text-center text-default-500">
                                <time dateTime={post.date}>{post.date}</time>
                                <span className="mx-1">·</span>
                                <span>{'约 ' + post.wordcount + ' 字'}</span>
                            </div>
                        </header>
                        <section id="post" className="mx-auto max-w-[664px] text-[#4c4e4d] dark:text-[#dbdbdb]">
                            <PosthtmlToReact content={post.content} />
                        </section>
                    </article>
                    <Toc nodes={post.content} />
                </div>
            </Layout>
        </>
    );
}

function PosthtmlToReact({ content }) {
    return posthtmlToReact(content, { pre: Code, img: Img, a: Link });
}

export async function getStaticProps({ params }: { params: { id: string } }) {
    const post = await getPostBySlug(params.id);
    if (!post) return { notFound: true };
    const content = parser(post.content, { decodeEntities: true }).filter(el => typeof el === 'object');
    return {
        props: {
            post: {
                ...post,
                content: content,
            },
        },
        revalidate: 1,
    };
}

export async function getStaticPaths() {
    const posts = await getAllPosts();
    return {
        paths: posts.map(post => ({ params: { id: post.slug } })),
        fallback: 'blocking',
    };
}
