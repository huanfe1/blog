'use client';

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { useTheme } from 'next-themes';

export default function Color() {
    const { theme, setTheme } = useTheme();

    return (
        <Dropdown className="min-w-20">
            <DropdownTrigger>
                <Button isIconOnly className="bg-transparent hover:text-primary" variant="flat" radius="full">
                    <Theme />
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                onSelectionChange={_ => setTheme(_['currentKey'])}
                selectedKeys={[theme as string]}
                selectionMode="single"
                aria-label="Change Theme"
            >
                <DropdownItem key="system" startContent={<System />}>
                    跟随系统
                </DropdownItem>
                <DropdownItem key="light" startContent={<Light />}>
                    浅色模式
                </DropdownItem>
                <DropdownItem key="dark" startContent={<Dark />}>
                    深色模式
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

const Theme = props => (
    <svg width="22px" height="22px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fill="currentColor"
            d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10m0-1.5v-17a8.5 8.5 0 0 1 0 17"
        ></path>
    </svg>
);

const System = props => (
    <svg width="22px" height="22px" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fill="currentColor"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 3.5h11a2 2 0 0 1 2 2v6.049a2 2 0 0 1-1.85 1.994l-.158.006l-11-.042a2 2 0 0 1-1.992-2V5.5a2 2 0 0 1 2-2m.464 12H15.5m-8 2h6"
        ></path>
    </svg>
);

const Light = props => (
    <svg width="22px" height="22px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fill="currentColor"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4V2m0 18v2M6.414 6.414L5 5m12.728 12.728l1.414 1.414M4 12H2m18 0h2m-4.271-5.586L19.143 5M6.415 17.728L5 19.142M12 17a5 5 0 1 1 0-10a5 5 0 0 1 0 10"
        ></path>
    </svg>
);

const Dark = props => (
    <svg width="22px" height="22px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fill="currentColor"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 6a9 9 0 0 0 9 9c.91 0 1.787-.134 2.614-.385A9.004 9.004 0 0 1 12 21A9 9 0 0 1 9.386 3.386A8.999 8.999 0 0 0 9 6"
        ></path>
    </svg>
);
