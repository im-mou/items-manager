import React from 'react';
import './input.sass';

export interface NakedInputProps
    extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    variant?: 'default' | 'naked';
}

const Input = React.forwardRef<HTMLInputElement, NakedInputProps>(function Input(props: NakedInputProps, ref) {
    const { className, variant = 'default', ...other } = props;
    return <input ref={ref} className={`input input--${variant} ${className || ''}`} {...other} />;
});

export default Input;
