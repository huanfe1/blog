import dayjs from 'dayjs';

export default function footer() {
    return (
        <footer className="flex items-center justify-around border-content2 py-12 pt-8 text-sm duration-250">
            <span>{`© 2022 - ${dayjs().format('YYYY')} All rights reserved.`}</span>
        </footer>
    );
}
