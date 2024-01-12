import { NotionRenderer } from '@notion-render/client';
import hljs from '@notion-render/hljs-plugin';
import { Client } from '@notionhq/client';
import { BlockObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { parse } from 'node-html-parser';
import probeImageSize from 'probe-image-size';

import { Cache } from './cache';
import truncate from './truncate';
import { wordcount } from './wordcount';

export type AllPostsProps = {
    title: string;
    slug: string;
    date: string;
    summary: string;
    cover: string;
};

export type PostProps = AllPostsProps & {
    content: string;
    tags: string[] | string;
    wordcount: number;
};

const cache = Cache('.temp');
// 是否在 Vercel 运行期间
const IsVercel: boolean = !!process.env.VERCEL_REGION;

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});
const postStatus = { published: '发布', draft: '草稿', editing: '修改' };

/** 根据 slug 获取文章 */
export const getPostBySlug = async (slug: string): Promise<PostProps> => {
    if (!IsVercel && cache.get(`${slug}`)) return cache.get(`${slug}`);
    console.log(slug);
    const data = await notion.databases.query({
        filter: {
            and: [
                { property: 'status', status: { does_not_equal: postStatus.draft } },
                { property: 'slug', rich_text: { equals: slug } },
            ],
        },
        database_id: process.env.NOTION_DATABASE_ID!,
    });
    if (!data.results[0]) return;
    const result = data.results[0] as PageObjectResponse;
    cache.set(`${slug}-result`, data);
    const content = await getPostHtmlById(result.id);
    const summary = result.properties['summary']['rich_text'][0];
    const cover = result.properties['cover']['files'][0];

    const post: PostProps = {
        title: result.properties['title']['title'][0]['plain_text'],
        date: result.properties['date']['date']['start'],
        content: content,
        tags: result.properties['tags']['multi_select'].map((tag: { name: string }) => tag.name),
        slug: result.properties['slug']['rich_text'][0]['plain_text'],
        wordcount: wordcount(content.replace(/<[^>]+>/g, '')),
        summary: truncate(summary ? summary['plain_text'] : ''),
        cover: cover ? cover[cover['type']]['url'] : '',
    };

    !IsVercel && result.properties['status']['status']['name'] === postStatus.published && cache.set(`${slug}`, post);

    return post;
};

/** 根据ID获取文章内容，并转化为HTML */
export const getPostHtmlById = async (id: string) => {
    console.log(id);
    const { results } = await notion.blocks.children.list({
        block_id: id,
    });
    const renderer = new NotionRenderer();
    renderer.use(hljs({}));
    let html = await renderer.render(...(results as BlockObjectResponse[]));
    const document = parse(html);
    document.querySelectorAll('h1, h2, h3').forEach(el => {
        const title = el.innerHTML.replace(/\n\s+/g, '');
        el.setAttribute('id', encodeURI(title));
        el.innerHTML = `<a class="anchor" href="#${title}">#</a>${title}`;
    });
    for (const img of document.querySelectorAll('img')) {
        const url = img.getAttribute('src');
        const { width, height } = await probeImageSize(url);
        img.setAttribute('width', width.toString());
        img.setAttribute('height', height.toString());
    }
    html = document.toString();
    return html;
};

/** 获取数据库文章内容 */
export const getAllPosts = async (): Promise<AllPostsProps[]> => {
    if (!IsVercel && cache.get('posts')) return cache.get('posts');

    const { results } = (await notion.databases.query({
        filter: { property: 'status', status: { equals: postStatus.published } },
        sorts: [{ property: 'date', direction: 'descending' }],
        database_id: process.env.NOTION_DATABASE_ID!,
    })) as { results: PageObjectResponse[] };
    const post = results.map(result => {
        const summary = result.properties['summary']['rich_text'][0];
        const cover = result.properties['cover']['files'][0];
        return {
            title: result.properties['title']['title'][0]['plain_text'],
            date: result.properties['date']['date']['start'],
            slug: result.properties['slug']['rich_text'][0]['plain_text'],
            summary: truncate(summary ? summary['plain_text'] : ''),
            cover: cover ? cover[cover['type']]['url'] : '',
        };
    });

    !IsVercel && cache.set('posts', post);

    return post;
};
