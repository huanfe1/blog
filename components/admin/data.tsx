export type DataItem = { title: string; data: string | number }[];

export default function Data({ items }: { items: DataItem }) {
    return (
        <ul
            className="my-20 grid gap-3 grid-cols-3"
            style={{
                gridTemplateColumns: `repeat(${Math.min(items.length, 4)}, minmax(0, 1fr))`,
            }}
        >
            {items.map(item => (
                <li
                    key={item.title}
                    className="flex flex-col space-y-1 rounded-xl bg-blue-600 p-3 text-center text-white"
                >
                    <span>{item.title}</span>
                    <span className="text-4xl font-bold">{item.data}</span>
                </li>
            ))}
        </ul>
    );
}
