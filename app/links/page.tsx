import { Card, CardBody, Image } from '@nextui-org/react';
import type { Metadata } from 'next';

import { getAllLinks } from '@/utils/data';

export const metadata: Metadata = { title: '链接页', alternates: { canonical: '/links' }, description: '链接页' };

export default async function Links() {
    const links = await getAllLinks().then(data => data.sort(() => Math.random() - 0.5));
    return (
        <div>
            <div className="mb-16 mt-28 text-center">
                <h1 className="text-5xl font-bold">链接</h1>
                <div className="mt-5">时常访问的网站，排名不分先后</div>
            </div>
            <div className="mx-auto grid select-none grid-cols-1 gap-5 px-5 sm:grid-cols-2 md:w-[640px] md:px-0 lg:w-[768px] xl:w-[1080px] xl:grid-cols-3">
                {links.map(link => (
                    <Card className="bg-content2" key={link.url}>
                        <CardBody>
                            <a
                                href={link.url}
                                referrerPolicy="no-referrer"
                                rel="noopener noreferrer nofollow external"
                                className="flex h-full bg-transparent"
                                target="_blank"
                            >
                                <div className="flex h-16 w-16 flex-none">
                                    <Image
                                        isBlurred
                                        src={link.avatar}
                                        alt={link.title}
                                        referrerPolicy="no-referrer"
                                        loading="lazy"
                                        radius="full"
                                    />
                                </div>
                                <div className="ml-4">
                                    <p className="text-lg">{link.title}</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-300/75">{link.slogan}</p>
                                </div>
                            </a>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    );
}
