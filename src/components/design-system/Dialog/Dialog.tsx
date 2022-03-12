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
    keepMounted?: boolean;
}

const Dialog = (props: DialogProps) => {
    // Props
    const { children, title, icon, open, keepMounted = false, onClose } = props;

    // refs
    const popoverRef = React.useRef<HTMLDivElement>(null);

    // attach keyboard esc key listener to close the dialog
    React.useLayoutEffect(() => {
        if (open) {
            // initial positioning
            calcualtePosition();

            window.addEventListener('keyup', escapeKeyPress);
            window.addEventListener('resize', calcualtePosition);

            // Focus trap for accesibility
            popoverRef.current?.focus();
        }

        // cleanup
        return () => {
            window.removeEventListener('keyup', escapeKeyPress);
            window.removeEventListener('resize', calcualtePosition);
        };
    }, [open]);

    // function to calculate (top, left) position of the dialog
    const calcualtePosition = () => {
        if (popoverRef.current) {
            /**
             * Position the dialog to the central position.
             *  */
            popoverRef.current.style.top = `calc(50% - ${popoverRef.current.offsetHeight / 2}px)`;
            popoverRef.current.style.left = `calc(50% - ${popoverRef.current.offsetWidth / 2}px)`;
        }
    };

    // keyboard Event handler to close the dialog
    const escapeKeyPress = (event: KeyboardEvent) => {
        if (open && event.key === 'Escape') {
            onClose();
        }
    };

    if (!keepMounted && !open) return null;

    return (
        <Popover ref={popoverRef} open={open} closeOnClickAway={false} showBackdrop>
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
