import Link from 'next/link';
import toast from 'react-hot-toast';

export default function Draft({ posts }) {
    const click = slug => {
        if (!confirm('是否发布该草稿')) return;
        fetch('/api/posts/publish?slug=' + slug)
            .then(res => res.json())
            .then(res => {
                if (res.code === 0) {
                    toast.success('已成功发布草稿');
                } else {
                    toast.error('草稿发布失败' + res.message);
                }
            });
    };
    return (
        <div className="mt-5">
            <div className="my-5 text-lg font-bold">草稿箱</div>
            <div className="mt-3 space-y-6 px-2">
                {posts.map(post => (
                    <div key={post.abbrlink} className="flex items-center justify-between">
                        <Link href={'/post/' + post.abbrlink} className="text-lg hover:text-[--link-hover]">
                            <div>{post.title}</div>
                        </Link>
                        <div className="flex">
                            <div>{post.date}</div>
                            <div
                                className="ml-3 cursor-pointer hover:text-blue-600"
                                onClick={e => {
                                    e.preventDefault();
                                    click(post.path);
                                }}
                            >
                                发布
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
