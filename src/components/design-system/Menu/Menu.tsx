import React from 'react';
import { Paper } from '../';
import Popover from '../Popover';

export interface MenuProps {
    trigger: (open: () => void) => React.ReactNode;
    children: React.ReactNode;
}

const Menu = (props: MenuProps) => {
    // Props
    const { trigger, children } = props;

    // Local state
    const [open, setOpen] = React.useState(false);
    const [position, setPosition] = React.useState({
        top: 0,
        left: 0,
    });

    // Refs
    const triggerRef = React.useRef<HTMLDivElement>(null);

    // Function to align menu with the trigger
    const openMenu = () => {
        if (triggerRef.current) {
            // get the horizontal coord to place the menu
            const left = triggerRef.current.offsetLeft + triggerRef.current.offsetWidth / 2;
            // get the vertical coord to place the menu
            const top = triggerRef.current.offsetTop + triggerRef.current.offsetHeight + 6;

            // return abs position
            setPosition({
                top,
                left,
            });

            setOpen(true);
        }
    };

    return (
        <>
            <Popover open={open} onClickAway={() => setOpen(false)} closeOnClickAway arrow position={position}>
                <Paper shadow variant="outlined">
                    {children}
                </Paper>
            </Popover>
            <div ref={triggerRef}>{trigger(openMenu)}</div>
        </>
    );
};

export default Menu;
