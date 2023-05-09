import { createPost } from '@/utils/database';

export default function handler(req, res) {
    if (process.env.NODE_ENV !== 'development') return;
    try {
        createPost(req.query.title);
    } catch (error) {
        res.status(200).json({ code: 1, message: error.message });
    } finally {
        res.status(200).json({ code: 0 });
    }
}
