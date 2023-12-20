import { NotionRenderer } from '@notion-render/client';
import hljs from '@notion-render/hljs-plugin';
import { Client } from '@notionhq/client';
import { existsSync, writeFileSync } from 'fs';

import truncate from './utils/truncate.mjs';
import { wordcount } from './utils/wordcount.mjs';

const notion = new Client({
    auth: 'secret_7xnffq7pVFwEvgCvwj4F7XxhW7j4tEpmvPgY5IQdSWT',
});

const getAllPosts = async () => {
    const { results } = await notion.databases.query({
        filter: { property: '状态', status: { equals: '发布' } },
        sorts: [{ property: '日期', direction: 'descending' }],
        database_id: 'd0a6fa17dc7a4c4aac4c9b86dfafaa00',
    });

    // eslint-disable-next-line no-undef
    const data = await Promise.all(
        results.map(async result => {
            return await getPostById(result.id);
        })
    );
    return data;
};

const getPostById = async id => {
    console.log(id);
    const results = await notion.pages.retrieve({ page_id: id });
    const content = await getPostHtml(results.id);
    const rawContent = content
        .replace(/[\n\r ]/g, '')
        .match(/<p>(.*?)<\/p>/g)
        .join()
        .replace(/<[^>]+>/g, '');
    return {
        title: results.properties['标题']['title'][0]['plain_text'],
        date: results.properties['日期']['date']['start'],
        content: content,
        tags: results.properties['标签']['multi_select'].map(tag => tag.name),
        slug: results.properties['slug']['rich_text'][0]['plain_text'],
        wordcount: wordcount(rawContent),
        excerpt: truncate(rawContent),
    };
};

/** 根据ID获取文章内容，并转化为HTML */
const getPostHtml = async id => {
    const { results } = await notion.blocks.children.list({
        block_id: id,
    });
    const renderer = new NotionRenderer();
    renderer.use(hljs({}));
    const html = await renderer.render(...results);
    return html;
};

getAllPosts().then(posts => {
    if (existsSync('.cache.json')) return;
    writeFileSync('.cache.json', JSON.stringify(posts), { encoding: 'utf-8' });
});
