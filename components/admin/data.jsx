export default function Data({ posts }) {
    const items = [
        { title: '文章数量', data: posts.length },
        { title: '总字数', data: posts.wordcount },
        { title: '标签', data: posts.tags },
        { title: '距上次更新天数', data: posts.date },
    ];
    return (
        <ul className="my-20 grid grid-cols-4 gap-x-3">
            {items.map(item => (
                <li
                    key={item.title}
                    className="flex flex-col space-y-1 rounded-xl bg-blue-600 p-3 text-center text-white"
                >
                    <span>{item.title}</span>
                    <span className="text-3xl font-bold">{item.data}</span>
                </li>
            ))}
        </ul>
    );
}
