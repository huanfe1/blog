import { getAllPosts } from '@/utils/notion';
import { GetServerSideProps } from 'next';
import { SitemapStream, streamToPromise } from 'sitemap';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    if (!res) return;
    const sitemap = new SitemapStream({
        hostname: 'http://blog.huanfei.top',
        xmlns: { news: false, xhtml: false, image: false, video: false },
    });
    sitemap.write({ url: '/' });
    const posts = await getAllPosts();
    posts.map(post => sitemap.write({ url: `/post/${post.slug}`, lastmod: post.date }));
    sitemap.write({ url: '/about' });
    sitemap.write({ url: '/archive' });
    sitemap.end();
    const data = await streamToPromise(sitemap);
    res.setHeader('Content-Type', 'text/xml');
    res.write(data.toString());
    res.end();
    return { props: {} };
};

export default function Sitemap() {
    return null;
}
