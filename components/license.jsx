export default function License() {
    return (
        <section className="my-5 space-y-2 rounded border border-[--border] bg-gray-100 p-5 dark:bg-gray-800">
            <div className="text-lg">许可协议</div>
            <div className="text-sm">
                <span>本文采用</span>
                <a
                    href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh"
                    target="_blank"
                    rel="noopener external nofollow noreferrer"
                    className="mx-1 text-blue-500 hover:text-blue-600 hover:underline"
                >
                    署名-非商业性使用-相同方式共享 4.0 国际
                </a>
                <span>许可协议，转载请注明出处。</span>
            </div>
        </section>
    );
}
