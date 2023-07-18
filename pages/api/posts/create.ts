import fs from 'fs';
import { allPosts } from '@/.contentlayer/generated';
import crc32 from '@/utils/crc32';
import dayjs from 'dayjs';
import fm from 'gray-matter';
import type { NextApiRequest, NextApiResponse } from 'next';

const abbrlinks = new Set([...allPosts.map(post => post.abbrlink)]);

function getFilePath(title: string, num: number = 0): string {
    const path = `./articles/drafts/${title}${num === 0 ? '' : '-' + num}.md`;
    if (fs.existsSync(path)) {
        return getFilePath(title, num + 1);
    }
    return path;
}

function getAbbrlink(title: string): string {
    const abbrlink = crc32(title);
    if (abbrlinks.has(abbrlink)) return getAbbrlink(title + abbrlink);
    return abbrlink;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (process.env.NODE_ENV !== 'development') return;
    const title = req.query.title as string;
    if (!title) return res.status(200).json({ code: 1, message: 'title is required' });
    const abbrlink = getAbbrlink(title);
    abbrlinks.add(abbrlink);
    const frontmatter = {
        title,
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        abbrlink,
    };
    const filePath = getFilePath(title.replace(/\s+/g, '-'));
    fs.writeFileSync(filePath, fm.stringify('', frontmatter), 'utf-8');
    return res.status(200).json({ code: 0, message: abbrlink });
}
