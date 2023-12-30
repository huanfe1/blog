import dayjs from 'dayjs';

export default function footer() {
    return (
        <footer className="mb-12 mt-8 text-center text-sm">
            <span>{`© 2022 - ${dayjs().format('YYYY')} All rights reserved.`}</span>
        </footer>
    );
}
