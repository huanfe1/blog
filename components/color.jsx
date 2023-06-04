import { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';

export default function Color() {
    const [status, setStatus] = useState(false);
    const [theme, setTheme] = useState(null);
    const ref = useRef(null);
    const list = [
        { title: '浅色模式', icon: <Svg.Sun className="mr-1 h-4 w-4 fill-current" />, theme: 'light' },
        { title: '深色模式', icon: <Svg.Moon className="mr-1 h-4 w-4 fill-current" />, theme: 'dark' },
        { title: '跟随系统', icon: <Svg.Robot className="mr-1 h-4 w-4 fill-current" />, theme: 'system' },
    ];
    useEffect(() => {
        setTheme(localStorage['theme']);
        const media = matchMedia('(prefers-color-scheme: dark)');
        const listener = () => {
            if (localStorage['theme'] !== 'system') return;
            document.documentElement.className = media.matches ? 'dark' : 'light';
        };
        media.addEventListener('change', listener);
    }, []);
    useEffect(() => {
        if (!theme) return;
        localStorage['theme'] = theme;
        document.documentElement.className =
            theme === 'system' ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : theme;
    }, [theme]);
    useEffect(() => {
        const click = e => {
            if (ref.current && !ref.current.contains(e.target)) setStatus(false);
        };
        if (status) {
            document.addEventListener('click', click);
        } else {
            document.removeEventListener('click', click);
        }
        return () => document.removeEventListener('click', click);
    }, [ref, status]);
    return (
        <div
            className="relative"
            ref={ref}
            onClick={() => {
                setStatus(!status);
            }}
        >
            <div
                className={classnames(
                    'flex h-full cursor-pointer items-center px-3 py-2 hover:bg-[--main-hover] hover:text-blue-700',
                    {
                        'bg-[--main-hover] text-blue-700': status,
                    }
                )}
            >
                <Svg.Dark />
            </div>
            <ul
                className={classnames('absolute -left-10 top-12 overflow-hidden rounded bg-[--main] shadow sm:top-16', {
                    hidden: !status,
                })}
            >
                {list.map(_ => (
                    <li
                        key={_.title}
                        onClick={() => {
                            setTheme(_.theme);
                        }}
                        className={classnames(
                            'flex w-28 cursor-pointer select-none items-center justify-center p-2 hover:bg-[--main-hover]',
                            { 'font-medium text-blue-700': _.theme === theme }
                        )}
                    >
                        {_.icon}
                        <div>{_.title}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const Svg = {
    Dark: className => (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} width="22px" height="22px" viewBox="0 0 20 20">
            <path fill="currentColor" d="M10 3.5a6.5 6.5 0 1 1 0 13v-13ZM10 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16Z" />
        </svg>
    ),
    Sun: className => (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} width="22px" height="22px" viewBox="0 0 256 256">
            <path
                fill="currentColor"
                d="M116 32V16a12 12 0 0 1 24 0v16a12 12 0 0 1-24 0Zm80 96a68 68 0 1 1-68-68a68.07 68.07 0 0 1 68 68Zm-24 0a44 44 0 1 0-44 44a44.05 44.05 0 0 0 44-44ZM51.51 68.49a12 12 0 1 0 17-17l-12-12a12 12 0 0 0-17 17Zm0 119l-12 12a12 12 0 0 0 17 17l12-12a12 12 0 1 0-17-17ZM196 72a12 12 0 0 0 8.49-3.51l12-12a12 12 0 0 0-17-17l-12 12A12 12 0 0 0 196 72Zm8.49 115.51a12 12 0 0 0-17 17l12 12a12 12 0 0 0 17-17ZM44 128a12 12 0 0 0-12-12H16a12 12 0 0 0 0 24h16a12 12 0 0 0 12-12Zm84 84a12 12 0 0 0-12 12v16a12 12 0 0 0 24 0v-16a12 12 0 0 0-12-12Zm112-96h-16a12 12 0 0 0 0 24h16a12 12 0 0 0 0-24Z"
            />
        </svg>
    ),
    Moon: className => (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} width="22px" height="22px" viewBox="0 0 256 256">
            <path
                fill="currentColor"
                d="M236.37 139.4a12 12 0 0 0-12-3A84.07 84.07 0 0 1 119.6 31.59a12 12 0 0 0-15-15a108.86 108.86 0 0 0-54.91 38.48A108 108 0 0 0 136 228a107.09 107.09 0 0 0 64.93-21.69a108.86 108.86 0 0 0 38.44-54.94a12 12 0 0 0-3-11.97Zm-49.88 47.74A84 84 0 0 1 68.86 69.51a84.93 84.93 0 0 1 23.41-21.22Q92 52.13 92 56a108.12 108.12 0 0 0 108 108q3.87 0 7.71-.27a84.79 84.79 0 0 1-21.22 23.41Z"
            />
        </svg>
    ),
    Robot: className => (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} width="22px" height="22px" viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7.5 13A2.5 2.5 0 0 0 5 15.5A2.5 2.5 0 0 0 7.5 18a2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 7.5 13m9 0a2.5 2.5 0 0 0-2.5 2.5a2.5 2.5 0 0 0 2.5 2.5a2.5 2.5 0 0 0 2.5-2.5a2.5 2.5 0 0 0-2.5-2.5Z"
            />
        </svg>
    ),
};
