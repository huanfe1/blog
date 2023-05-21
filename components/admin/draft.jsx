import toast from 'react-hot-toast';

const svgClass = 'w-5 h-5 hover:text-blue-500 cursor-pointer';

function PushSvg() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={svgClass} viewBox="0 0 16 16">
            <path
                fill="currentColor"
                d="M1 2.5A2.5 2.5 0 0 1 3.5 0h8.75a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0V1.5h-8a1 1 0 0 0-1 1v6.708A2.493 2.493 0 0 1 3.5 9h3.25a.75.75 0 0 1 0 1.5H3.5a1 1 0 0 0 0 2h5.75a.75.75 0 0 1 0 1.5H3.5A2.5 2.5 0 0 1 1 11.5Zm13.23 7.79h-.001l-1.224-1.224v6.184a.75.75 0 0 1-1.5 0V9.066L10.28 10.29a.75.75 0 0 1-1.06-1.061l2.505-2.504a.75.75 0 0 1 1.06 0L15.29 9.23a.751.751 0 0 1-.018 1.042a.751.751 0 0 1-1.042.018Z"
            />
        </svg>
    );
}

function OpenSvg() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={svgClass} viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="M21.95 22.375L19 19.425v2.225h-2V16h5.65v2H20.4l2.95 2.95l-1.4 1.425ZM13 9h5l-5-5v5ZM6 22q-.825 0-1.413-.588T4 20V4q0-.825.588-1.413T6 2h8l6 6v6h-5v8H6Z"
            />
        </svg>
    );
}

function publish(slug) {
    if (confirm('确定要发布名为 ' + slug + ' 的草稿?')) {
        fetch('/api/database/publish?slug=' + slug)
            .then(res => res.json())
            .then(res => {
                if (res.code === 0) {
                    toast.success('已成功发布草稿');
                    location.reload();
                } else {
                    toast.error('发布失败 ' + res.message);
                }
            });
    }
}

function openFile(slug) {
    fetch('/api/database/openfile?slug=' + slug);
}

export default function Draft({ posts }) {
    if (posts.length === 0) return null;
    return (
        <div className="mt-3 overflow-hidden rounded-xl bg-white shadow">
            <div className="flex justify-between px-5 py-3">
                <span>草稿箱</span>
                <span>{`共有 ${posts.length} 篇草稿`}</span>
            </div>
            <ul>
                {posts.map(post => (
                    <li className="cursor-pointer  px-5 py-3 hover:bg-gray-200" key={post.slug}>
                        <div className="flex items-center justify-between">
                            <span>{`${post.title}   ${post.wordcount}`}</span>
                            <div className="flex space-x-3">
                                <span title="打开草稿" onClick={() => openFile(post.source)}>
                                    <OpenSvg />
                                </span>
                                <span title="发布草稿" onClick={() => publish(post.slug)}>
                                    <PushSvg />
                                </span>
                            </div>
                        </div>
                        {post.excerpt.length > 0 && <div className="mt-2 text-sm">{post.excerpt}</div>}
                    </li>
                ))}
            </ul>
        </div>
    );
}
