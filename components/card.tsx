import Link from 'next/link';

type Props = { cover: string; abbrlink: string; title: string; date: string; excerpt: string };

export default function Card({ post }: { post: Props }) {
    return (
        <Link href={`/post/${post.abbrlink}`} className="block">
            <div className="overflow-hidden rounded-xl border-[--border] duration-150 sm:border sm:hover:-translate-y-1 sm:hover:shadow-xl">
                {post.cover && (
                    <div
                        className="hidden aspect-[5/2] border-b border-[--border] bg-gray-300 bg-cover bg-center dark:bg-slate-700 sm:block"
                        style={{
                            backgroundImage: `url(${post.cover})`,
                        }}
                    ></div>
                )}
                <article className="sm:bg-gray-50 sm:p-5 sm:dark:bg-gray-800">
                    <h2 className="inline-block text-2xl">{post.title}</h2>
                    <section className="my-2 line-clamp-2 text-sm leading-8 text-gray-700 dark:text-gray-300/75 sm:line-clamp-none">
                        {post.excerpt}
                    </section>
                    <time className="time text-sm text-gray-700 dark:text-gray-300/75">{post.date}</time>
                </article>
            </div>
        </Link>
    );
}
