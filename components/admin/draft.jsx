import Link from 'next/link';

export default function Draft({ posts }) {
    const click = slug => {
        if (!confirm('是否发布该草稿')) return;
        fetch('/api/posts/publish?slug=' + slug);
    };
    return (
        <div className="mt-5">
            <div className="flex justify-between rounded-lg bg-white px-5 py-3 shadow">
                <span>草稿箱</span>
                <span>{`共有 ${posts.length} 篇草稿`}</span>
            </div>
            <div className="mt-3 space-y-3">
                {posts.map(post => (
                    <div key={post.abbrlink}>
                        <Link
                            href={'/post/' + post.abbrlink}
                            className="flex items-center justify-between rounded-lg bg-white px-5 py-3 shadow"
                        >
                            <div>{post.title}</div>
                            <div className="flex">
                                <div>{post.date}</div>
                                <div
                                    className="ml-3 hover:text-blue-600"
                                    onClick={e => {
                                        e.preventDefault();
                                        click(post.path);
                                    }}
                                >
                                    发布
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
