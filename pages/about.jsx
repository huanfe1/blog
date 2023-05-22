import Layout from '@/components/layout';
import { renderMarkdown } from '@/utils/database';

const content = `
蜗角虚名，蝇头微利，算来著甚干忙

事皆前定，谁弱又谁强

且趁闲身未老，尽放我、些子疏狂

百年里，浑教是醉，三万六千场

## 关于我

喜欢写点代码，入门语言为 Python ，目前正在学习前端相关技术。

## 关于本站

本站始于 2022 年 5 月 15 日, 现基于 [Nextjs](https://nextjs.org/) 和 [Hexo](https://hexo.io/) 搭建
`;

export default function About({ content }) {
    return (
        <Layout title="关于页">
            <article
                id="post"
                className="relative rounded-xl bg-white px-5 py-3 shadow"
                dangerouslySetInnerHTML={{ __html: content }}
            ></article>
        </Layout>
    );
}

export async function getStaticProps() {
    return {
        props: {
            content: await renderMarkdown(content),
        },
    };
}
