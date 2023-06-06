import Link from 'next/link';

export default function Card({ post }) {
    return (
        <Link href={'/post/' + post.abbrlink} className="block overflow-hidden rounded-xl bg-[--main] shadow">
            {post.cover && (
                <div
                    className="hidden items-center overflow-hidden bg-gray-200 dark:brightness-[0.8] sm:flex sm:h-56 md:h-64 lg:h-80"
                    style={{
                        backgroundImage: `url(${post.cover})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                ></div>
            )}
            <article className="p-5">
                <h2 className="mb-2 text-xl">{post.title}</h2>
                <section className="my-2 line-clamp-2 text-sm sm:line-clamp-none">{post.excerpt}</section>
                <time className="time text-sm">{post.date}</time>
            </article>
        </Link>
    );
}
