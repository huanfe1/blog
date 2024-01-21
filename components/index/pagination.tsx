import { Button } from '@nextui-org/button';
import { useRouter } from 'next/router';

export default function Pagination({ current, total }: { current: number; total: number }) {
    const router = useRouter();
    if (total === 1) return null;
    function Prev() {
        const url = current === 2 ? '/' : `/page/${current - 1}`;
        const hover = () => router.prefetch(url);
        const click = () => router.push(url);
        if (current === 1) return <div></div>;
        return (
            <Button color="primary" onClick={click} onMouseEnter={hover}>
                上一页
            </Button>
        );
    }
    function Next() {
        if (current === total) return <div></div>;
        const url = `/page/${current + 1}`;
        const hover = () => router.prefetch(url);
        const click = () => router.push(url);
        return (
            <div>
                <Button color="primary" onClick={click} onMouseEnter={hover}>
                    下一页
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
