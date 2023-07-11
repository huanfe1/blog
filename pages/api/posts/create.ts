import fs from 'fs';
import crc32 from '@/utils/crc32';
import { allPosts, allDrafts } from '@/.contentlayer/generated';
import dayjs from 'dayjs';
import type { NextApiRequest, NextApiResponse } from 'next';

const abbrlinks = new Set([...allPosts.map(post => post.abbrlink), ...allDrafts.map(draft => draft.abbrlink)]);

const getFilePath = (title: string, num: number = 0): string => {
    const path = `./article/drafts/${title}${num === 0 ? '' : '-' + num}.md`;
    if (fs.existsSync(path)) {
        return getFilePath(title, num + 1);
    }
    return path;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (process.env.NODE_ENV !== 'development') return;
    const hash = (title: string, attempt: number = 0) => {
        const abbrlink = crc32(title);
        if (abbrlinks.has(abbrlink)) {
            return hash(title + abbrlink, attempt + 1);
        }
        return abbrlink;
    };
    const title = req.query.title[0];
    const abbrlink = hash(title);
    abbrlinks.add(abbrlink);
    const frontmatter = {
        title: title,
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        abbrlink: abbrlink,
        author: '幻非',
        cover: '',
        comments: '',
        tags: '',
        copyright: '',
        categories: '',
    };
    let content = '---\n';
    for (const [key, value] of Object.entries(frontmatter)) {
        content += `${key}: ${value}\n`;
    }
    content += '---\n';
    try {
        const filePath = await getFilePath(title.replace(/\s+/g, '-'));
        await fs.promises.writeFile(filePath, content);
    } catch (e) {
        res.status(200).json({ code: 1, message: e.message });
    } finally {
        res.status(200).json({ code: 0, message: 'success' });
    }
}