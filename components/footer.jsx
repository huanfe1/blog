import dayjs from 'dayjs';

export default function footer() {
    return (
        <footer className="bg-main w-full bg-[--main] p-6 shadow">
            <div className="space-x-2 text-center">
                <span>{`Copyright © 2022 - ${dayjs().format('YYYY')}`}</span>
                <span>All right reserved by 幻非</span>
            </div>
        </footer>
    );
}
