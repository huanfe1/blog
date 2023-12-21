import truncate from '@/utils/truncate';
import { wordcount } from '@/utils/wordcount';
import { NotionRenderer } from '@notion-render/client';
import hljs from '@notion-render/hljs-plugin';
import { Client } from '@notionhq/client';
import { BlockObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { existsSync, mkdirSync, readFileSync, writeFile } from 'fs';

export type PostProps = {
    title: string;
    date: string;
    content: string;
    tags: string[] | string;
    slug: string;
    excerpt: string;
    wordcount: number;
};

const postsFile = './.temp/posts';
if (!existsSync(postsFile)) mkdirSync(postsFile, { recursive: true });

export type archivesPostProps = Omit<PostProps, 'content' | 'excerpt' | 'wordcount' | 'tags'>;

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

export const getArchivesPost = async (): Promise<archivesPostProps[] | null> => {
    const filePath = './.temp/archives.json';
    if (existsSync(filePath)) return JSON.parse(readFileSync(filePath, 'utf-8'));
    const { results } = (await notion.databases.query({
        filter: { property: '状态', status: { equals: '发布' } },
        sorts: [{ property: '日期', direction: 'descending' }],
        database_id: process.env.NOTION_DATABASE_ID!,
    })) as { results: PageObjectResponse[] };
    const post = results.map(result => {
        return {
            title: result.properties['标题']['title'][0]['plain_text'],
            date: result.properties['日期']['date']['start'],
            slug: result.properties['slug']['rich_text'][0]['plain_text'],
        };
    });
    writeFile(filePath, JSON.stringify(post), 'utf-8', () => {});
    return post;
};

/** 根据 slug 获取文章 */
export const getPostBySlug = async (slug: string): Promise<PostProps> => {
    const filePath = `./.temp/posts/${slug}.json`;
    if (existsSync(filePath)) return JSON.parse(readFileSync(filePath, 'utf-8'));
    const data = await notion.databases.query({
        filter: { property: 'slug', rich_text: { equals: slug } },
        database_id: process.env.NOTION_DATABASE_ID!,
    });
    const results = data.results[0] as PageObjectResponse;
    let content = await getPostHtml(results.id);
    content = content.replace(/((?<=>)[\s]+)|([\s]+(?=<))|(^\s+)|(\s+$)/g, '');
    const rawContent = content.replace(/<[^>]+>/g, '');
    const post: PostProps = {
        title: results.properties['标题']['title'][0]['plain_text'],
        date: results.properties['日期']['date']['start'],
        content: content,
        tags: results.properties['标签']['multi_select'].map(tag => tag.name),
        slug: results.properties['slug']['rich_text'][0]['plain_text'],
        wordcount: wordcount(rawContent),
        excerpt: truncate(rawContent),
    };
    writeFile(filePath, JSON.stringify(post), 'utf-8', () => {});
    return post;
};

/** 根据ID获取文章内容，并转化为HTML */
export const getPostHtml = async (id: string) => {
    console.log(id);
    const { results } = await notion.blocks.children.list({
        block_id: id,
    });
    const renderer = new NotionRenderer();
    renderer.use(hljs({}));
    const html = await renderer.render(...(results as BlockObjectResponse[]));
    return html;
};

export const getAllPosts = async (): Promise<PostProps[]> => {
    const data = await getArchivesPost();
    const posts = Promise.all(data.map(async post => await getPostBySlug(post.slug)));
    return posts;
};
