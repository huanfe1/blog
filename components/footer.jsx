import dayjs from 'dayjs';

export default function footer() {
    return (
        <footer className="mx-auto flex w-full justify-center border-t border-[--border] text-center text-sm text-gray-500 xl:max-w-7xl">
            <span className="py-10">{`© 2022 - ${dayjs().format('YYYY')} All rights reserved.`}</span>
        </footer>
    );
}
