import Layout from '@/components/layout';
import Code from '@/components/post/code';
import Img from '@/components/post/img';
import Link from '@/components/post/link';
import Toc from '@/components/post/toc';
import { PostProps, getAllPosts, getPostBySlug } from '@/utils/data';
import { Image } from '@nextui-org/image';
import { NextSeo } from 'next-seo';
import { JSX, createElement } from 'react';
import ReactMarkdown from 'react-markdown';

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
                        tags: [...((post.tags as string[]) || [])],
                    },
                    images: [{ url: post.cover }],
                }}
            />
            <Layout>
                <div>
                    <article className="pb-12">
                        <header>
                            {post.cover ? (
                                <div className="relative hidden pt-10 md:block">
                                    <div className="absolute left-0 top-0 hidden h-[350px] w-full bg-content2 md:block"></div>
                                    <div className="relative top-0 flex w-full justify-center">
                                        <Image
                                            src={post.cover}
                                            width="720"
                                            radius="sm"
                                            className="aspect-video"
                                            alt={post.title}
                                            isBlurred
                                        />
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
                        <section id="post" className="resp max-w-[640px] text-[#4c4e4d] dark:text-[#dbdbdb]">
                            <ReactMarkdown
                                components={{
                                    img: props => {
                                        return <Img {...props} {...post.images[props.src]} />;
                                    },
                                    pre: props => {
                                        const children = (props.children as any).props;
                                        return (
                                            <Code
                                                content={children.children}
                                                language={children.className.split('-')[1]}
                                            />
                                        );
                                    },
                                    a: props => <Link href={props.href}>{props.children}</Link>,
                                    h2: props => {
                                        console.log(props);
                                        return undefined;
                                    },
                                    ...head(),
                                }}
                            >
                                {post.content}
                            </ReactMarkdown>
                        </section>
                    </article>
                    <Toc content={post.content} />
                </div>
            </Layout>
        </>
    );
}

function head(): any {
    const head = (props): JSX.Element => {
        return createElement(props.node.tagName, { id: props.children }, props.children);
    };
    return {
        h1: head,
        h2: head,
        h3: head,
        h4: head,
        h5: head,
        h6: head,
    };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
    const post = await getPostBySlug(params.id);
    if (!post) return { notFound: true };
    return {
        props: { post },
        revalidate: 30,
    };
}

export async function getStaticPaths() {
    const posts = await getAllPosts();
    return {
        paths: posts.map(post => ({ params: { id: post.slug } })),
        fallback: 'blocking',
    };
}
