import React from 'react';
import './typography.sass';

export interface TypographyProps extends Omit<Partial<HTMLHeadElement>, 'children'> {
    variant: 'h1' | 'h2' | 'h3' | 'h4' | 'body';
    children: React.ReactNode;
}

// Get html component from variant
const getHtmlTag = (variant: TypographyProps['variant']) => {
    let component: string = variant;

    if (variant === 'body') {
        component = 'p';
    }

    return component;
};

// Main component
const Typography = (props: TypographyProps) => {
    const { variant = 'body', children, className, ...other } = props;

    // get htmltag
    const Component = getHtmlTag(variant);

    return (
        <>
            {React.cloneElement(
                <Component />,
                { className: `typography typography--${variant} ${className || ''}`, ...other },
                children,
            )}
        </>
    );
};

export default Typography;
