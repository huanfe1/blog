import dayjs from 'dayjs';

export default function footer() {
    return (
        <footer className="bg-main w-full bg-white p-6 shadow">
            <div className="text-center">{`Copyright © 2022 - ${dayjs().format(
                'YYYY'
            )} All right reserved by 幻非`}</div>
        </footer>
    );
}
