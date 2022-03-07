import React from 'react';
import { FavoriteFilledIcon, theme } from '../../components/design-system';
import Dialog from '../../components/design-system/Dialog';
import FavoriteItemsList from './FavoriteItemsList';

const FavoriteItemsDialog = ({ children }: { children: React.ReactNode }) => {
    return (
        <Dialog
            icon={<FavoriteFilledIcon color={theme.palette.primary.main} />}
            title="My favorite items"
            // trigger to open the dialog
            trigger={() => children}
        >
            {/** List containig all the fav items */}
            <FavoriteItemsList />
        </Dialog>
    );
};

export default FavoriteItemsDialog;
