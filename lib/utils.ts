import { type ClassValue, clsx } from 'clsx';
import GithubSlugger from 'github-slugger';
import extractToc from 'remark-extract-toc';
import remarkParse from 'remark-parse';
import { twMerge } from 'tailwind-merge';
import { unified } from 'unified';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function truncate(str: string, length = 60) {
    if (typeof str !== 'string') return;
    str = str.trimStart().split('\n')[0];
    const omission = '...';
    const omissionLength = omission.length;
    if (str.length <= length) return str;
    return str.slice(0, length - omissionLength) + omission;
}

export function extractHeadingFromMarkdown(content: string) {
    const slugger = new GithubSlugger();

    const pipeline = unified().use(remarkParse).use(extractToc, { flatten: true });
    const node = pipeline.parse(content);
    const headings = pipeline.runSync(node) as unknown as { depth: number; value: string }[];

    return headings.map(_ => ({ title: _.value, id: slugger.slug(_.value), level: _.depth }));
}
