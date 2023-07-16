import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { getPagePost, List } from '../index';

export default function Page({ posts, current, total }) {
    const router = useRouter();
    console.log(router.asPath);
    return (
        <>
            <NextSeo title={`文章列表: 第${current}页`} />
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
