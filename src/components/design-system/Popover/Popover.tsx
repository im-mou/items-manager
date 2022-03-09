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
    position?: {
        top: number;
        left: number;
    };
}

// component
const Popover = (props: PopoverProps) => {
    // Props
    const { open, closeOnClickAway, children, className, isDialog, arrow, position, onClickAway } = props;

    // Local states
    const [active, setActive] = React.useState(false);
    const popoverRef = React.useRef<HTMLDivElement>(null);

    // On render component, set active state from 'open' prop
    React.useLayoutEffect(() => {
        // This is the only place where we can toggle 'active' prop.
        // This code only run if the parent components modifies the 'open' props
        // So, this means that only the parent component can change the 'active' state.
        setActive(!!open);
    }, [open]);

    // When menu is visible, calculate the absolute position to place the menu below the trigger
    React.useLayoutEffect(() => {
        // toggle body scroll
        disableBodyScroll(active);

        // Focus trap for accesibility
        popoverRef.current?.focus();

        // attach resize listener onñy for dialog component
        if (isDialog) window.addEventListener('resize', setPopOverPosition);

        // recalculate position
        setPopOverPosition();

        // Cleanup
        return () => {
            window.removeEventListener('resize', setPopOverPosition);

            // enable body scroll
            disableBodyScroll(false);
        };
    }, [active]);

    React.useLayoutEffect(() => {
        if (!active) return;

        // recalculate position
        setPopOverPosition();
    }, [position]);

    // function to calculate position of the popover
    const setPopOverPosition = () => {
        if (popoverRef.current) {
            /**
             * Position the dialog to the central position.
             * When it's a dialog, this component will take care of positioning.
             * Otherwise we will recieve position from parent.
             *  */
            if (isDialog) {
                // set position props to dialog
                popoverRef.current.style.top = `calc(50% - ${popoverRef.current.offsetHeight / 2}px)`;
                popoverRef.current.style.left = `calc(50% - ${popoverRef.current.offsetWidth / 2}px)`;
            } else {
                /**
                 * position the popover to the position of the trigger
                 *  */
                if (position) {
                    // set position props to popover
                    popoverRef.current.style.top = position.top + 'px';

                    let left = position.left - popoverRef.current.offsetWidth / 2;
                    const popoverTopRightPoint = position.left + popoverRef.current.offsetWidth / 2;

                    // do not let the menu overflow fron the right
                    if (popoverTopRightPoint > document.body.clientWidth) {
                        const overlap = Math.abs(popoverTopRightPoint - document.body.clientWidth);
                        // calculate the position of the mwnu, which will be touching the right side of the window
                        left = left - overlap - 16;
                    }
                    popoverRef.current.style.left = left + 'px';
                }
            }
        }
    };

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
    }, [setActive]);

    // toggle body scroll
    const disableBodyScroll = (disable: boolean) => {
        // enable body scroll
        document.body.style.overflow = disable ? 'hidden' : 'initial';
    };

    return (
        <div className="popover">
            {ReactDOM.createPortal(
                <div className={clsx('popover-portal', { ['popover-portal--active']: active })}>
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
                            ['popover-portal__body--active']: active,
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
};

export default Popover;
