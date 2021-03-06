import clsx from 'clsx';
import React from 'react';
import { Badge, Button, FavoriteFilledIcon, theme } from '../../components/design-system';
import Dialog from '../../components/design-system/Dialog';
import FavoriteItemsList from './FavoriteItemsList';

const FavoriteItemsDialog = React.memo(function FavoriteItemsDialog({ itemsCount }: { itemsCount: number }) {
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
                data-testid="favourite-items-dialog"
                open={dialogOpen}
                onClose={closeDialog}
                icon={<FavoriteFilledIcon color={theme.palette.primary.main} />}
                title="My favorite items"
            >
                {/** List containig all the fav items */}
                <FavoriteItemsList />
            </Dialog>

            {/** Text button : DESKTOP */}
            <Badge className={clsx('favourite-button--desktop')} count={itemsCount} data-testid="favourite-items-badge">
                <Button
                    data-testid="favourite-items-button"
                    onClick={openDialog}
                    aria-label="Open favorite items list"
                    startIcon={<FavoriteFilledIcon color={theme.palette.primary.main} />}
                >
                    Favorite
                </Button>
            </Badge>

            {/** Icon button : MOBILE */}
            <Badge className={clsx('favourite-button--mobile')} count={itemsCount} data-testid="favourite-items-badge">
                <Button
                    data-testid="favourite-items-button-mobile"
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
