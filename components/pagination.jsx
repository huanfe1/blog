import Link from 'next/link';

export function Prev({ current }) {
    if (current === 1) return <div></div>;
    return (
        <Link href={current === 2 ? '/' : `/page/${current - 1}`} className="rounded-xl bg-white px-3 py-2 shadow">
            上一页
        </Link>
    );
}

export function Next({ current, total }) {
    if (current === total) return <div></div>;
    return (
        <Link href={`/page/${current + 1}`} className="rounded-xl bg-white px-3 py-2 shadow">
            下一页
        </Link>
    );
}

export default function Pagination({ current, total }) {
    return (
        <nav className="mt-6 flex items-center justify-between">
            <Prev current={current} />
            <Next current={current} total={total} />
        </nav>
    );
}
