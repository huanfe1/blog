import Layout from '@/components/layout';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { fetchShowData } from '@/utils/database';

export function Input() {
    if (process.env.NODE_ENV !== 'development') return null;
    const [title, setTitle] = useState('');
    const [confirm, setConfirm] = useState(false);
    const click = () => {
        if (!title) return;
        if (confirm) {
            fetch('api/create?title=' + title)
                .then(res => res.json())
                .then(res => {
                    if (res.code === 0) {
                        toast.success('已成功创建文章');
                        setTitle('');
                        setConfirm(!confirm);
                    } else {
                        toast.error('文章创建失败');
                    }
                });
        } else {
            setConfirm(!confirm);
        }
    };
    const change = e => {
        if (confirm) setConfirm(!confirm);
        setTitle(e.target.value);
    };
    return (
        <div className="mt-5 flex w-full overflow-hidden rounded-xl border bg-white p-1">
            <div className="relative flex w-full items-center">
                <input
                    type="text"
                    placeholder="输入标题以创建新文章"
                    className="h-full flex-1 bg-transparent px-3 outline-none"
                    value={title}
                    onChange={change}
                    onKeyDown={e => {
                        if (e.key === 'Enter') click();
                    }}
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    onClick={() => {
                        setTitle('');
                        setConfirm(false);
                    }}
                    className="absolute right-3 mr-1 h-5 w-5 cursor-pointer rounded-full bg-gray-200 p-1 hover:bg-gray-300"
                    style={{ visibility: title ? 'inherit' : 'hidden' }}
                >
                    <path
                        fill="currentColor"
                        d="M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128L50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128Z"
                    />
                </svg>
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
                {confirm ? '确认创建' : '创建'}
            </button>
        </div>
    );
}

export function ShowData({ data }) {
    if (process.env.NODE_ENV !== 'development') return null;
    const items = [
        { title: '文章数量', data: data.posts },
        { title: '总字数', data: data.wordcount },
        { title: '标签', data: data.tags },
        { title: '距上次更新', data: data.update },
    ];
    return (
        <ul className="grid grid-cols-4 gap-x-3">
            {items.map((item, index) => (
                <li key={index} className="flex flex-col space-y-1 rounded-xl bg-white p-3 text-center shadow-sm">
                    <span>{item.title}</span>
                    <span>{item.data}</span>
                </li>
            ))}
        </ul>
    );
}

export default function Admin({ data }) {
    if (process.env.NODE_ENV !== 'development') return <Layout title="管理页面">404</Layout>;
    return (
        <Layout title="管理页面">
            <Toaster />
            <ShowData data={data} />
            <Input />
        </Layout>
    );
}

export async function getStaticProps() {
    if (process.env.NODE_ENV !== 'development') return { notFound: true };
    return {
        props: {
            data: await fetchShowData(),
        },
    };
}
