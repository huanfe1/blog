import fs from 'fs';
import path from 'path';
import { allDrafts } from '@/.contentlayer/generated';
import dayjs from 'dayjs';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (process.env.NODE_ENV !== 'development') return;
    const slug = req.query.slug;
    const draft = allDrafts.find(draft => draft._raw.sourceFilePath === slug);
    const yearDir = path.join('article', 'posts', dayjs().format('YYYY'));
    if (!fs.existsSync(yearDir)) fs.mkdirSync(yearDir);
    try {
        const filePath = path.join('article', draft._raw.sourceFilePath);
        const content = fs.readFileSync(filePath, 'utf-8');
        const frontMatter = content.slice(4, content.indexOf('\n---'));
        const frontMatterObj = parse(frontMatter);
        frontMatterObj.date = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const newContent = content.replace(frontMatter, stringify(frontMatterObj));
        const newFilePath = path.join(
            'article',
            'posts',
            dayjs().format('YYYY'),
            frontMatterObj.title.replace(/\s+/g, '-') + path.extname(filePath)
        );
        fs.writeFileSync(newFilePath, newContent, 'utf-8');
        fs.unlinkSync(filePath);
    } catch (e) {
        res.status(200).json({ code: 1, message: e.message });
    } finally {
        res.status(200).json({ code: 0, message: 'success' });
    }
}

function parse(content) {
    return content.split('\n').reduce((acc, cur) => {
        const [key, ...value] = cur.split(':');
        acc[key] = value.join(':').trim();
        return acc;
    }, {});
}

function stringify(frontMatterObj) {
    return Object.entries(frontMatterObj)
        .filter(([key, value]) => value)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');
}
