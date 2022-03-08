import React from 'react';
import { Button, CloseIcon, Paper, Typography } from '../';
import Popover from '../Popover';
import './dialog.sass';

export interface DialogProps {
    title: React.ReactNode;
    icon?: JSX.Element;
    children: React.ReactNode;
    open: boolean;
    onClose: () => void;
}

const Dialog = (props: DialogProps) => {
    // Props
    const { children, title, icon, open, onClose } = props;

    // attach keyboard esc key listener to close the dialog
    React.useEffect(() => {
        if (open) {
            window.addEventListener('keyup', escapeKeyPress);
        }
        return () => {
            window.removeEventListener('keyup', escapeKeyPress);
        };
    }, [open]);

    // keyboard Event handler to close the dialog
    const escapeKeyPress = (event: KeyboardEvent) => {
        if (open && event.key === 'Escape') {
            onClose();
        }
    };

    return (
        <Popover open={open} closeOnClickAway={false} isDialog>
            <Paper shadow className="dialog-wrapper">
                {/** Dialog header */}
                <div className="dialog-wrapper__title">
                    {icon ? React.cloneElement(icon, { style: { height: 24, width: 24 } }, null) : undefined}
                    <Typography variant="h3">{title}</Typography>
                    <Button onClick={onClose} variant="icon" icon={<CloseIcon />} />
                </div>
                {/** Dialog body */}
                <div className="dialog-wrapper__body">{children}</div>
            </Paper>
        </Popover>
    );
};

export default Dialog;
