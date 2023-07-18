import fs from 'fs';
import path from 'path';
import { allPosts } from '@/.contentlayer/generated';
import dayjs from 'dayjs';
import fm from 'gray-matter';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (process.env.NODE_ENV !== 'development') return;
    // 文章存放目录
    const postFilePath = path.join('articles', 'posts');
    const abbrlink = req.query.abbrlink as string;
    if (!abbrlink) return res.status(200).json({ code: 1, message: 'abbrlink is required' });
    const draft = allPosts.filter(draft => draft.draft).find(draft => draft.abbrlink === abbrlink);
    if (!draft) return res.status(200).json({ code: 1, message: 'Draft Not Found' });

    const yearDir = path.join(postFilePath, dayjs().format('YYYY'));
    if (!fs.existsSync(yearDir)) fs.mkdirSync(yearDir);

    try {
        const filePath = path.join('articles', draft._raw.sourceFilePath);
        const { content, data } = fm(fs.readFileSync(filePath, 'utf-8'));
        for (const key in data) if (!data[key]) delete data[key];
        data.date = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const newContent = fm.stringify(content, data);
        const newFilePath = path.join(yearDir, data.title.replace(/\s+/g, '-') + path.extname(filePath));
        if (fs.existsSync(newFilePath)) return res.status(200).json({ code: 1, message: '存在同名文件夹' });
        fs.writeFileSync(newFilePath, newContent, 'utf-8');
        fs.unlinkSync(filePath);
    } catch (e) {
        res.status(200).json({ code: 1, message: e.message });
    } finally {
        res.status(200).json({ code: 0, message: 'success' });
    }
}
