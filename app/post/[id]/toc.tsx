'use client';

import classNames from 'classnames';
import { useEffect, useState } from 'react';

type TocProps = { content: { title: string; id: string; level: number }[] };

export default function Toc({ content }: TocProps) {
    const [active, setActive] = useState<string>('');
    useEffect(() => {
        const scrollHandler = () => {
            const scroll = document.documentElement.scrollTop - 200;
            let tempActive = '';
            for (const { id } of content) {
                const element = document.getElementById(id);
                if (element!.offsetTop > scroll) break;
                tempActive = id;
            }
            setActive(tempActive);
        };
        scrollHandler();
        document.addEventListener('scroll', scrollHandler);
        return () => document.removeEventListener('scroll', scrollHandler);
    }, []);

    const itemStyle = 'cursor-pointer opacity-40 transition-colors text-sm';

    return (
        <ul className="sticky top-[150px] hidden translate-x-[885px] space-y-1 text-sm xl:block">
            {content.map(link => (
                <li key={link.id}>
                    <span
                        style={{ paddingLeft: `${(link.level - 2) * 15}px` }}
                        className={classNames(
                            itemStyle,
                            link.id === active ? 'font-bold opacity-70' : 'hover:font-bold hover:opacity-70',
                        )}
                        onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        {link.title}
                    </span>
                </li>
            ))}
        </ul>
    );
}
