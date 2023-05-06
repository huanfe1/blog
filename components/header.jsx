import Link from 'next/link';

const items = [
    { title: '首页', link: '/' },
    { title: '标签', link: '/tags' },
    { title: '归档', link: '/archives' },
    { title: '关于', link: '/about' },
];

const linkStyle = 'px-3 py-4 hover:bg-gray-300 hover:text-blue-700';

export default function header() {
    return (
        <nav className="bg-main flex w-full flex-row items-center justify-between bg-white px-16 shadow">
            <div className="flex">
                <Link href="/" className={linkStyle} prefetch={false}>
                    幻非
                </Link>
            </div>
            <div className="flex">
                {items.map(item => (
                    <Link href={item.link} key={item.title} className={linkStyle} prefetch={false}>
                        {item.title}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
