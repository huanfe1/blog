import dayjs from 'dayjs';

export default function Data({ posts }) {
    const wordcount = posts.reduce((total, post) => total + post.wordcount, 0);
    const tags = [...new Set(posts.map(post => post.tags).flat())].length;
    posts.sort((a, b) => dayjs(b.date) - dayjs(a.date));
    const date = dayjs().diff(dayjs(posts[0].date), 'days');
    const items = [
        { title: '文章数量', data: posts.length },
        { title: '总字数', data: wordcount },
        { title: '标签', data: tags },
        { title: '距上次更新天数', data: date },
    ];
    return (
        <ul className="grid grid-cols-4 gap-x-3">
            {items.map(item => (
                <li key={item.title} className="flex flex-col space-y-1 rounded-xl bg-white p-3 text-center shadow-sm">
                    <span>{item.title}</span>
                    <span>{item.data}</span>
                </li>
            ))}
        </ul>
    );
}
