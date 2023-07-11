import { NextSeo } from 'next-seo';
import { List, getPagePost } from '../index';

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

export function getStaticProps({ params }: { params: { id: string } }) {
    const current = parseInt(params.id);
    return { props: getPagePost(current) };
}

export function getStaticPaths() {
    return {
        paths: Array(getPagePost(1).total - 1)
            .fill(0)
            .map((data, index) => {
                return { params: { id: (index + 2).toString() } };
            }),
        fallback: false,
    };
}
