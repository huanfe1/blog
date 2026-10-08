import dayjs from 'dayjs';
import { unstable_cache } from 'next/cache';
import { cache } from 'react';

import { pool } from '@/lib/db';
import { truncate } from '@/lib/utils';

const REVALIDATE_SECONDS = 60 * 10;

export type ImageMeta = {
    url: string;
    width: number | null;
    height: number | null;
    blurhash: string | null;
};

export type PostProps = {
    title: string;
    slug: string;
    date: string;
    summary: string;
    cover?: string;
    content: string;
    tags?: string[];
    update?: string;
    images: ImageMeta[];
};

type PostRow = {
    title: string;
    slug: string;
    date: string;
    content: string;
    summary: string | null;
    cover: string | null;
    tags: string[] | null;
    updated_date: string | null;
};

function extractImageUrls(content: string, cover?: string) {
    const urls: string[] = [];
    const seen = new Set<string>();
    const add = (url?: string) => {
        if (!url || seen.has(url)) return;
        seen.add(url);
        urls.push(url);
    };

    if (cover) add(cover);
    for (const match of content.matchAll(/!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) add(match[1]);
    for (const match of content.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)) add(match[1]);
    return urls;
}

export async function getContentImages(content: string, cover?: string) {
    const urls = extractImageUrls(content, cover);
    if (urls.length === 0) return [];
    const { rows } = await pool.query<ImageMeta>('SELECT url, width, height, blurhash FROM images WHERE url = ANY($1)', [urls]);
    return rows;
}

async function queryPosts(): Promise<PostProps[]> {
    const { rows } = await pool.query<PostRow>(`
        SELECT
            p.title,
            p.slug,
            to_char(p.date, 'YYYY-MM-DD') AS date,
            p.content,
            p.summary,
            p.cover,
            p.tags,
            to_char(p.updated_date, 'YYYY-MM-DD') AS updated_date
        FROM posts p
        ORDER BY p.date DESC
    `);

    return rows.map(post => ({
        title: post.title,
        slug: post.slug,
        content: post.content,
        cover: post.cover ?? undefined,
        tags: post.tags?.length ? post.tags : undefined,
        date: post.date,
        summary: post.summary ?? truncate(post.content) ?? '',
        update: post.updated_date ?? undefined,
        images: [],
    }));
}

export const getAllPosts = cache(unstable_cache(queryPosts, ['posts'], { revalidate: REVALIDATE_SECONDS }));

async function queryLastUpdate() {
    const { rows } = await pool.query<{ updated_at: Date | null }>('SELECT MAX(db_updated_at) AS updated_at FROM posts');
    return (rows[0]?.updated_at ?? new Date()).toISOString();
}

const getCachedLastUpdate = unstable_cache(queryLastUpdate, ['posts-updated-at'], { revalidate: REVALIDATE_SECONDS });

export const getLastUpdateDate = cache(async () => dayjs(await getCachedLastUpdate()).toDate());

export type PageProps = {
    slug: string;
    content: string;
};

async function queryPage(slug: string): Promise<PageProps | null> {
    const { rows } = await pool.query<PageProps>('SELECT slug, content FROM pages WHERE slug = $1', [slug]);
    return rows[0] ?? null;
}

export const getPage = cache(async (slug: string) => {
    const cached = unstable_cache(async () => queryPage(slug), ['page', slug], { revalidate: REVALIDATE_SECONDS });
    return cached();
});
