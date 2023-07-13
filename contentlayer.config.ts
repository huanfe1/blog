import { defineDocumentType, makeSource } from '@contentlayer/source-files';
import dayjs from 'dayjs';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import truncate from './utils/truncate';
import rehypeRewrite from 'rehype-rewrite';
import { wordcount } from './utils/wordcount';
import { Element, Text } from 'hast';
import rewrite from './utils/rewrite';

export const Post = defineDocumentType(() => ({
    fields: {
        title: { type: 'string', required: true, description: '文章标题' },
        date: { type: 'string', required: true, description: '发布时间' },
        abbrlink: { type: 'string', required: true, description: '文章链接' },
        update: { type: 'string', required: false, default: '', description: '更新时间' },
        author: { type: 'string', required: false, default: '幻非', description: '作者' },
        cover: { type: 'string', required: false, default: '', description: '封面图片链接' },
        comments: { type: 'boolean', required: false, default: true, description: '是否开启评论' },
        tags: { type: 'list', of: { type: 'string' }, required: false, default: null, description: '标签' },
        copyright: { type: 'boolean', required: false, default: true, description: '是否显示版权' },
        categories: { type: 'string', required: false, default: '', description: '分类' },
        excerpt: { type: 'string', required: false, default: '', description: '摘要，为空则自动生成' },
    },
    computedFields: {
        date: { type: 'string', resolve: post => dayjs(post.date) },
        update: { type: 'string', resolve: post => (post.update ? dayjs(post.update) : null) },
        wordcount: { type: 'number', resolve: post => wordcount(post.body.html.replace(/<[^>]+>/g, '')) },
        draft: { type: 'boolean', resolve: post => !!post._raw.sourceFilePath.match('drafts/') },
        excerpt: {
            type: 'string',
            resolve: post => {
                if (post.excerpt) return post.excerpt;
                return truncate(post.body.html.replace(/<[^>]+>/g, '')).replace(/[\n\r]/g, '');
            },
        },
    },
    name: 'Post',
    filePathPattern: `./**/*.md`,
}));

export default makeSource({
    contentDirPath: 'article',
    documentTypes: [Post],
    markdown: {
        rehypePlugins: [
            [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'external', 'nofollow', 'noreferrer'] }],
            [rehypeHighlight],
            [rehypeSlug],
            [
                rehypeAutolinkHeadings,
                {
                    content: { type: 'text', value: '#' },
                    properties: { className: 'anchor', ariaHidden: true },
                },
            ],
            [
                rehypeRewrite,
                {
                    rewrite: (node: Text, _: number, parent: Element) => {
                        if (node.type === 'text' && /{% .*? %}/.test(node.value)) {
                            parent.children = rewrite(node.value.match(/{% (.*) %}/)[1].split(' '));
                        }
                    },
                },
            ],
        ],
    },
});
