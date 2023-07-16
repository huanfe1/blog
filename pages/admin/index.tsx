import { allPosts } from '@/.contentlayer/generated';
import Create from '@/components/admin/create';
import Data from '@/components/admin/data';
import Draft from '@/components/admin/draft';
import Layout from '@/components/layout';
import formatNumber from '@/utils/formatNumber';
import dayjs from 'dayjs';
import { NextSeo } from 'next-seo';
import { Toaster } from 'react-hot-toast';

export default function Admin({ posts, drafts }) {
    if (process.env.NODE_ENV !== 'development') return;
    return (
        <>
            <NextSeo title="管理页面" />
            <Layout>
                <div className="mx-auto my-20 w-[1280px]">
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
    const drafts = allPosts
        .filter(post => post.draft)
        .map(post => ({
            title: post.title,
            path: post._raw.sourceFilePath,
            abbrlink: post.abbrlink,
            date: dayjs(post.date).format('YYYY-MM-DD'),
        }));
    drafts.sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix());
    allPosts.sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix());
    const wordcount = allPosts.reduce((total, post) => total + post.wordcount, 0);
    const postData = {
        drafts: drafts.length,
        length: allPosts.filter(post => !post.draft).length,
        wordcount: formatNumber(wordcount),
        date: dayjs().diff(dayjs(allPosts.filter(post => !post.draft)[0].date), 'days'),
    };
    return {
        props: { drafts, posts: postData },
    };
}
