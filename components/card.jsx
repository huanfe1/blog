import Link from 'next/link';

export default function Card({ post }) {
    return (
        <Link
            href={'/post/' + post.abbrlink}
            className="block overflow-hidden rounded-xl bg-white shadow"
            prefetch={false}
        >
            {post.cover && (
                <div className="flex max-h-80 items-center overflow-hidden">
                    <img src={post.cover} alt={post.title} loading="lazy" />
                </div>
            )}
            <div className="p-5">
                <h2 className="mb-2 text-xl">{post.title}</h2>
                <p className="my-2 text-sm sm:line-clamp-none">{post.excerpt}</p>
                <div className="time text-sm">{post.date}</div>
            </div>
        </Link>
    );
}
