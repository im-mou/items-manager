import { Paper } from '..';
import Popover, { PopoverProps } from '../Popover';

export interface MenuProps {
    trigger: PopoverProps['trigger'];
    children: React.ReactNode;
}

const Menu = (props: MenuProps) => {
    // Props
    const { trigger, children } = props;

    return (
        <Popover closeOnClickAway arrow trigger={trigger}>
            <Paper shadow variant="outlined">
                {children}
            </Paper>
        </Popover>
    );
};

export default Menu;
