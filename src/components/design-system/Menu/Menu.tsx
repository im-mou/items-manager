import React from 'react';
import { Paper } from '../';
import Popover from '../Popover';
import './menu.sass';

export interface MenuProps {
    trigger: (onOpen: () => void, open: boolean) => React.ReactNode;
    children: React.ReactNode;
}

const Menu = (props: MenuProps) => {
    // Props
    const { trigger, children } = props;

    // Local state
    const [open, setOpen] = React.useState(false);

    // Refs
    const triggerRef = React.useRef<HTMLDivElement>(null);
    const popoverRef = React.useRef<HTMLDivElement>(null);

    // Re-calcualte menu position on window resize
    React.useLayoutEffect(() => {
        if (open) {
            // initial positioning
            calcualtePosition();

            // attach resize listener
            window.addEventListener('resize', calcualtePosition);

            // Focus trap for accesibility
            popoverRef.current?.focus();
        }

        return () => {
            // remove resize listener
            window.removeEventListener('resize', calcualtePosition);
        };
    }, [open]);

    // Function to align menu with the trigger
    const openMenu = () => {
        // set menu abs position
        calcualtePosition();

        setOpen(true);
    };

    // function to calculate (top, left) position of the menu
    const calcualtePosition = () => {
        if (triggerRef.current && popoverRef.current) {
            // Get the horizontal coord to place the menu
            let left =
                triggerRef.current.offsetLeft + triggerRef.current.offsetWidth / 2 - popoverRef.current.offsetWidth / 2;

            // menu top-right corner point to check if it overflows the screen
            const popoverTopRightPoint = left + popoverRef.current.offsetWidth;

            // Do not let the menu overflow fron the right
            if (popoverTopRightPoint >= document.body.clientWidth) {
                const overlap = Math.abs(popoverTopRightPoint - document.body.clientWidth);
                // calculate the position of the mwnu, which will be touching the right side of the window
                left = left - overlap - 16;
            }

            // Todo: We have to do the same but for left side limit
            // For this project, we don't need that at the moment
            // ...

            // Get the vertical coord to place the menu
            // We will compensate the scroll position, because the menu will be placed
            // considering the top right corner of te visible screen as point (0,0).
            const top = triggerRef.current.offsetTop + triggerRef.current.offsetHeight - window.scrollY;

            // set position props to popover
            popoverRef.current.style.left = left + 'px';
            popoverRef.current.style.top = top + 10 + 'px'; // compensate menu arrow height
        }
    };

    return (
        <div>
            <Popover ref={popoverRef} open={open} onClickAway={() => setOpen(false)} closeOnClickAway>
                <Paper shadow variant="outlined" className="menu-wrapper menu-wrapper--arrow">
                    {children}
                </Paper>
            </Popover>
            <div ref={triggerRef}>{trigger(openMenu, open)}</div>
        </div>
    );
};

export default Menu;
