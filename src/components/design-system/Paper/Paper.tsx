import React from 'react';
import clsx from 'clsx';
import './paper.sass';

export interface PaperProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    variant?: 'default' | 'outlined';
    shadow?: boolean;
}

const Paper = (props: PaperProps) => {
    const { children, variant = 'default', className, shadow, ...other } = props;
    return (
        <div
            className={clsx(
                `paper paper--${variant}`,
                { ['paper--shadow']: shadow },
                { [className as string]: className },
            )}
            {...other}
        >
            {children}
        </div>
    );
};

export default Paper;
