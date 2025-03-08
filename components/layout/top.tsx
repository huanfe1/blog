'use client';

export default function Top() {
    const click = () => {
        window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    };
    return (
        <button aria-label="返回顶部" className="fixed bottom-10 right-10 z-20 hidden cursor-pointer rounded-xl p-1 md:flex" onClick={click}>
            <span className="i-mingcute-up-line text-3xl" aria-hidden></span>
        </button>
    );
}
