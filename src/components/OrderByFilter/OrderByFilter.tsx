import clsx from 'clsx';
import { observer } from 'mobx-react';
import { Button, ExpandLessIcon, ExpandMoreIcon, Menu, theme, Typography } from '../../components/design-system';
import { useStore } from '../../store';
import { TViewsKeys } from '../../types/types';
import { ORDER_BY_KEYS } from '../../utils/constants';
import './orderby-filter.sass';

const OrderByFilter = observer(function OrderByFilter({ view }: { view: TViewsKeys }) {
    // Global State
    const { RootStore } = useStore();

    // Shorthand
    const orderBy = RootStore.orderBy;

    // handle order filter change
    const onChangeOrderBy = (key: typeof ORDER_BY_KEYS[number], asc: boolean) => () => {
        // save sort info in the store
        RootStore.setOrderByFilter({
            key,
            asc,
        });

        // Apply sort
        RootStore.applyOrderByFilter(view);
    };

    // Filter items button + menu
    return (
        <>
            <Menu
                trigger={(setOpen, open) => (
                    <Button onClick={setOpen} variant="text" endIcon={!open ? <ExpandMoreIcon /> : <ExpandLessIcon />}>
                        <span style={{ color: theme.palette.gray[500] }}>ORDER BY – </span>
                        <span style={{ color: theme.palette.primary.main }}>
                            <strong>{orderBy.key.toUpperCase()}</strong>
                        </span>
                        <span style={{ color: theme.palette.gray[500] }}> ({orderBy.asc ? 'asc' : 'desc'})</span>
                    </Button>
                )}
            >
                <div className="orderby-filter">
                    <Typography variant="caption" className="orderby-filter__label">
                        Choose your desired filter below
                    </Typography>
                    <div className="orderby-filter__list-container">
                        {ORDER_BY_KEYS.map(key => (
                            <div key={key} className="orderby-filter__list-container__item">
                                <Typography
                                    variant="h3"
                                    className={clsx({
                                        ['orderby-filter__list-container__item--selected']: key === orderBy.key,
                                    })}
                                >
                                    {key}
                                </Typography>

                                <div>
                                    {/** Descending order Button  */}
                                    <Button
                                        onClick={onChangeOrderBy(key, false)}
                                        variant="icon"
                                        icon={
                                            <ExpandMoreIcon
                                                color={theme.palette.gray[700]}
                                                className={clsx({
                                                    ['orderby-filter__list-container__item--selected']:
                                                        key === orderBy.key && orderBy.asc === false,
                                                })}
                                            />
                                        }
                                    />
                                    {/** Ascending order Button  */}
                                    <Button
                                        onClick={onChangeOrderBy(key, true)}
                                        variant="icon"
                                        icon={
                                            <ExpandLessIcon
                                                color={theme.palette.gray[700]}
                                                className={clsx({
                                                    ['orderby-filter__list-container__item--selected']:
                                                        key === orderBy.key && orderBy.asc === true,
                                                })}
                                            />
                                        }
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Menu>
        </>
    );
});

export default OrderByFilter;
