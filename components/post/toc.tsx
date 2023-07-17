import { useEffect } from 'react';

export default function Toc({ content }: { content: { tree: { id: string }[]; result: string } }) {
    useEffect(() => {
        const links = content.tree;
        const scrollHandler = () => {
            let temp = '';
            const scroll = document.documentElement.scrollTop;
            for (const link of links) {
                if (scroll >= (document.querySelector(`#${link.id}`) as HTMLElement).offsetTop - 10) {
                    temp = link.id;
                } else {
                    break;
                }
            }
            document.querySelectorAll('#toc a.toc-link').forEach(item => {
                item.classList.remove('active');
            });
            if (!temp) return;
            document.querySelector(`#toc a.toc-link[href="#${encodeURI(temp)}"]`).classList.add('active');
        };
        document.addEventListener('scroll', scrollHandler);
        return () => {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, [content]);
    return <div id="toc" dangerouslySetInnerHTML={{ __html: content.result }}></div>;
}
