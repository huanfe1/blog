import nextjs from '@/assets/nextjs_logo.svg';
import notion from '@/assets/notion_logo.svg';
import tailwind from '@/assets/tailwind_logo.svg';
import Layout from '@/components/layout';
import { NextSeo } from 'next-seo';
import Image from 'next/image';

export default function About() {
    return (
        <>
            <NextSeo title="关于页" description="我是幻非，一个计算机专业的学生，现居山东" />
            <Layout>
                <div className="mt-52 flex flex-col items-center justify-center">
                    <h1 className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-4xl font-bold text-transparent sm:text-6xl">
                        关于本站
                    </h1>
                    <span className="mt-4 text-base sm:text-lg">我是幻非，一个计算机专业的学生，现居山东</span>
                </div>
                <div className="mb-52 mt-72 flex flex-col items-center">
                    <h2 className="text-3xl font-bold">本站采用的技术</h2>
                    <div className="-mt-10 flex flex-col items-center justify-center space-y-10 lg:flex-row lg:space-x-32 lg:space-y-0">
                        <a href="https://nextjs.org/" target="_blank" rel="noopener external nofollow noreferrer">
                            <Image src={nextjs} alt="Next.js" width={200} height={200} />
                        </a>
                        <a href="https://tailwindcss.com/" target="_blank" rel="noopener external nofollow noreferrer">
                            <Image src={tailwind} alt="Tailwind CSS" width={350} height={200} />
                        </a>
                        <a href="https://www.notion.so/" target="_blank" rel="noopener external nofollow noreferrer">
                            <Image src={notion} alt="Notion" width={200} height={200} />
                        </a>
                    </div>
                </div>
            </Layout>
        </>
    );
}
