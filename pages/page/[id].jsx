import { allPosts } from '@/.contentlayer/generated';
import dayjs from 'dayjs';
import { NextSeo } from 'next-seo';
import { List } from '../index';

export default function Page({ posts, current, total }) {
    return (
        <>
            <NextSeo
                title={`文章列表: 第${current}页`}
                canonical={`https://blog.huanfei.top/page/${current}`}
                description="幻非的个人博客，记录一些技术或者想法"
            />
            <List posts={posts} current={current} total={total} />
        </>
    );
}

const per_page = 6;

export function getStaticProps({ params }) {
    const current = parseInt(params.id);
    allPosts.sort((a, b) => dayjs(b.date) - dayjs(a.date));
    const posts = allPosts.slice((current - 1) * per_page, per_page + (current - 1) * per_page).map(post => ({
        title: post.title,
        date: post.date,
        excerpt: post.excerpt,
        cover: post.cover,
        abbrlink: post.abbrlink,
    }));
    const total = Math.ceil(posts.length / per_page) + 1;
    return { props: { current, posts, total } };
}

export function getStaticPaths() {
    const num = Math.ceil(allPosts.length / per_page);
    return {
        paths: Array(num - 1)
            .fill()
            .map((data, index) => {
                return { params: { id: (index + 2).toString() } };
            }),
        fallback: false,
    };
}
