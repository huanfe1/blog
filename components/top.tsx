import { Button } from '@nextui-org/button';

export default function Top() {
    const click = () => {
        window.scrollTo({ left: 0, top: 0 });
        history.replaceState(null, null, ' ');
    };
    return (
        <Button
            aria-label="回到顶部"
            isIconOnly
            className="fixed bottom-10 right-10 z-20 hidden bg-default-200 shadow-sm md:flex"
            size="lg"
            onPress={click}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6l-6 6l1.41 1.41z" />
            </svg>
        </Button>
    );
}
