import React, { useCallback } from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import './popover.sass';

export interface PopoverProps {
    open?: boolean;
    closeOnClickAway: boolean;
    trigger: (open: () => void, close: () => void, state: boolean) => React.ReactNode;
    children: React.ReactNode;
    className?: string;
    isDialog?: boolean;
    arrow?: boolean;
}

// component
const Popover = (props: PopoverProps) => {
    // Props
    const { closeOnClickAway, trigger, children, className, isDialog, arrow } = props;

    // Local states
    const [active, setActive] = React.useState(false);
    const triggerRef = React.useRef<HTMLDivElement>(null);
    const popoverRef = React.useRef<HTMLDivElement>(null);

    // Toggle active state
    const toggleActive = useCallback(() => {
        setActive((curr) => {
            // Don't close popover if closeOnClickAway prop is set to false
            // It can be useful for dialogs that have their own close trigger i.e. button
            if (curr && closeOnClickAway === false) {
                return curr;
            }

            return !curr;
        });
    }, [setActive]);

    // When menu is visible, calculate the absolute position to place the menu below the trigger
    React.useLayoutEffect(() => {
        if (!active) return;

        if (popoverRef.current && triggerRef.current) {
            // Focus trap for accesibility
            popoverRef.current?.focus();

            /**
             * position the dialog to the central position
             *  */
            if (isDialog) {
                // set position props to dialog
                popoverRef.current.style.left = `calc(50% - ${popoverRef.current.offsetWidth / 2}px)`;
                popoverRef.current.style.top = `calc(20% - ${popoverRef.current.offsetHeight / 2}px)`;
            } else {
                /**
                 * position the menu to the position of the trigger
                 *  */

                // get the horizontal coord to place the menu
                const menuHorizontalPosition =
                    triggerRef.current.offsetLeft +
                    triggerRef.current.offsetWidth / 2 -
                    popoverRef.current.offsetWidth / 2;

                // get the vertical coord to place the menu
                const menuVerticalPosition = triggerRef.current.offsetTop + triggerRef.current.offsetHeight;

                // set position props to menu
                popoverRef.current.style.left = menuHorizontalPosition + 'px';
                popoverRef.current.style.top = menuVerticalPosition + 'px';
            }
        }
    }, [active]);

    return (
        <div className="popover">
            <div ref={triggerRef} onClick={toggleActive}>
                {/** render props for menu trigger */}
                {trigger(
                    () => setActive(true),
                    () => setActive(false),
                    active,
                )}
            </div>
            {ReactDOM.createPortal(
                <div className={clsx('popover-portal', { ['popover-portal--active']: active })}>
                    {/** backdrop for clickaways event */}
                    <div
                        onClick={toggleActive}
                        className={clsx('popover-portal__backdrop', {
                            ['popover-portal__backdrop--visible']: isDialog,
                        })}
                    ></div>

                    {/** popover content */}
                    <div
                        tabIndex={0}
                        ref={popoverRef}
                        className={clsx('popover-portal__body', {
                            ['popover-portal__body--active']: active,
                            ['popover-portal__body--arrow']: arrow,
                            [className as string]: className,
                        })}
                    >
                        {children}
                    </div>
                </div>,
                document.body,
            )}
        </div>
    );
};

export default Popover;
