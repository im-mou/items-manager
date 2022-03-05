import React from 'react';
import './button.sass';

// Button component
export interface IButton
    extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    variant?: 'default' | 'primary' | 'text' | 'icon';
    children?: React.ReactNode;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, IButton>(function Button(props: IButton, ref) {
    // initial variant value is set to 'default'
    const { variant = 'default', icon, startIcon, endIcon, children, className, ...other } = props;
    return (
        <button className={`button button--${variant} ${className || ''}`} ref={ref} {...other}>
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
