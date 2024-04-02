import { Button } from '@nextui-org/button';
import Link from 'next/link';

export default function Pagination({ current, total }: { current: number; total: number }) {
    if (total === 1) return null;
    function Prev() {
        const url = current === 2 ? '/' : `/page/${current - 1}`;
        if (current === 1) return <div></div>;
        return (
            <Button color="primary" className="px-0">
                <Link href={url} title="上一页" className="flex h-full w-full items-center justify-center">
                    上一页
                </Link>
            </Button>
        );
    }
    function Next() {
        if (current === total) return <div></div>;
        const url = `/page/${current + 1}`;
        return (
            <div>
                <Button color="primary" className="px-0">
                    <Link href={url} title="下一页" className="flex h-full w-full items-center justify-center">
                        下一页
                    </Link>
                </Button>
            </div>
        );
    }
    return (
        <nav className="mt-6 flex items-center justify-between">
            <Prev />
            <Next />
        </nav>
    );
}
