import { AllPostsProps } from '@/utils/notion';
import { Card, CardBody, Image } from '@nextui-org/react';
import Link from 'next/link';

export default function ListCard({ post }: { post: AllPostsProps }) {
    return (
        <Link href={`/post/${post.slug}`} className="block">
            <Card className="w-full bg-content2">
                {post.cover && <Image isBlurred src={post.cover} alt={post.title} />}
                <CardBody>
                    <article className="p-3">
                        <h2 className="text-2xl">{post.title}</h2>
                        <section className="my-2 line-clamp-2 text-sm leading-8 text-gray-700 dark:text-gray-300/75">
                            {post.summary}
                        </section>
                        <time className="text-sm text-gray-700 dark:text-gray-300/75">{post.date}</time>
                    </article>
                </CardBody>
            </Card>
        </Link>
    );
}
