import Layout from '@/components/layout';
import Create from '@/components/admin/create';
import Draft from '@/components/admin/draft';
import { Toaster } from 'react-hot-toast';
import { allDrafts } from '@/.contentlayer/generated';

export default function Admin({ drafts }) {
    if (process.env.NODE_ENV !== 'development') return;
    return (
        <Layout title="管理页面">
            <Toaster />
            <Create />
            {drafts.length > 0 && <Draft posts={drafts} />}
        </Layout>
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
    return {
        props: { drafts },
    };
}
