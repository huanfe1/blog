import Layout from '@/components/layout';
import Create from '@/components/admin/create';
import Draft from '@/components/admin/draft';
import Data from '@/components/admin/data';
import { fetchDrafts, fetchShowData } from '@/utils/database';
import { Toaster } from 'react-hot-toast';

export default function Admin({ posts, data }) {
    if (process.env.NODE_ENV !== 'development') return;
    return (
        <Layout title="管理页面">
            <Toaster />
            <Data data={data} />
            <Draft posts={posts} />
            <Create />
        </Layout>
    );
}

export async function getStaticProps() {
    if (process.env.NODE_ENV !== 'development') return { notFound: true };
    return {
        props: {
            posts: await fetchDrafts(),
            data: await fetchShowData(),
        },
    };
}
