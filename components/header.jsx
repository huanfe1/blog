import Link from 'next/link';

const items = [
    { title: '首页', link: '/' },
    { title: '标签', link: '/tags' },
    { title: '归档', link: '/archives' },
    { title: '订阅', link: '/atom.xml' },
    { title: '关于', link: '/about' },
];

if (process.env.NODE_ENV !== 'production') items.push({ title: '管理', link: '/admin' });

const linkStyle = 'px-3 py-4 hover:bg-gray-300 hover:text-blue-700';

export default function header() {
    return (
        <nav className="flex w-full flex-row items-center justify-center bg-white px-3 shadow sm:justify-between sm:px-16">
            <div className="hidden sm:flex">
                <Link href="/" className={linkStyle}>
                    幻非
                </Link>
            </div>
            <div className="flex">
                {items.map(item => (
                    <Link href={item.link} key={item.title} className={linkStyle}>
                        {item.title}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
