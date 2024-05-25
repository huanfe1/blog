import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '404',
};

export default function NotFound() {
    return (
        <div className="no-file-found flex flex-col items-center justify-center rounded-lg pt-40 text-center">
            <h2 className="text-4xl font-bold">当前页面不存在</h2>
            <h3 className="mt-4 text-xl">404 Not Found</h3>
        </div>
    );
}
