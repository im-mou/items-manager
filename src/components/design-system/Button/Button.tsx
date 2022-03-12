import React from 'react';
import clsx from 'clsx';
import './button.sass';

// Button component
export interface IButton
    extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    variant?: 'contained' | 'text' | 'icon';
    size?: 'default' | 'xs';
    color?: 'default' | 'primary';
    children?: React.ReactNode;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, IButton>(function Button(props: IButton, ref) {
    // initial variant value is set to 'contained'
    const {
        variant = 'contained',
        color = 'default',
        size = 'default',
        icon,
        startIcon,
        endIcon,
        children,
        className,
        ...other
    } = props;

    return (
        <button
            className={clsx('button', `button--color-${color}`, `button--variant-${variant}`, `button--size-${size}`, {
                [className as string]: className,
            })}
            ref={ref}
            {...other}
        >
            <span className="button__content">
                {startIcon ? <span className="button__start-icon">{startIcon}</span> : null}
                {icon ? <span className="button__center-icon">{icon}</span> : null}
                {children ? <span>{children}</span> : null}
                {endIcon ? <span className="button__end-icon">{endIcon}</span> : undefined}
            </span>
        </button>
    );
});

export default Button;
