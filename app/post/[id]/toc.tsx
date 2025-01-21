'use client';

import { useEffect, useState } from 'react';

type TocProps = { content: { title: string; id: string; level: number }[] };

export default function Toc({ content }: TocProps) {
    const [active, setActive] = useState<string>('');
    useEffect(() => {
        const scrollHandler = () => {
            let tempActive = '';
            let minNum = Infinity;
            for (const { id } of content) {
                const element = document.getElementById(id);
                if (!element) break;
                const top = Math.abs(element.getBoundingClientRect().top);
                if (top < minNum) {
                    minNum = top;
                    tempActive = id;
                } else {
                    break;
                }
            }
            setActive(tempActive);
        };
        scrollHandler();
        document.addEventListener('scroll', scrollHandler);
        return () => document.removeEventListener('scroll', scrollHandler);
    }, [content]);

    const jumpId = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        const { top } = el.getBoundingClientRect();
        window.scrollTo({ top: top + window.scrollY - 35, behavior: 'smooth' });
        // document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <ul id="toc" className="sticky top-[150px] space-y-1 text-sm">
            {content.map(link => (
                <li key={link.id}>
                    <span
                        style={{ paddingLeft: `${(link.level - 2) * 15}px` }}
                        className={active === link.id ? 'active' : ''}
                        onClick={() => jumpId(link.id)}
                    >
                        {link.title}
                    </span>
                </li>
            ))}
        </ul>
    );
}
