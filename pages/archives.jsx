import { fetchAllCategories } from '@/utils/database';
import Layout from '@/components/layout';
import Link from 'next/link';

export default function Archives({ categories }) {
    return (
        <Layout categories="归档页">
            <div className="w-full">
                {categories.map(categorie => (
                    <div key={categorie.year}>
                        <div className="py-3 pl-1 text-2xl font-bold">{categorie.year}</div>
                        <div className="space-y-3">
                            {categorie.posts.map(post => (
                                <Link
                                    href={'/post/' + post.abbrlink}
                                    className="flex items-center justify-between rounded-lg bg-white p-4 shadow"
                                    prefetch={false}
                                >
                                    <div>{post.title}</div>
                                    <div>{post.date}</div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
}

export async function getStaticProps() {
    const categories = await fetchAllCategories();
    return {
        props: {
            categories,
        },
    };
}
