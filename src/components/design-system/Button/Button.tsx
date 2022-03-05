import React from 'react';
import './button.sass';

// Button component
export interface IButton
    extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    variant?: 'default' | 'primary' | 'text';
    children: React.ReactNode;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, IButton>(function Button(props: IButton, ref) {
    // initial variant value is set to 'default'
    const { variant = 'default', startIcon, endIcon, children, ...other } = props;
    return (
        <button className={`button button--${variant}`} ref={ref} {...other}>
            <span className="button__content">
                {startIcon ? <span className="button__start-icon">{startIcon}</span> : undefined}
                <span>{children}</span>
                {endIcon ? <span className="button__end-icon">{endIcon}</span> : undefined}
            </span>
        </button>
    );
});

export default Button;
