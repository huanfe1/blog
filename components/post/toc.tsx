import { BlockType } from 'notion-types';
import { useEffect, useRef } from 'react';

export function TocLink({ links }) {
    const refs = useRef({});
    useEffect(() => {
        const scrollHandler = () => {
            const scroll = document.documentElement.scrollTop;
            const links = refs.current;
            let temp = null;
            for (const i in links) {
                if (!links[i]?.current?.classList) continue;
                links[i].current.classList.remove('active');
            }
            for (const i in links) {
                const ref = links[i].current;
                if (scroll >= (document.getElementById(ref?.dataset?.title) as HTMLElement)?.offsetTop - 50) {
                    temp = ref;
                } else {
                    break;
                }
            }
            if (temp) temp.classList.add('active');
        };
        document.addEventListener('scroll', scrollHandler);
        return () => {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, [refs]);

    return (
        <ul id="toc" className="fixed right-28 top-52 hidden space-y-2 p-5 text-sm text-default-500 xl:block">
            {links.map((link: { name: string; level: number }, _: number) => (
                <li
                    key={link.name}
                    style={{
                        paddingLeft: `${(link.level - 1) * 15}px`,
                    }}
                    className="hover:text-primary"
                >
                    <a
                        href={`#${link.name}`}
                        data-title={link.name}
                        ref={(refs.current[_] ??= { current: null })}
                        className="toc-link"
                    >
                        {decodeURI(link.name)}
                    </a>
                </li>
            ))}
        </ul>
    );
}

export default function Toc({ nodes }: { nodes: { type: BlockType; value: any }[] }) {
    const links = nodes
        .filter(node => /header$/.test(node.type))
        .map(node => {
            return {
                name: node.value.title[0][0] as string,
                level: node.type.match(/sub/g).length,
            };
        });
    if (links.length <= 1) return null;

    return <TocLink links={links} />;
}
