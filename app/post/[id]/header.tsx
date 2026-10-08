import { readingTime } from 'reading-time-estimator';

import { PostProps } from '@/lib/data';

import Cover from './cover';

export default function Header({ post }: { post: PostProps }) {
    const cover = post.images.find(image => image.url === post.cover);
    const width = cover?.width || undefined;
    const height = cover?.height || undefined;

    return (
        <header>
            {post.cover && <Cover src={post.cover} alt={post.title} width={width} height={height} blurhash={cover?.blurhash || undefined} />}
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <div className="my-3 opacity-60">
                <time dateTime={post.date}>{post.date}</time>
                <span className="mx-1">·</span>
                <span>{'约 ' + readingTime(post.content, { language: 'zh-cn' }).words + ' 字'}</span>
                {post.update && (
                    <>
                        <span className="mx-1">·</span>
                        <span>{`编辑于 ${post.update}`}</span>
                    </>
                )}
            </div>
        </header>
    );
}
