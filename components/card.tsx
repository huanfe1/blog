import Link from 'next/link';

export default function Card({
    post,
}: {
    post: { cover: string; abbrlink: string; title: string; date: string; excerpt: string };
}) {
    return (
        <div className="overflow-hidden rounded-xl border-[--border] sm:border">
            {post.cover && (
                <Link href={'/post/' + post.abbrlink} className="hidden sm:block">
                    <div
                        className="aspect-[5/2] border-b border-[--border] bg-gray-300 bg-cover bg-center dark:bg-slate-700"
                        style={{
                            backgroundImage: `url(${post.cover})`,
                        }}
                    ></div>
                </Link>
            )}
            <article className="sm:bg-gray-50 sm:p-5 sm:dark:bg-gray-800">
                <Link href={'/post/' + post.abbrlink} className="inline-block">
                    <h2 className="text-2xl hover:text-[--link-hover]">{post.title}</h2>
                </Link>
                <section className="my-2 line-clamp-2 text-sm leading-8 text-gray-700 dark:text-gray-300/75 sm:line-clamp-none">
                    {post.excerpt}
                </section>
                <time className="time text-sm text-gray-700 dark:text-gray-300/75">{post.date}</time>
            </article>
        </div>
    );
}
