import React from 'react';
import './input.sass';

export interface NakedInputProps
    extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    variant?: 'default' | 'naked';
}

const Input = (props: NakedInputProps) => {
    const { className, variant = 'default', ...other } = props;
    return <input className={`input input--${variant} ${className || ''}`} {...other} />;
};

export default Input;
