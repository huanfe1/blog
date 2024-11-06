import { config } from '@/blog.config';
import type { Metadata } from 'next';

import Markdown from '@/components/markdown';
import { getGistsFiles } from '@/utils/data';

export const metadata: Metadata = {
    title: config.title,
    alternates: {
        canonical: '/',
    },
};

export default async function Home() {
    const text = (await getGistsFiles())['me.md']['content'];
    return (
        <div className="article prose-p:my-2">
            <Markdown>{text}</Markdown>
        </div>
    );
}
