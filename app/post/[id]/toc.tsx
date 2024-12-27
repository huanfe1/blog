'use client';

import classNames from 'classnames';
import { useEffect, useState } from 'react';

type TocProps = { content: { title: string; id: string; level: number }[] };

export default function Toc({ content }: TocProps) {
    const [active, setActive] = useState<string>('');
    useEffect(() => {
        const scrollHandler = () => {
            const scroll = document.documentElement.scrollTop;
            let tempActive = '';
            for (const { id } of content) {
                const element = document.getElementById(id);
                if (element!.offsetTop + document.documentElement.clientHeight - 100 > scroll) break;
                tempActive = id;
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
        <ul id="toc" className="sticky top-[150px] hidden space-y-1 text-sm xl:block">
            {content.map(link => (
                <li key={link.id}>
                    <span
                        style={{ paddingLeft: `${(link.level - 2) * 15}px` }}
                        className={classNames({ active: link.id === active })}
                        onClick={() => jumpId(link.id)}
                    >
                        {link.title}
                    </span>
                </li>
            ))}
        </ul>
    );
}
