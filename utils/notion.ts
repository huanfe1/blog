// const notion = new Client({
//     auth: process.env.NOTION_TOKEN,
// });
// const getAllPosts = async (): Promise<PostProps[]> => {
//     const { results } = (await notion.databases.query({
//         filter: { property: '状态', status: { equals: '发布' } },
//         sorts: [{ property: '日期', direction: 'descending' }],
//         database_id: process.env.NOTION_DATABASE_ID!,
//     })) as { results: PageObjectResponse[] };
//     // const data = (await Promise.all(
//     //     results.map(async (result): Promise<{}> => {
//     //         return await getPostById(result.id);
//     //     })
//     // )) as PostProps[];
//     // return data;
//     return [await getPostById(results[0].id)];
// };
// const getPostById = async (id: string): Promise<PostProps> => {
//     console.log(id);
//     const results = (await notion.pages.retrieve({ page_id: id })) as PageObjectResponse;
//     const content = await getPostHtml(results.id);
//     const rawContent = content
//         .replace(/[\n\r ]/g, '')
//         .match(/<p>(.*?)<\/p>/g)
//         .join()
//         .replace(/<[^>]+>/g, '');
//     return {
//         title: results.properties['标题']['title'][0]['plain_text'],
//         date: results.properties['日期']['date']['start'],
//         content: content,
//         tags: results.properties['标签']['multi_select'].map(tag => tag.name),
//         slug: results.properties['slug']['rich_text'][0]['plain_text'],
//         wordcount: wordcount(rawContent),
//         excerpt: truncate(rawContent),
//     };
// };
// /** 根据ID获取文章内容，并转化为HTML */
// const getPostHtml = async (id: string) => {
//     const { results } = await notion.blocks.children.list({
//         block_id: id,
//     });
//     const renderer = new NotionRenderer();
//     renderer.use(hljs({}));
//     const html = await renderer.render(...(results as BlockObjectResponse[]));
//     return html;
// };
// let CACHE: PostProps[] | null = null;
// export const allPosts = async (): Promise<PostProps[]> => {
//     if (CACHE) return CACHE;
//     CACHE = await getAllPosts();
//     return CACHE;
// };
import { readFileSync } from 'fs';

// import truncate from '@/utils/truncate';
// import { wordcount } from '@/utils/wordcount';
// import { NotionRenderer } from '@notion-render/client';
// import hljs from '@notion-render/hljs-plugin';
// import { Client } from '@notionhq/client';
// import { BlockObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
export type PostProps = {
    title: string;
    date: string;
    content: string;
    tags: string[] | string;
    slug: string;
    excerpt: string;
    wordcount: number;
};

export const allPosts: PostProps[] = JSON.parse(readFileSync('.cache.json', 'utf-8'));
