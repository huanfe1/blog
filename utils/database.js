import Hexo from 'hexo';
import fs from 'fs';
import path from 'path';
import dayjs from 'dayjs';
import { basename } from 'path';
import { truncate, stripHTML } from 'hexo-util';
import getArchives from './archives';
import { totalcount } from './wordcount';
import feedGenerator from 'hexo-generator-feed/lib/generator.js';
import betterSitemapGenerator from 'hexo-generator-sitemap/lib/generator.js';

let __SECRET_HEXO_INSTANCE__ = null;

async function initHexo() {
    if (__SECRET_HEXO_INSTANCE__) {
        await __SECRET_HEXO_INSTANCE__.load();
        return __SECRET_HEXO_INSTANCE__;
    }

    const hexo = new Hexo(process.cwd() + '/hexo', {
        silent: true,
        drafts: false,
    });

    await hexo.init();
    await hexo.load();

    __SECRET_HEXO_INSTANCE__ = hexo;
    return hexo;
}

export const fetchPost = async abbrlink => {
    const hexo = await initHexo();
    const post = hexo.database.model('Post').findOne({ abbrlink });
    return {
        title: post.title,
        date: dayjs(post.date).format('YYYY-MM-DD'),
        content: post.content,
        cover: post.cover === undefined ? false : post.cover,
        comment: post.comment === undefined ? true : false,
        copyright: post.copyright === undefined ? true : false,
        tags: post.tags.map(tag => tag.name),
    };
};

export const fetchAllPosts = async () => {
    const hexo = await initHexo();
    const posts = hexo.database.model('Post').find({}).sort('-date');
    return posts.map(post => ({
        title: post.title,
        date: dayjs(post.date).format('YYYY-MM-DD'),
        excerpt: truncate(stripHTML(post.content), { length: 120 }).replace(/[\n\r]/g, ''),
        cover: post.cover || false,
        abbrlink: post.abbrlink,
    }));
};

export const fetchPaging = async page => {
    const hexo = await initHexo();
    const per_page = hexo.config.per_page;
    const posts = hexo.database
        .model('Post')
        .find({})
        .sort('-date')
        .map(post => ({
            title: post.title,
            date: dayjs(post.date).format('YYYY-MM-DD'),
            excerpt: truncate(stripHTML(post.content), { length: 120 }).replace(/[\n\r]/g, ''),
            cover: post.cover || false,
            abbrlink: post.abbrlink,
        }));
    return {
        posts: posts.splice((page - 1) * per_page, per_page),
        total: Math.ceil(posts.length / per_page) + 1,
    };
};

export const fetchPagingPaths = async () => {
    const hexo = await initHexo();
    const posts = hexo.database.model('Post').find({});
    const per_page = hexo.config.per_page;
    const total = Math.ceil(posts.length / per_page);
    return total;
};

export const fetchAllPostsPaths = async () => {
    const hexo = await initHexo();
    const posts = hexo.database.model('Post').find({}).sort('-date');
    return posts.map(post => basename(post.abbrlink));
};

export const fetchAllTags = async () => {
    const hexo = await initHexo();
    const tags = hexo.database.model('Tag').find({});
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
    const hexo = await initHexo();
    const posts = hexo.database.model('Post').find({}).sort('-date');
    return getArchives(posts);
};

export const createPost = async title => {
    const hexo = await initHexo();
    hexo.post.create({ title: title });
};

export const fetchShowData = async () => {
    const hexo = await initHexo();
    const posts = hexo.database.model('Post').find({}).sort('-date').data;
    return {
        posts: posts.length,
        wordcount: totalcount(posts, false),
        tags: hexo.database.model('Tag').find({}).length,
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
