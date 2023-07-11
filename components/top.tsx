export default function Top() {
    const click = () => {
        window.scrollTo({ left: 0, top: 0 });
        history.replaceState(null, null, ' ');
    };
    return (
        <div
            className="fixed bottom-10 right-10 cursor-pointer rounded-xl border border-[--border] bg-[--pop] p-2"
            onClick={click}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6l-6 6l1.41 1.41z" />
            </svg>
        </div>
    );
}
