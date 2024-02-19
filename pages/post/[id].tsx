import { Image } from '@nextui-org/image';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import probe from 'probe-image-size';
import ReactMarkdown from 'react-markdown';
import { readingTime } from 'reading-time-estimator';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkGithubAlerts from 'remark-github-alerts';

import Layout from '@/components/layout';
import Code from '@/components/post/code';
import Img from '@/components/post/img';
import Toc from '@/components/post/toc';
import { PostProps, getAllPosts } from '@/utils/data';
import rehypeEmbed from '@/utils/markdown/rehype-embed';

type images = { [key: string]: { width: string; height: string } };

export default function Post({ post, images }: { post: PostProps; images: images }) {
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
                        <Header post={post} />
                        <section id="post" className="resp max-w-[640px] text-[#4c4e4d] dark:text-[#dbdbdb]">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm, remarkGithubAlerts, rehypeEmbed]}
                                rehypePlugins={[
                                    rehypeSlug,
                                    [
                                        rehypeExternalLinks,
                                        { target: '_blank', rel: ['noopener', 'external', 'nofollow', 'noreferrer'] },
                                    ],
                                    rehypeRaw,
                                ]}
                                components={{
                                    img: props => {
                                        return <Img {...props} {...images[props.src]} />;
                                    },
                                    pre: Code,
                                    a: props => <Link {...(props as any)} />,
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

function Header({ post }) {
    return (
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
                <span>{'约 ' + readingTime(post.content, 300, 'cn').words + ' 字'}</span>
            </div>
        </header>
    );
}

export async function getStaticProps({ params }: { params: { id: string } }) {
    const post = await getAllPosts().then(posts => posts.find(post => post.slug === params.id));
    if (!post) return { notFound: true };
    const images: images = {};
    for (const image of post.content.match(/!\[.*\]\((.*)\)/g) || []) {
        const url = image.match(/\((.*)\)/)[1];
        const { width, height } = await probe(url);
        images[url] = { width, height };
    }
    return {
        props: { post, images },
        revalidate: 60,
    };
}

export async function getStaticPaths() {
    const posts = await getAllPosts();
    return {
        paths: posts.map(post => ({ params: { id: post.slug } })),
        fallback: 'blocking',
    };
}
