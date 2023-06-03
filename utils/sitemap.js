import { allPosts } from '@/.contentlayer/generated';
import dayjs from 'dayjs';
import fs from 'fs';

allPosts.sort((a, b) => dayjs(b.date) - dayjs(a.date));

const url = 'https://blog.huanfei.top';

const header = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
<loc>${url}</loc>
</url>
`;

const posts = allPosts.map(
    post => `
<url>
    <loc>https://blog.huanfei.top/post/${post.abbrlink}/</loc>
    <lastmod>${dayjs(post.date).toISOString()}</lastmod>
</url>
`
);

const mix = `
<url>
    <loc>${url}/archives/</loc>
</url>
<url>
    <loc>${url}/tags/</loc>
</url>
`;

const tags = [...new Set(allPosts.map(post => post.tags).flat())].map(
    tag => `
<url>
    <loc>${url}/tags/${encodeURI(tag)}/</loc>
</url>
`
);

const categories = allPosts
    .filter(post => post.categories)
    .map(
        post => `
<url>
    <loc>${url}/categories/${encodeURI(post.categories)}/</loc>
</url>
`
    );

const txt = `${allPosts.map(post => `${url}/post/${post.abbrlink}/`).join('\n')}
${url}/archives/
${url}/tags/
${[...new Set(allPosts.map(post => post.tags).flat())].map(tag => `${url}/tags/${encodeURI(tag)}/`).join('\n')}
${allPosts
    .filter(post => post.categories)
    .map(post => `${url}/categories/${encodeURI(post.categories)}/`)
    .join('\n')}`;

export default function () {
    const content = [header, ...posts, mix, ...tags, ...categories].join('') + '</urlset>';
    fs.writeFileSync('./public/sitemap.xml', content.replace(/\n(\n)*( )*(\n)*\n/g, '\n'));
    fs.writeFileSync('./public/sitemap.txt', txt);
}
