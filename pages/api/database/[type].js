import { createDraft, publishDraft, openDraft } from '@/utils/database';

export default async function handler(req, res) {
    if (process.env.NODE_ENV !== 'development') return;
    try {
        switch (req.query.type) {
            case 'createdraft':
                createDraft(req.query.title);
                break;
            case 'publish':
                publishDraft(req.query.slug);
                break;
            case 'openfile':
                openDraft(req.query.slug);
                break;
            default:
                res.status(200).json({ code: 1, message: '参数错误' });
        }
    } catch (error) {
        res.status(200).json({ code: 1, message: error.message });
    } finally {
        res.status(200).json({ code: 0, message: '执行成功' });
    }
}
