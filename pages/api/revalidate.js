import { getAllPosts } from '@/utils/data';

export default async function handler(req, res) {
    if (req.query.secret !== process.env.GIST_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    try {
        setTimeout(async () => {
            const posts = await getAllPosts();
            for (const post of posts) {
                await res.revalidate(`/post/${post.slug}`);
            }
            const per_page = parseInt(process.env.PER_PAGE);
            const total = Math.ceil(posts.length / per_page);
            for (let i = 2; i <= total; i++) {
                await res.revalidate(`/page/${i}`);
            }
            await res.revalidate(`/`);
            await res.revalidate(`/archives`);
        }, 10000);
        return res.json({ revalidated: true });
    } catch (err) {
        return res.status(500).send('Error revalidating');
    }
}
