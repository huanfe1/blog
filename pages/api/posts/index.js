import { allPosts } from '@/.contentlayer/generated';

export default function handler(req, res) {
    res.status(200).json({ name: allPosts });
}
