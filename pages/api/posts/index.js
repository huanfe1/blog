import { allPosts } from '@/.contentlayer/generated';

export default function handler(req, res) {
    if (process.env.NODE_ENV !== 'development') return;
    res.status(200).json({ name: allPosts });
}
