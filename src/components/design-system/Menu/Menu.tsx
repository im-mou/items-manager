import React from 'react';
import { Paper } from '../';
import Popover from '../Popover';

export interface MenuProps {
    trigger: (open: () => void) => React.ReactNode;
    triggerRef: React.MutableRefObject<HTMLElement>;
    children: React.ReactNode;
}

const Menu = (props: MenuProps) => {
    const [open, setOpen] = React.useState(false);

    // Props
    const { trigger, triggerRef, children } = props;

    // Function to align menu with the trigger
    const getMenuPosition = React.useCallback(() => {
        // get the horizontal coord to place the menu
        const top = triggerRef.current.offsetLeft + triggerRef.current.offsetWidth / 2;
        // get the vertical coord to place the menu
        const left = triggerRef.current.offsetTop + triggerRef.current.offsetHeight;

        // return abs position
        return {
            top,
            left,
        };
    }, []);

    return (
        <>
            <Popover open={open} closeOnClickAway arrow position={getMenuPosition()}>
                <Paper shadow variant="outlined">
                    {children}
                </Paper>
            </Popover>
            {trigger(() => setOpen(true))}
        </>
    );
};

export default Menu;
