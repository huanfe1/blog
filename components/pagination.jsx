import Link from 'next/link';

const buttonStyle = 'rounded-xl bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 shadow';

export function Prev({ current }) {
    if (current === 1) return <div></div>;
    return (
        <Link href={current === 2 ? '/' : `/page/${current - 1}`} className={buttonStyle}>
            上一页
        </Link>
    );
}

export function Next({ current, total }) {
    if (current === total) return <div></div>;
    return (
        <Link href={`/page/${current + 1}`} className={buttonStyle}>
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
