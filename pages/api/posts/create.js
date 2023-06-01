import fs from 'fs';
import crc32 from '@/utils/crc32';
import { allPosts, allDrafts } from '@/.contentlayer/generated';
import dayjs from 'dayjs';

const abbrlinks = new Set([...allPosts.map(post => post.abbrlink), ...allDrafts.map(draft => draft.abbrlink)]);

const getFilePath = (title, num = 0) => {
    const path = `./posts/drafts/${title}${num === 0 ? '' : '-' + num}.md`;
    if (fs.existsSync(path)) {
        return filePath(title, num + 1);
    }
    return path;
};

export default async function handler(req, res) {
    if (process.env.NODE_ENV !== 'development') return;
    const hash = (title, attempt = 0) => {
        const abbrlink = crc32(title);
        if (abbrlinks.has(abbrlink)) {
            return hash(title + abbrlink, attempt + 1);
        }
        return abbrlink;
    };
    const title = req.query.title;
    const abbrlink = hash(title);
    abbrlinks.add(abbrlink);
    const frontmatter = {
        title: title,
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        abbrlink: abbrlink,
        author: '幻非',
        cover: '',
        comments: true,
        tags: [],
        copyright: true,
        categories: '',
    };
    let content = '---\n';
    for (const [key, value] of Object.entries(frontmatter)) {
        content += `${key}: ${value}\n`;
    }
    content += '---\n';
    const filePath = await getFilePath(title.replace(/\s+/g, '-'));
    await fs.promises.writeFile(filePath, content);
    res.status(200).json({ code: 0, message: content });
}
