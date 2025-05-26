import { config } from '@/blog.config';
import type { Metadata } from 'next';

import Markdown from '@/components/markdown';
import { getGistFileByParams } from '@/lib/data';

export const metadata: Metadata = {
    title: config.title,
    alternates: {
        canonical: '/',
    },
};

export default async function Home() {
    const text = await getGistFileByParams('me.md');
    return <Markdown className="prose-p:my-2">{text}</Markdown>;
}
