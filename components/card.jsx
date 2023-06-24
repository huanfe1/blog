import Link from 'next/link';

export default function Card({ post }) {
    return (
        <div>
            {post.cover && (
                <div
                    className="mb-5 aspect-[5/2] rounded-2xl border border-[--border] bg-gray-300 dark:bg-slate-700"
                    style={{
                        backgroundImage: `url(${post.cover})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                ></div>
            )}
            <article>
                <Link href={'/post/' + post.abbrlink} className="block">
                    <h2 className="mb-2 text-2xl hover:text-[--link-hover]">{post.title}</h2>
                </Link>
                <section className="my-2 line-clamp-2 text-sm leading-8 text-gray-600 dark:text-gray-300/75 sm:line-clamp-none">
                    {post.excerpt}
                </section>
                <time className="time text-sm text-gray-600 dark:text-gray-300/75">{`发布于 ${post.date}`}</time>
            </article>
        </div>
    );
}
