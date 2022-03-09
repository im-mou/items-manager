import React from 'react';
import { observer } from 'mobx-react';
import Dialog from '../../components/design-system/Dialog';
import { ItemCardDetailed } from '../../components/ItemCard';
import ItemCard from '../../components/ItemCard/ItemCard';
import { IItem } from '../../types/types';
import './items-grid.sass';

interface ItemsGridProps {
    items: IItem[];
}

// Items list view
const ItemsGrid = observer(function ItemsGrid({ items }: ItemsGridProps) {
    // Local state
    const [itemToShowInDialog, setItemToShowInDialog] = React.useState<IItem | undefined>();
    const [detailsDialogOpen, setDetailsDialogOpen] = React.useState(false);

    // Open details dialog
    const openItemDetailsDialog = (item: IItem) => () => {
        // Save item to be shown when dialog is open
        setItemToShowInDialog(item);

        // open dialog
        setDetailsDialogOpen(true);
    };

    // Close details dialog
    const closeDetailsDialog = () => {
        setDetailsDialogOpen(false);
    };

    return (
        <React.Fragment>
            {/** Dialog to show the details of a card */}
            <Dialog title="Item details" open={detailsDialogOpen} onClose={closeDetailsDialog} keepMounted>
                {itemToShowInDialog ? <ItemCardDetailed item={itemToShowInDialog} /> : null}
            </Dialog>

            {/** Section with the items list */}
            <section className="items-grid">
                {/** Items card list */}
                {items.map((item) => (
                    <ItemCard key={item._id} item={item} openDetails={openItemDetailsDialog?.(item)} />
                ))}
            </section>
        </React.Fragment>
    );
});

export default ItemsGrid;
