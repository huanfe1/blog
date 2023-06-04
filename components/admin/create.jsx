import { useState } from 'react';
import toast from 'react-hot-toast';

function Clear({ title, setTitle }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            onClick={() => {
                setTitle('');
            }}
            className="absolute right-3 mr-1 h-5 w-5 cursor-pointer rounded-full bg-gray-500 p-1 hover:bg-gray-700"
            style={{ visibility: title ? 'inherit' : 'hidden' }}
        >
            <path
                fill="currentColor"
                d="M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128L50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128Z"
            />
        </svg>
    );
}

export default function Input() {
    const [title, setTitle] = useState('');
    const click = () => {
        if (!title) return;
        if (!confirm('是否创建名为 ' + title + ' 的草稿')) return;
        fetch('/api/posts/create?title=' + title)
            .then(res => res.json())
            .then(res => {
                if (res.code === 0) {
                    toast.success('已成功创建草稿');
                    setTitle('');
                } else {
                    toast.error('草稿创建失败' + res.message);
                }
            });
    };
    return (
        <div className="mt-5 flex w-full overflow-hidden rounded-xl border border-[--border] bg-[--main] p-1">
            <div className="relative flex w-full items-center">
                <input
                    type="text"
                    placeholder="输入标题以创建新草稿"
                    className="h-full flex-1 bg-transparent px-3 outline-none"
                    value={title}
                    onChange={e => {
                        setTitle(e.target.value);
                    }}
                    onKeyDown={e => {
                        if (e.key === 'Enter') click();
                    }}
                />
                <Clear title={title} setTitle={setTitle} />
            </div>
            <button
                type="button"
                className={
                    'flex-none rounded-xl bg-blue-500 px-7 py-2 text-white hover:bg-blue-600' +
                    (Boolean(title) ? '' : ' cursor-not-allowed')
                }
                onClick={click}
                disabled={!Boolean(title)}
            >
                创建
            </button>
        </div>
    );
}
