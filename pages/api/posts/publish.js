import fs from 'fs';
import path from 'path';
import { allDrafts } from '@/.contentlayer/generated';
import dayjs from 'dayjs';

export default async function handler(req, res) {
    if (process.env.NODE_ENV !== 'development') return;
    const slug = req.query.slug;
    const draft = allDrafts.find(draft => draft._raw.sourceFilePath === slug);
    const filePath = path.join('posts', draft._raw.sourceFilePath);

    const data = fs.readFileSync(filePath, 'utf-8');

    const date = data.match(/---[\s\S]*date: (.+)[\s\S]*---/)[1];
    const title = data.match(/---[\s\S]*title: (.+)[\s\S]*---/)[1].replace(/\s+/g, '-');
    const newContent = data.replace(date, dayjs().format('YYYY-MM-DD HH:mm:ss'));
    const newFilePath = `./posts/${title}${path.extname(filePath)}`;

    fs.writeFileSync(newFilePath, newContent, 'utf-8');
    fs.unlinkSync(filePath);

    res.status(200).json({ code: 0, message: 'publish success' });
}
