import React, { useCallback } from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import './popover.sass';

export interface PopoverProps {
    open?: boolean;
    closeOnClickAway: boolean;
    onClickAway?: () => void;
    children: React.ReactNode;
    className?: string;
    isDialog?: boolean;
    arrow?: boolean;
}

// component
const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(function Popover(props: PopoverProps, popoverRef) {
    // Props
    const { open, closeOnClickAway, children, className, isDialog, arrow, onClickAway } = props;

    // Actions when menu is visible
    React.useLayoutEffect(() => {
        // toggle body scroll
        disableBodyScroll(Boolean(open));

        // Cleanup
        return () => {
            // window.removeEventListener('resize', setPopOverPosition);

            // enable body scroll
            disableBodyScroll(false);
        };
    }, [open]);

    // Function: Toggle active state when back drop is pressed
    const closeDialog = useCallback(() => {
        // Don't close popover if closeOnClickAway prop is set to false
        // It can be useful for dialogs that have their own close trigger i.e. button
        if (closeOnClickAway) {
            // this function is to plugin in close popover funcion
            onClickAway?.();

            // enable body scroll
            disableBodyScroll(false);
        }
    }, []);

    // toggle body scroll
    const disableBodyScroll = (disable: boolean) => {
        // enable body scroll
        document.body.style.overflow = disable ? 'hidden' : 'initial';
    };

    return (
        <div className="popover">
            {ReactDOM.createPortal(
                <div className={clsx('popover-portal', { ['popover-portal--active']: open })}>
                    {/** backdrop for clickaways event */}
                    <div
                        onClick={closeDialog}
                        className={clsx('popover-portal__backdrop', {
                            ['popover-portal__backdrop--visible']: isDialog,
                        })}
                    ></div>

                    {/** popover content */}
                    <div
                        tabIndex={0}
                        ref={popoverRef}
                        className={clsx({ [className as string]: className }, 'popover-portal__body', {
                            ['popover-portal__body--active']: open,
                            ['popover-portal__body--arrow']: arrow,
                        })}
                    >
                        {children}
                    </div>
                </div>,
                document.body,
            )}
        </div>
    );
});

export default Popover;
