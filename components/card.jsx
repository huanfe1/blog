import Link from 'next/link';

export default function Card({ post }) {
    return (
        <article className="p-5">
            <Link href={'/post/' + post.abbrlink} className="block">
                <h2 className="mb-2 text-2xl hover:text-[--link-hover]">{post.title}</h2>
            </Link>
            <section className="my-2 line-clamp-2 text-sm sm:line-clamp-none">{post.excerpt}</section>
            <time className="time text-sm">{post.date}</time>
        </article>
    );
}
