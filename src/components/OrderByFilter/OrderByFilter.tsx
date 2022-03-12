import clsx from 'clsx';
import React from 'react';
import { Button, ExpandLessIcon, ExpandMoreIcon, Menu, theme, Typography } from '../../components/design-system';
import { IOrderByFilter } from '../../types/types';
import { ORDER_BY_KEYS } from '../../utils/constants';
import './orderby-filter.sass';

interface IorderByStateProps {
    // state of the current sorting order applied
    orderByState: IOrderByFilter;

    // Function to sort items of the current view
    sort: (orderBy: IOrderByFilter) => void;
}

const OrderByFilter = React.memo(function OrderByFilter({ orderByState, sort }: IorderByStateProps) {
    // handle order filter change
    const onChangeOrderBy = (key: typeof ORDER_BY_KEYS[number], asc: boolean) => () => {
        // Apply sort
        sort({
            key,
            asc,
        });
    };

    // Filter items button + menu
    return (
        <>
            <Menu
                trigger={(setOpen, open) => (
                    <Button onClick={setOpen} variant="text" endIcon={!open ? <ExpandMoreIcon /> : <ExpandLessIcon />}>
                        <span style={{ color: theme.palette.gray[500] }}>ORDER BY – </span>
                        <span style={{ color: theme.palette.primary.main }}>
                            <strong>{orderByState.key.toUpperCase()}</strong>
                        </span>
                        <span style={{ color: theme.palette.gray[500] }}> ({orderByState.asc ? 'asc' : 'desc'})</span>
                    </Button>
                )}
            >
                <div className="orderby-filter">
                    <Typography variant="caption" className="orderby-filter__label">
                        Choose your desired filter below
                    </Typography>
                    <div className="list-container">
                        {ORDER_BY_KEYS.map(key => (
                            <div key={key} className="list-container__item">
                                <Typography
                                    variant="h3"
                                    className={clsx({
                                        ['list-container__item--selected']: key === orderByState.key,
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
                                                    ['list-container__item--selected']:
                                                        key === orderByState.key && orderByState.asc === false,
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
                                                    ['list-container__item--selected']:
                                                        key === orderByState.key && orderByState.asc === true,
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
