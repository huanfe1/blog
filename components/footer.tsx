import dayjs from 'dayjs';

export default function footer() {
    return (
        <footer className="border-content2 duration-250 flex items-center justify-around py-12 pt-8 text-sm">
            <span>{`© 2022 - ${dayjs().format('YYYY')} All rights reserved.`}</span>
        </footer>
    );
}
