import React from 'react';
import { theme } from '..';

export type SvgIconProps = React.SVGProps<SVGSVGElement>;

// Svg icon continer
const SvgIcon = (props: SvgIconProps) => {
    const { children, color = theme.palette.gray[300], viewBox = '0 0 24 24', ...other } = props;

    return (
        <svg fill={color} viewBox={viewBox} {...other}>
            {children}
        </svg>
    );
};

export default SvgIcon;
