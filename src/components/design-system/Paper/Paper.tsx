import React from 'react';
import './paper.sass';

export interface PaperProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    variant?: 'default' | 'outlined';
}

const Paper = (props: PaperProps) => {
    const { children, variant = 'default', className, ...other } = props;
    return (
        <div className={`paper paper--${variant} ${className || ''}`} {...other}>
            {children}
        </div>
    );
};

export default Paper;
