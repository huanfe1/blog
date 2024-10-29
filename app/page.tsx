import type { Metadata } from 'next';

import Markdown from '@/components/markdown';
import { getGistsFiles } from '@/utils/data';

export const metadata: Metadata = {
    title: '幻非',
    alternates: {
        canonical: '/',
    },
};

export default async function Home() {
    const text = (await getGistsFiles())['me.md']['content'];
    return (
        <div id="post">
            <Markdown>{text}</Markdown>
        </div>
    );
}
