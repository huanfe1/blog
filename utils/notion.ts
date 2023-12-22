import truncate from '@/utils/truncate';
import { wordcount } from '@/utils/wordcount';
import { NotionRenderer } from '@notion-render/client';
import hljs from '@notion-render/hljs-plugin';
import { Client } from '@notionhq/client';
import { BlockObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

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

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

/** 根据 slug 获取文章 */
export const getPostBySlug = async (slug: string): Promise<PostProps> => {
    console.log('获取文章', slug);
    const data = await notion.databases.query({
        filter: { property: 'slug', rich_text: { equals: slug } },
        database_id: process.env.NOTION_DATABASE_ID!,
    });
    const result = data.results[0] as PageObjectResponse;
    let content = await getPostHtml(result.id);
    content = content.replace(/((?<=>)[\s]+)|([\s]+(?=<))|(^\s+)|(\s+$)/g, '');
    const rawContent = content.replace(/<[^>]+>/g, '');
    const post: PostProps = {
        title: result.properties['标题']['title'][0]['plain_text'],
        date: result.properties['日期']['date']['start'],
        content: content,
        tags: result.properties['标签']['multi_select'].map(tag => tag.name),
        slug: result.properties['slug']['rich_text'][0]['plain_text'],
        wordcount: wordcount(rawContent),
        summary: result.properties['概括']['rich_text'][0]['plain_text'] || truncate(rawContent),
    };
    return post;
};

/** 根据ID获取文章内容，并转化为HTML */
export const getPostHtml = async (id: string) => {
    const { results } = await notion.blocks.children.list({
        block_id: id,
    });
    const renderer = new NotionRenderer();
    renderer.use(hljs({}));
    const html = await renderer.render(...(results as BlockObjectResponse[]));
    return html;
};

export const getAllPosts = async (): Promise<AllPostsProps[]> => {
    console.log('获取所有文章');
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
            summary: result.properties['概括']['rich_text'][0]['plain_text'],
        };
    });
    return post;
};
