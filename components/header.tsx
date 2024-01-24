import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/navbar';
import Link from 'next/link';

import Color from './color';

export default function Header() {
    return (
        <Navbar position="static">
            <h1 className="hidden">幻非</h1>
            <NavbarBrand>
                <Link href="/">
                    <img
                        src="https://pic.imgdb.cn/item/659f8199871b83018a5b4cc2.png"
                        alt="幻非"
                        className="hidden h-8 w-8 sm:block"
                    />
                </Link>
            </NavbarBrand>
            <NavbarContent className="gap-12" justify="center">
                <NavbarItem>
                    <Link href="/" className="hover:text-primary">
                        首页
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/archives" className="hover:text-primary">
                        归档
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/about" className="hover:text-primary">
                        关于
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden items-center space-x-2 sm:flex">
                    <Link href="/atom.xml" target="_blank" className="hover:text-primary" aria-label="RSS">
                        <Rss />
                    </Link>
                    <Color />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}

const Rss = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16" />
                <circle cx="5" cy="19" r="1" />
            </g>
        </svg>
    );
};
