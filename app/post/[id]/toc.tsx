'use client';

import { useEffect } from 'react';

type TocProps = { content: { title: string; id: string; level: number }[] };

export default function Toc({ content }: TocProps) {
    useEffect(() => {
        if (!content) return;
        const scrollHandler = () => {
            const scroll = document.documentElement.scrollTop;
            let closestElement = '';
            let minDistance = Infinity;

            for (const { id } of content) {
                const element = document.getElementById(id);
                if (element) {
                    const elementTop = element.offsetTop;
                    const distance = Math.abs(elementTop - scroll);

                    if (distance < minDistance) {
                        minDistance = distance;
                        closestElement = id;
                    }
                }
            }
            if (closestElement) {
                document.querySelectorAll(`#toc span.active`).forEach(item => (item.className = ''));
                document.querySelector(`#toc span[data-link="${closestElement}"`)!.className = 'active';
            }
        };
        scrollHandler();
        document.addEventListener('scroll', scrollHandler);
        return () => document.removeEventListener('scroll', scrollHandler);
    }, []);

    if (!content) return null;
    return (
        <ul id="toc">
            {content.map(link => (
                <li key={link.id}>
                    <span
                        onClick={() => {
                            document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        data-link={link.id}
                        style={{ paddingLeft: `${(link.level - 2) * 15}px` }}
                    >
                        {link.title}
                    </span>
                </li>
            ))}
        </ul>
    );
}
