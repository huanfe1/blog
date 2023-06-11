import Layout from '@/components/layout';
import Create from '@/components/admin/create';
import Draft from '@/components/admin/draft';
import Data from '@/components/admin/data';
import { Toaster } from 'react-hot-toast';
import { allPosts, allDrafts } from '@/.contentlayer/generated';
import { NextSeo } from 'next-seo';
import dayjs from 'dayjs';

export default function Admin({ posts, drafts }) {
    if (process.env.NODE_ENV !== 'development') return;
    return (
        <>
            <NextSeo title="管理页面" />
            <Layout>
                <Toaster />
                <Data posts={posts} />
                <Create />
                {drafts.length > 0 && <Draft posts={drafts} />}
            </Layout>
        </>
    );
}

export async function getStaticProps() {
    if (process.env.NODE_ENV !== 'development') return { notFound: true };
    const drafts = allDrafts.map(post => ({
        title: post.title,
        path: post._raw.sourceFilePath,
        abbrlink: post.abbrlink,
        date: post.date,
    }));
    drafts.sort((a, b) => dayjs(a.date) - dayjs(b.date));
    return {
        props: { drafts, posts: allPosts },
    };
}
