import { NotionRenderer } from '@notion-render/client';
import hljs from '@notion-render/hljs-plugin';
import { Client } from '@notionhq/client';
import { BlockObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';

import truncate from './truncate';
import { wordcount } from './wordcount';

export type AllPostsProps = {
    title: string;
    slug: string;
    date: string;
    summary: string;
};

export type PostProps = AllPostsProps & {
    content: string;
    tags: string[] | string;
    wordcount: number;
};

const DEVELOPMENT: boolean = process.env.NODE_ENV === 'development';
const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

if (!existsSync('.temp')) mkdirSync('.temp');

/** 根据 slug 获取文章 */
export const getPostBySlug = async (slug: string): Promise<PostProps> => {
    const path = `./.temp/${slug}.json`;
    if (DEVELOPMENT && existsSync(path)) {
        return JSON.parse(readFileSync(path, 'utf-8'));
    }
    console.log('get post', slug);
    const data = await notion.databases.query({
        filter: {
            and: [
                { property: '状态', status: { equals: '发布' } },
                { property: 'slug', rich_text: { equals: slug } },
            ],
        },
        database_id: process.env.NOTION_DATABASE_ID!,
    });
    if (!data.results[0]) return;
    const result = data.results[0] as PageObjectResponse;

    const content = await getPostHtmlById(result.id);
    const summary = result.properties['概括']['rich_text'][0];

    const post: PostProps = {
        title: result.properties['标题']['title'][0]['plain_text'],
        date: result.properties['日期']['date']['start'],
        content: content,
        tags: result.properties['标签']['multi_select'].map(tag => tag.name),
        slug: result.properties['slug']['rich_text'][0]['plain_text'],
        wordcount: wordcount(content.replace(/<[^>]+>/g, '')),
        summary: truncate(summary ? summary['plain_text'] : ''),
    };

    DEVELOPMENT && writeFileSync(path, JSON.stringify(post));
    return post;
};

/** 根据ID获取文章内容，并转化为HTML */
export const getPostHtmlById = async (id: string) => {
    const { results } = await notion.blocks.children.list({
        block_id: id,
    });
    const renderer = new NotionRenderer();
    renderer.use(hljs({}));
    let html = await renderer.render(...(results as BlockObjectResponse[]));

    // 更改标题
    html = html.replace(/<h([1-6]) .*?>\n\s+(.*?)\n\s+<\/h[1-6]>/g, '<h$1 id="$2"><span>$2</span></h$1>');
    // // 链接前后空格
    html = html.replace(/<a (.*?)<\/a>/g, ' <a $1</a> ');
    return html;
};

/** 获取数据库文章内容 */
export const getAllPosts = async (): Promise<AllPostsProps[]> => {
    const path = '.temp/posts.json';
    // console.log(process.env.VERCEL_REGION ? '此代码在 Vercel 上运行' : '此代码在部署阶段');
    if (!process.env.VERCEL_REGION && existsSync(path)) {
        return JSON.parse(readFileSync(path, 'utf-8'));
    }
    console.log('get all posts');
    const { results } = (await notion.databases.query({
        filter: { property: '状态', status: { equals: '发布' } },
        sorts: [{ property: '日期', direction: 'descending' }],
        database_id: process.env.NOTION_DATABASE_ID!,
    })) as { results: PageObjectResponse[] };
    const post = results.map(result => {
        const summary = result.properties['概括']['rich_text'][0];
        return {
            title: result.properties['标题']['title'][0]['plain_text'],
            date: result.properties['日期']['date']['start'],
            slug: result.properties['slug']['rich_text'][0]['plain_text'],
            summary: truncate(summary ? summary['plain_text'] : ''),
        };
    });
    !process.env.VERCEL_REGION && writeFileSync(path, JSON.stringify(post));
    return post;
};
