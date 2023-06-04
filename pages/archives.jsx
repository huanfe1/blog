import Layout from '@/components/layout';
import Link from 'next/link';
import { allPosts } from '@/.contentlayer/generated';
import dayjs from 'dayjs';

function getArchives(posts) {
    const arr = [];
    posts.forEach(post => {
        const year = dayjs(post.date).format('YYYY');
        const index = arr.findIndex(item => item.year === year);
        const temp = {
            title: post.title,
            date: dayjs(post.date).format('MM-DD'),
            abbrlink: post.abbrlink,
        };
        if (index !== -1) {
            arr[index].posts.push(temp);
        } else {
            arr.push({
                year,
                posts: [temp],
            });
        }
    });
    arr.sort((a, b) => b.year - a.year);
    arr.forEach(item => {
        item.posts.sort((a, b) => b.date - a.date);
    });
    return arr;
}

export default function Archives({ archives }) {
    return (
        <Layout title="归档页">
            <div className="w-full">
                {archives.map(categorie => (
                    <div key={categorie.year}>
                        <div className="py-3 pl-1 text-2xl font-bold">{categorie.year}</div>
                        <div className="space-y-3">
                            {categorie.posts.map(post => (
                                <Link
                                    href={'/post/' + post.abbrlink}
                                    className="flex items-center justify-between rounded-lg bg-[--main] p-4 shadow"
                                    key={post.abbrlink}
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
    const posts = allPosts
        .sort((a, b) => dayjs(b.date) - dayjs(a.date))
        .map(post => ({
            title: post.title,
            date: post.date,
            abbrlink: post.abbrlink,
        }));
    const archives = getArchives(posts);
    return {
        props: {
            archives,
        },
    };
}
