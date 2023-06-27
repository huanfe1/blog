import { defineDocumentType, makeSource } from '@contentlayer/source-files';
import dayjs from 'dayjs';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import truncate from './utils/truncate';
import { wordcount } from './utils/wordcount';

const options = {
    fields: {
        title: { type: 'string', required: true, description: '文章标题' },
        date: { type: 'string', required: true, description: '发布时间' },
        abbrlink: { type: 'string', required: true, description: '文章链接' },
        update: { type: 'string', required: false, default: null, description: '更新时间' },
        author: { type: 'string', required: false, default: '幻非', description: '作者' },
        cover: { type: 'string', required: false, default: null, description: '封面图片链接' },
        comments: { type: 'boolean', required: false, default: true, description: '是否开启评论' },
        tags: { type: 'list', of: { type: 'string' }, required: false, default: null, description: '标签' },
        copyright: { type: 'boolean', required: false, default: true, description: '是否显示版权' },
        categories: { type: 'string', required: false, default: null, description: '分类' },
        excerpt: { type: 'string', required: false, default: null, description: '摘要，为空则自动生成' },
    },
    computedFields: {
        date: { type: 'string', resolve: post => dayjs(post.date).format('YYYY-MM-DD') },
        update: { type: 'string', resolve: post => (post.update ? dayjs(post.update).format('YYYY-MM-DD') : null) },
        wordcount: { type: 'number', resolve: post => wordcount(post.body.html.replace(/<[^>]+>/g, '')) },
        excerpt: {
            type: 'string',
            resolve: post => {
                if (post.excerpt) return post.excerpt;
                return truncate(post.body.html.replace(/<[^>]+>/g, ''), { length: 120 }).replace(/[\n\r]/g, '');
            },
        },
    },
};

export const Post = defineDocumentType(() => ({
    ...options,
    name: 'Post',
    filePathPattern: `./*.md`,
}));

export const Draft = defineDocumentType(() => ({
    ...options,
    name: 'Draft',
    filePathPattern: `./drafts/*.md`,
}));

export default makeSource({
    contentDirPath: 'posts',
    documentTypes: [Post, Draft],
    markdown: {
        rehypePlugins: [
            [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'external', 'nofollow', 'noreferrer'] }],
            [rehypeHighlight],
            [rehypeSlug],
        ],
    },
});
