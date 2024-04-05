import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import Link from 'next/link';

import Color from './color';

export default function Header() {
    return (
        <Navbar position="sticky">
            <NavbarBrand>
                <Link href="/" title="首页">
                    <div className="hidden">幻非</div>
                    <img src="/avatar.png" alt="幻非" className="hidden h-8 w-8 sm:block" />
                </Link>
            </NavbarBrand>
            <NavbarContent className="gap-12" justify="center">
                <NavbarItem>
                    <Link href="/" title="首页" className="hover:text-primary">
                        首页
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/archives" title="归档" className="hover:text-primary">
                        归档
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/about" title="关于" className="hover:text-primary">
                        关于
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden items-center space-x-2 sm:flex">
                    <Link href="/atom.xml" title="RSS" target="_blank" className="hover:text-primary" aria-label="RSS">
                        <div className="hidden">RSS</div>
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
