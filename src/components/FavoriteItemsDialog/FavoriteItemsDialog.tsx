import clsx from 'clsx';
import { observer } from 'mobx-react';
import React from 'react';
import { Badge, Button, FavoriteFilledIcon, theme } from '../../components/design-system';
import Dialog from '../../components/design-system/Dialog';
import { useStore } from '../../store';
import FavoriteItemsList from './FavoriteItemsList';

const FavoriteItemsDialog = observer(function FavoriteItemsDialog() {
    // Global state
    const { RootStore } = useStore();

    // Local state
    const [dialogOpen, setDialogOpen] = React.useState(false);

    // Close dialog
    const closeDialog = React.useCallback(() => {
        setDialogOpen(false);
    }, [setDialogOpen]);

    // Open dialog
    const openDialog = React.useCallback(() => {
        setDialogOpen(true);
    }, [setDialogOpen]);

    return (
        <div>
            <Dialog
                open={dialogOpen}
                onClose={closeDialog}
                icon={<FavoriteFilledIcon color={theme.palette.primary.main} />}
                title="My favorite items"
            >
                {/** List containig all the fav items */}
                <FavoriteItemsList />
            </Dialog>

            {/** Text button : DESKTOP */}
            <Badge className={clsx('favourite-button--desktop')} count={RootStore.favouriteitemsList.length}>
                <Button
                    onClick={openDialog}
                    aria-label="Open favorite items list"
                    startIcon={<FavoriteFilledIcon color={theme.palette.primary.main} />}
                >
                    Favorite
                </Button>
            </Badge>

            {/** Icon button : MOBILE */}
            <Badge className={clsx('favourite-button--mobile')} count={RootStore.favouriteitemsList.length}>
                <Button
                    onClick={openDialog}
                    variant="icon"
                    color="primary"
                    aria-label="Open favorite items list"
                    icon={<FavoriteFilledIcon color={theme.palette.primary.main} />}
                />
            </Badge>
        </div>
    );
});

export default FavoriteItemsDialog;
