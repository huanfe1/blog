'use client';

import clsx from 'clsx';
import { useLayoutEffect, useRef, useState } from 'react';
import { BlurhashCanvas } from 'react-blurhash';

type CoverProps = {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    blurhash?: string;
};

export default function Cover({ src, alt, width, height, blurhash }: CoverProps) {
    const imgRef = useRef<HTMLImageElement>(null);
    const [loaded, setLoaded] = useState(false);

    useLayoutEffect(() => {
        setLoaded(imgRef.current?.complete ?? false);
    }, [src]);

    return (
        <div
            className="relative mb-8 aspect-video overflow-hidden rounded bg-stone-200/75 shadow dark:bg-stone-700/25"
            style={{ aspectRatio: width && height ? `${width} / ${height}` : undefined }}
        >
            {blurhash && <BlurhashCanvas hash={blurhash} width={32} height={32} aria-hidden className="absolute inset-0 h-full w-full" />}
            <img
                ref={imgRef}
                src={src}
                alt={alt}
                width={width}
                height={height}
                fetchPriority="high"
                className={clsx('absolute inset-0 h-full w-full object-cover transition-opacity duration-500', blurhash && !loaded ? 'opacity-0' : 'opacity-100')}
                onLoad={() => setLoaded(true)}
            />
        </div>
    );
}
