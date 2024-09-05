'use client';

import { useEffect } from 'react';

import { PostProps } from '@/utils/data';

export default function Toc({ content }: { content: PostProps['toc'] }) {
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
                document.querySelectorAll(`#toc a.active`).forEach(item => (item.className = ''));
                document.querySelector(`#toc a[href="#${closestElement}"`)!.className = 'active';
            }
        };
        scrollHandler();
        document.addEventListener('scroll', scrollHandler);
        return () => {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    if (!content) return null;
    return (
        <ul id="toc">
            {content.map(link => (
                <li key={link.id}>
                    <a href={`#${link.id}`}>
                        <span style={{ paddingLeft: `${(link.level - 2) * 15}px` }}>{link.title}</span>
                    </a>
                </li>
            ))}
        </ul>
    );
}
