import Layout from '@/components/layout';

export default function About() {
    return (
        <Layout title='关于页'>
            <section id="about" className="relative rounded-xl bg-white p-5 pt-6 shadow">
                <p>趁着年轻，我想多做一些傻事，多挨一些毒打</p>
                <h2>关于我</h2>
                <p>一名大学生</p>
                <p>喜欢编程，入门语言为 Python ，目前正在学习前端相关技术</p>
                <p>希望能为开源社区贡献一份力量</p>
                <h2>关于本站</h2>
                <p>
                    <span>本站始于2022年5月15日, 现基于</span>
                    <a href="https://nextjs.org" target="_blank" rel="noopener external nofollow noreferrer">
                        NextJs
                    </a>
                    <span>和</span>
                    <a href="https://hexo.io" target="_blank" rel="noopener external nofollow noreferrer">
                        Hexo
                    </a>
                    <span>搭建</span>
                </p>
            </section>
        </Layout>
    );
}
