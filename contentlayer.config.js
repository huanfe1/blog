import { defineDocumentType, makeSource } from '@contentlayer/source-files';
import dayjs from 'dayjs';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import truncate from './utils/truncate';
import { wordcount } from './utils/wordcount';

const options = {
    fields: {
        title: { type: 'string', required: true },
        date: { type: 'string', required: true },
        abbrlink: { type: 'string', required: true },
        author: { type: 'string', required: false, default: '幻非' },
        cover: { type: 'string', required: false, default: '' },
        comments: { type: 'boolean', required: false, default: true },
        tags: { type: 'list', of: { type: 'string' }, required: false, default: [] },
        copyright: { type: 'boolean', required: false, default: true },
        categories: { type: 'string', required: false, default: '' },
        excerpt: { type: 'string', required: false, default: '' },
    },
    computedFields: {
        date: { type: 'string', resolve: post => dayjs(post.date).format('YYYY-MM-DD') },
        wordcount: { type: 'number', resolve: post => wordcount(post.body.html.replace(/<[^>]+>/g, '')) },
        excerpt: {
            type: 'string',
            resolve: post => {
                if (post.excerpt !== '') return post.excerpt;
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
