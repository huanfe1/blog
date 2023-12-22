import { AllPostsProps } from '@/utils/notion';
import Link from 'next/link';

export default function Card({ post }: { post: AllPostsProps }) {
    return (
        <Link
            href={`/post/${post.slug}`}
            className="block rounded-xl border border-gray-200/75 bg-[--main] p-5 duration-100 active:scale-95 dark:border-none"
        >
            <article>
                <h2 className="inline-block text-2xl">{post.title}</h2>
                <section className="my-2 line-clamp-2 text-sm leading-8 text-gray-700 dark:text-gray-300/75 ">
                    {post.summary}
                </section>
                <time className="time text-sm text-gray-700 dark:text-gray-300/75">{post.date}</time>
            </article>
        </Link>
    );
}
