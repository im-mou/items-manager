import clsx from 'clsx';
import React, { useCallback } from 'react';
import './input.sass';

export interface NakedInputProps
    extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    variant?: 'default' | 'naked';
    startIcon?: React.ReactNode;
    rootProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    label?: React.ReactNode;
    error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, NakedInputProps>(function Input(props: NakedInputProps, ref) {
    const { className, variant = 'default', startIcon, rootProps, error, ...other } = props;
    const [focused, setFocused] = React.useState(false);

    // Event handlers
    const focus = useCallback(() => {
        setFocused(true);
    }, []);
    const blur = useCallback(() => {
        setFocused(false);
    }, []);

    return (
        <div
            className={clsx('input', `input--${variant}`, {
                ['input--focus']: focused && variant === 'default',
                ['input--error']: error,
                [className as string]: className,
            })}
            {...rootProps}
        >
            {startIcon ? <span className="input__icon">{startIcon}</span> : null}
            <input onFocus={focus} onBlur={blur} ref={ref} className="input__element" {...other} />
        </div>
    );
});

export default Input;
