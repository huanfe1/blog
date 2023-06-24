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
                <div className="mx-auto w-[1280px]">
                    <Toaster />
                    <Data posts={posts} />
                    <Create />
                    {drafts.length > 0 && <Draft posts={drafts} />}
                </div>
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
    const postData = {
        length: allPosts.length,
        wordcount: allPosts.reduce((total, post) => total + parseInt(post.wordcount), 0),
        tags: [...new Set(allPosts.map(post => post.tags).flat())].length,
        date: dayjs().diff(dayjs(allPosts[0].date), 'days'),
    };
    return {
        props: { drafts, posts: postData },
    };
}
