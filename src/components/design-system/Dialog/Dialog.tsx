import React from 'react';
import { Button, CloseIcon, Paper, Typography } from '../';
import Popover, { PopoverProps } from '../Popover';
import './dialog.sass';

export interface DialogProps {
    title: React.ReactNode;
    trigger: PopoverProps['trigger'];
    children: React.ReactNode;
}

const Dialog = (props: DialogProps) => {
    // Props
    const { trigger, children, title } = props;
    const closeFuncRef = React.useRef<{ close: () => void }>({ close: () => null });

    // close dialog event handler
    const closeDialog = () => {
        if (closeFuncRef.current) {
            closeFuncRef.current.close();
        }
    };

    return (
        <Popover
            closeOnClickAway={false}
            isDialog
            trigger={(open, close, state) => {
                // keep close funcion reference in this component
                if (closeFuncRef) {
                    closeFuncRef.current.close = close;
                }
                return trigger(open, close, state);
            }}
        >
            <Paper shadow className="dialog-wrapper">
                <div className="dialog-wrapper__title">
                    <Typography variant="h3">{title}</Typography>
                    <Button onClick={closeDialog} variant="icon" icon={<CloseIcon />} />
                </div>
                <div className="dialog-wrapper__body">{children}</div>
            </Paper>
        </Popover>
    );
};

export default Dialog;
