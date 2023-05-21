import Hexo from 'hexo';
import fs from 'fs';
import path from 'path';
import dayjs from 'dayjs';
import { truncate, stripHTML } from 'hexo-util';
import getArchives from './archives';
import { totalcount, wordcount } from './wordcount';
import feedGenerator from 'hexo-generator-feed/lib/generator.js';
import betterSitemapGenerator from 'hexo-generator-sitemap/lib/generator.js';
import child_process from 'child_process';

let __SECRET_HEXO_INSTANCE__ = null;

const initHexo = async () => {
    if (__SECRET_HEXO_INSTANCE__) {
        await __SECRET_HEXO_INSTANCE__.load();
        return __SECRET_HEXO_INSTANCE__;
    }
    const hexo = new Hexo(path.join(process.cwd(), 'hexo'), {
        silent: true,
        draft: false,
    });

    await hexo.init();
    await hexo.load();

    __SECRET_HEXO_INSTANCE__ = hexo;
    return hexo;
};

export const fetchPost = async abbrlink => {
    const hexo = await initHexo();
    const post = hexo.database.model('Post').findOne({ abbrlink });
    return {
        title: post.title,
        date: dayjs(post.date).format('YYYY-MM-DD'),
        content: post.content,
        cover: post.cover || false,
        comments: post.comments || false,
        copyright: post.copyright || true,
        tags: post.tags.map(tag => tag.name),
    };
};

export const fetchAllPosts = async () => {
    const hexo = await initHexo();
    const posts = hexo.locals.get('posts').sort('-date');
    return posts.map(post => ({
        title: post.title,
        date: dayjs(post.date).format('YYYY-MM-DD'),
        excerpt: truncate(stripHTML(post.content), { length: 120 }).replace(/[\n\r]/g, ''),
        cover: post.cover || false,
        abbrlink: post.abbrlink,
    }));
};

export const fetchAllPostsPaths = async () => {
    const hexo = await initHexo();
    const posts = await fetchAllPosts();
    return posts.map(post => post.abbrlink);
};

export const fetchPaging = async page => {
    const hexo = await initHexo();
    const per_page = hexo.config.per_page;
    const posts = await fetchAllPosts();
    return {
        posts: posts.splice((page - 1) * per_page, per_page),
        total: Math.ceil(posts.length / per_page) + 1,
    };
};

export const fetchPagingPaths = async () => {
    const hexo = await initHexo();
    const posts = await fetchAllPosts();
    const per_page = hexo.config.per_page;
    const total = Math.ceil(posts.length / per_page);
    return total;
};

export const fetchAllTags = async () => {
    const hexo = await initHexo();
    const tags = hexo.locals.get('tags');
    return tags.map(tag => ({
        name: tag.name,
        length: tag.posts.length,
    }));
};

export const fetchTag = async name => {
    const hexo = await initHexo();
    const tag = hexo.database.model('Tag').findOne({ name });
    return {
        name: tag.name,
        length: tag.posts.length,
        posts: tag.posts.map(post => ({
            title: post.title,
            date: dayjs(post.date).format('YYYY-MM-DD'),
            excerpt: truncate(stripHTML(post.content), { length: 120 }).replace(/[\n\r]/g, ''),
            cover: post.cover || false,
            abbrlink: post.abbrlink,
        })),
    };
};

export const fetchCategories = async () => {
    const posts = await fetchAllPosts();
    return getArchives(posts);
};

export const fetchDrafts = async () => {
    const hexo = await initHexo();
    const posts = hexo.database.model('Post').find({ published: false }).sort('-date');
    return posts.map(post => ({
        title: post.title,
        slug: post.slug,
        date: dayjs(post.date).format('YYYY-MM-DD'),
        wordcount: wordcount(post.content),
        excerpt: truncate(stripHTML(post.content), { length: 120 }).replace(/[\n\r]/g, ''),
        source: post.source,
    }));
};

export const createDraft = async title => {
    const hexo = await initHexo();
    hexo.post.create({ title: title, layout: 'draft' });
};

export const publishDraft = async slug => {
    const hexo = await initHexo();
    hexo.post.publish({ slug: slug });
};

export const openDraft = async source => {
    const slug = path.join(process.cwd(), 'hexo', 'source', source);
    child_process.exec(`start ${slug}`);
};

export const fetchShowData = async () => {
    const hexo = await initHexo();
    const posts = hexo.locals.get('posts').sort('-date').data;
    return {
        posts: posts.length,
        wordcount: totalcount(posts),
        tags: hexo.locals.get('tags').length,
        update: dayjs().diff(dayjs(posts[0].date), 'days'),
    };
};

export const generateSubscribe = async () => {
    const hexo = await initHexo();
    const arr = [];
    arr.push(feedGenerator.call(hexo, hexo.locals.toObject(), 'atom', 'atom.xml'));
    arr.push(feedGenerator.call(hexo, hexo.locals.toObject(), 'rss2', './rss.xml'));
    arr.push(...betterSitemapGenerator.call(hexo, hexo.locals.toObject(), './sitemap.xml'));
    arr.forEach(item => {
        fs.writeFileSync(path.join('./public', item.path), item.data);
    });
};

export const renderMarkdown = async text => {
    const hexo = await initHexo();
    const result = hexo.render.renderSync({ text, engine: 'md' });
    return result;
};
