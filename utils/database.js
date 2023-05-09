import Hexo from 'hexo';
import dayjs from 'dayjs';
import { basename } from 'path';
import { truncate, stripHTML } from 'hexo-util';
import getArchives from './archives';
import { totalcount } from './wordcount';

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
        excerpt: truncate(stripHTML(post.content), { length: 120 }).replace(/[\n\r]/g, ''),
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
