import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '关于页',
    description: '幻非的个人博客，记录一些技术或者想法 - 我是幻非，一个计算机专业的学生，现居山东',
    alternates: {
        canonical: '/about',
    },
};

export default function About() {
    return (
        <div className="mt-52 flex flex-col items-center justify-center">
            <h1 className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-4xl font-bold text-transparent sm:text-6xl">
                关于本站
            </h1>
            <p className="mt-4 text-base sm:text-lg">我是幻非，一个计算机专业的学生，现居山东</p>
        </div>
    );
}
