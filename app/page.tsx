import { config } from '@/blog.config';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Markdown from '@/components/markdown';
import { getContentImages, getPage } from '@/lib/data';

export const metadata: Metadata = {
    title: config.title,
    alternates: {
        canonical: '/',
    },
};

export default async function Home() {
    const page = await getPage('me');
    if (!page) notFound();
    const images = await getContentImages(page.content);
    return (
        <Markdown className="prose-p:my-2" images={images}>
            {page.content}
        </Markdown>
    );
}
