import type { Link, Root, Text } from 'mdast';
import { visit } from 'unist-util-visit';

const youtubeIframe = (url: string, id: string): Text[] => {
    return [
        {
            type: 'text',
            value: url,
            data: {
                hName: 'iframe',
                hProperties: {
                    width: '100%',
                    style: 'aspect-ratio: 16 / 9',
                    src: `https://www.youtube.com/embed/${id}`,
                    frameborder: '0',
                    allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
                    allowfullscreen: true,
                },
                hChildren: [],
            },
        },
    ];
};

const bilibiliIframe = (url: string, id: string): Text[] => {
    return [
        {
            type: 'text',
            value: url,
            data: {
                hName: 'iframe',
                hProperties: {
                    width: '100%',
                    style: 'aspect-ratio: 16 / 9',
                    src: `https://player.bilibili.com/player.html?bvid=${id}`,
                    frameborder: '0',
                    allowfullscreen: true,
                },
                hChildren: [],
            },
        },
    ];
};

const remarkYoutubePlugin = () => (tree: Root) => {
    visit(tree, 'paragraph', node => {
        for (const child of node.children) {
            if (child.type === 'text' || child.type === 'link') {
                const url = (child as Link)?.url ?? (child as Text)?.value;
                {
                    const match = url.match(/^https:\/\/(?:youtu\.be\/|www\.youtube\.com\/watch\?v=)(\w+)/);
                    if (match) {
                        node.children = youtubeIframe(url, match[1]);
                        break;
                    }
                }
                {
                    const match = url.match(/^https:\/\/www\.bilibili\.com\/video\/(\w+)/);
                    if (match) {
                        node.children = bilibiliIframe(url, match[1]);
                        break;
                    }
                }
            }
        }
    });
};

export default remarkYoutubePlugin;
