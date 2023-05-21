export default function Data({ data }) {
    const items = [
        { title: '文章数量', data: data.posts },
        { title: '总字数', data: data.wordcount },
        { title: '标签', data: data.tags },
        { title: '距上次更新', data: data.update },
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
