import React from 'react';
import './typography.sass';
import clsx from 'clsx';

export interface TypographyProps extends Omit<Partial<HTMLHeadElement>, 'children'> {
    variant: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption';
    children: React.ReactNode;
    // indicates number of characters to show
    ellipsis?: number;
}

// Get html component from variant
const getHtmlTag = (variant: TypographyProps['variant']) => {
    let component: string = variant;

    if (variant === 'body') {
        component = 'p';
    } else if (variant === 'caption') {
        component = 'span';
    }

    return component;
};

// Main component
const Typography = (props: TypographyProps) => {
    const { variant = 'body', children, className, ellipsis, ...other } = props;

    // get htmltag
    const Component = getHtmlTag(variant);

    // body
    let body = children;

    // check if ellipces should be applied
    if (ellipsis && ellipsis > 0) {
        if (typeof children !== 'string') {
            console.error('Warning: When using ellipsis prop in <Typography />, the children should be a string');
        } else {
            // cut the string
            if (children.length > ellipsis) {
                body = children.slice(0, ellipsis) + '...';
            }
        }
    }

    return (
        <>
            {React.cloneElement(
                <Component />,
                {
                    className: clsx('typography', `typography--${variant}`, { [className as string]: className }),
                    ...other,
                },
                body,
            )}
        </>
    );
};

export default Typography;
