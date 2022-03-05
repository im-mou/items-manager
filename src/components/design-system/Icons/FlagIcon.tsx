import React from 'react';
import SvgIcon, { SvgIconProps } from './SvgIcon';

const FlagIcon = (props: SvgIconProps) => {
    return (
        <SvgIcon {...props}>
            <React.Fragment>
                <path d="M12.36 6H7v6h7.24l.4 2H18V8h-5.24z" opacity=".3" />
                <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6zm3.6 8h-3.36l-.4-2H7V6h5.36l.4 2H18v6z" />
            </React.Fragment>
        </SvgIcon>
    );
};

export default FlagIcon;
