import dayjs from 'dayjs';
import { NotionAPI } from 'notion-client';
import { ExtendedRecordMap } from 'notion-types';
import { getBlockTitle, getPageProperty, parsePageId } from 'notion-utils';
import probe from 'probe-image-size';

import { cache } from './cache';
import truncate from './truncate';
import { wordcount } from './wordcount';

export type AllPostsProps = {
    title: string;
    slug: string;
    date: string;
    summary: string;
    cover: string;
    id: string;
};

export type PostProps = AllPostsProps & {
    content: any;
    tags: string[] | string;
    wordcount: number;
};

const postStatus = { published: '发布', draft: '草稿', editing: '修改' };

const notion = new NotionAPI({
    activeUser: process.env.NOTION_ACTIVE_USER,
    authToken: process.env.NOTION_TOKEN_V2,
});

/** 根据 slug 获取文章 */
export const getPostBySlug = async (slug: string): Promise<PostProps> => {
    const posts = await getAllPosts();
    const pageid = parsePageId(posts.filter(post => post.slug === slug)[0].id);
    console.log(slug, pageid);
    const recordMap: ExtendedRecordMap = cache().get(slug) || (await notion.getPage(pageid));

    let rawText: string = '';
    const pageBlock = Object.values(recordMap.block)[0].value;

    const content = [];
    for (const key in recordMap.block) {
        if (key === pageid) continue;
        if (recordMap.block[key].value.parent_id !== pageid) continue;

        // 累加文本，用以计算字数
        rawText += getBlockTitle(recordMap.block[key].value, recordMap);

        // 处理图片尺寸
        if (recordMap.block[key].value.type === 'image' && !recordMap.block[key].value.properties?.url) {
            const url = recordMap.block[key].value.properties.source[0][0];
            console.log(url);
            const { width, height } = await probe(url);
            recordMap.block[key].value.properties = { url, width, height };
        }

        content.push({
            type: recordMap.block[key].value.type,
            value: recordMap.block[key].value.properties || null,
        });
    }

    !cache().get(slug) && cache().set(slug, recordMap);

    return {
        id: pageid,
        title: getPageProperty('title', pageBlock, recordMap),
        slug: getPageProperty('slug', pageBlock, recordMap),
        date: dayjs(getPageProperty('date', pageBlock, recordMap)).format('YYYY-MM-DD'),
        summary: truncate(getPageProperty('summary', pageBlock, recordMap)),
        cover: getPageProperty('cover', pageBlock, recordMap),
        tags: getPageProperty('tags', pageBlock, recordMap),
        wordcount: wordcount(rawText),
        content: content,
    };
};

/** 获取数据库已发布文章内容 */
export const getAllPosts = async (): Promise<AllPostsProps[]> => {
    const recordMap: ExtendedRecordMap = cache().get('posts') || (await notion.getPage(process.env.NOTION_DATABASE_ID));
    !cache().get('posts') && cache().set('posts', recordMap);

    const posts: AllPostsProps[] = [];
    const pages = recordMap.block;
    for (const i in pages) {
        if (pages[i].value.type !== 'page') continue;
        if (getPageProperty('status', pages[i].value, recordMap) === postStatus.published)
            posts.push({
                id: pages[i].value.id,
                title: getPageProperty('title', pages[i].value, recordMap),
                slug: getPageProperty('slug', pages[i].value, recordMap),
                date: dayjs(getPageProperty('date', pages[i].value, recordMap)).format('YYYY-MM-DD'),
                summary: getPageProperty('summary', pages[i].value, recordMap),
                cover: getPageProperty('cover', pages[i].value, recordMap),
            });
    }
    posts.sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf());

    return posts;
};
