import { allPosts } from '@/.contentlayer/generated';
import dayjs from 'dayjs';
import fs from 'fs';

allPosts.sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix());

const url: string = 'https://blog.huanfei.top';

const header: string = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
<loc>${url}</loc>
</url>
`;

const posts: string[] = allPosts.map(
    post => `
<url>
    <loc>https://blog.huanfei.top/post/${post.abbrlink}</loc>
    <lastmod>${dayjs(post.date).toISOString()}</lastmod>
</url>
`
);

const mix: string = `
<url>
    <loc>${url}/archives</loc>
</url>
`;

const categories: string[] = allPosts
    .filter(post => post.categories)
    .map(
        post => `
<url>
    <loc>${url}/categories/${encodeURI(post.categories)}</loc>
</url>
`
    );

const txt: string = `${allPosts.map(post => `${url}/post/${post.abbrlink}`).join('\n')}
${url}/archives
${allPosts
    .filter(post => post.categories)
    .map(post => `${url}/categories/${encodeURI(post.categories)}`)
    .join('\n')}`;

export default function () {
    const content = [header, ...posts, mix, ...categories].join('') + '</urlset>';
    fs.writeFileSync('./public/sitemap.xml', content.replace(/\n(\n)*( )*(\n)*\n/g, '\n'));
    fs.writeFileSync('./public/sitemap.txt', txt);
}
