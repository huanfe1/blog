import classNames from 'classnames';
import { ComponentProps } from 'react';

export function Button({ children, className, ...props }: ComponentProps<'button'>) {
    return (
        <button
            className={classNames(
                className,
                'rounded-xl bg-black px-3 py-2 text-white shadow duration-100 active:scale-95',
            )}
            {...props}
        >
            {children}
        </button>
    );
}
