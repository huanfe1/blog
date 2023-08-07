import { Button } from './button';
import Link from 'next/link';

export default function Pagination({ current, total }: { current: number; total: number }) {
    if (total === 1) return null;
    function Prev() {
        if (current === 1) return <div></div>;
        return (
            <Link href={current === 2 ? '/' : `/page/${current - 1}`}>
                <Button>上一页</Button>
            </Link>
        );
    }
    function Next() {
        if (current === total) return <div></div>;
        return (
            <Link href={`/page/${current + 1}`}>
                <Button>下一页</Button>
            </Link>
        );
    }
    return (
        <nav className="mt-6 flex items-center justify-between">
            <Prev />
            <Next />
        </nav>
    );
}
