import { fetchAllPostsPaths, fetchPost } from '@/utils/database';
import Layout from '@/components/layout';
import License from '@/components/license';
import { wordcount } from '@/utils/wordcount.mjs';
import Link from 'next/link';
import Waline from '@/components/waline';

export default function Post(props) {
    const post = props.post;
    return (
        <Layout title={post.title}>
            <div className="overflow-hidden rounded-xl bg-white shadow">
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
                        </div>
                    </header>
                    <section dangerouslySetInnerHTML={{ __html: post.content }}></section>
                    <footer>
                        {post.copyright && <License />}
                        {post.tags.length !== 0 && (
                            <div className="ml-2 mt-3">
                                {post.tags.map(tag => (
                                    <Link href={'/tags/' + tag} className="mr-2" key={tag}>
                                        {'#' + tag}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </footer>
                </article>
            </div>
            {/* {post.comment && (
                <div className="mt-5 px-3 py-4 overflow-hidden rounded-xl bg-white shadow">
                    <Waline />
                </div>
            )} */}
        </Layout>
    );
}

export async function getStaticProps({ params }) {
    const post = await fetchPost(params.id);
    post.wordcount = wordcount(post.content);
    return { props: { post } };
}

export async function getStaticPaths() {
    const paths = await fetchAllPostsPaths();
    return {
        paths: paths.map(path => ({ params: { id: path } })),
        fallback: false,
    };
}
