import clsx from 'clsx';
import React from 'react';
import './badge.sass';

export interface BadgeProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    count: number;
    children: React.ReactNode;
}

const Badge = (props: BadgeProps) => {
    const { count, children, className, ...other } = props;

    return (
        <div className={clsx('badge', { [className as string]: className })} {...other}>
            {count ? <div className={clsx('badge__bubble')}>{count}</div> : undefined}
            {children}
        </div>
    );
};

export default Badge;
