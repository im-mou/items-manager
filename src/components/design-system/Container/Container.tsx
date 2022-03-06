import React from 'react';
import './container.sass';

const Container = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
    const { className, ...other } = props;
    return <main className={`container ${className || ''}`} {...other} />;
};

export default Container;
