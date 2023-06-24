import Link from 'next/link';

export default function Card({ post }) {
    return (
        <div>
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
