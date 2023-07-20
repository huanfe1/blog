import { allPosts } from '@/.contentlayer/generated';
import Create from '@/components/admin/create';
import Data, { DataItem } from '@/components/admin/data';
import Draft, { DraftProps } from '@/components/admin/draft';
import Layout from '@/components/layout';
import formatNumber from '@/utils/formatNumber';
import dayjs from 'dayjs';
import { NextSeo } from 'next-seo';
import { Toaster } from 'react-hot-toast';

export default function Admin({ data, drafts }: { data: DataItem; drafts: DraftProps[] }) {
    if (process.env.NODE_ENV !== 'development') return;
    return (
        <>
            <NextSeo title="管理页面" />
            <Layout>
                <div className="mx-auto my-20 w-[1280px]">
                    <Toaster />
                    <Data items={data} />
                    <Create />
                    {drafts.length > 0 && <Draft posts={drafts} />}
                </div>
            </Layout>
        </>
    );
}

export async function getStaticProps() {
    if (process.env.NODE_ENV !== 'development') return { notFound: true };
    const drafts: DraftProps[] = allPosts
        .filter(post => post.draft)
        .map(post => ({
            title: post.title,
            abbrlink: post.abbrlink,
            date: dayjs(post.date).format('YYYY-MM-DD'),
        }));
    drafts.sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix());
    allPosts.sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix());
    const wordcount = allPosts.reduce((total, post) => total + post.wordcount, 0);
    const postData: DataItem = [
        { title: '文章数量', data: allPosts.filter(post => !post.draft).length },
        { title: '距上次更新天数', data: dayjs().diff(dayjs(allPosts.filter(post => !post.draft)[0].date), 'days') },
        { title: '总字数', data: formatNumber(wordcount) },
        { title: '草稿数量', data: drafts.length },
    ];
    return {
        props: { drafts, data: postData },
    };
}
