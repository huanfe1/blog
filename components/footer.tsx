import dayjs from 'dayjs';

export default function footer() {
    return (
        <footer className="mx-auto flex w-full justify-center bg-white text-center text-sm text-black shadow-sm">
            <span className="py-10">{`© 2022 - ${dayjs().format('YYYY')} All rights reserved.`}</span>
        </footer>
    );
}
