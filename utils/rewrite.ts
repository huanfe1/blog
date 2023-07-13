import { Element } from 'hast';

export default function rewrite(arg: string[]): Element[] {
    switch (arg[0]) {
        case 'title':
            return [
                {
                    type: 'element',
                    tagName: 'div',
                    properties: { className: 'text-2xl' },
                    children: [{ type: 'text', value: arg[1] }],
                },
            ];
        case 'bilibili':
            return [
                {
                    type: 'element',
                    tagName: 'iframe',
                    properties: {
                        src: `https://player.bilibili.com/player.html?bvid=${arg[1]}`,
                        width: '100%',
                        height: '500px',
                    },
                    children: [],
                },
            ];
        case 'youtube':
            return [
                {
                    type: 'element',
                    tagName: 'iframe',
                    properties: {
                        src: `https://www.youtube.com/embed/${arg[1]}`,
                        width: '100%',
                        height: '500px',
                    },
                    children: [],
                },
            ];
    }
}
