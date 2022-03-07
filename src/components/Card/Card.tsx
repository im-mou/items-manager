import React from 'react';
import { IItem } from '../../types/types';
import { Button, FavoriteIcon, theme, Typography, UnfoldIcon } from '../design-system';
import './card.sass';

export interface CardProps {
    item: IItem;
    openDetails: () => void;
}

const Card = React.memo(function Card({ item, openDetails }: CardProps) {
    return (
        <article className="item-card">
            <div className="item-card__image">
                <img src={item.image} alt={item.title} />
            </div>
            <div className="item-card__content">
                <div className="item-card__content__title">
                    <Typography variant="h3">{item.title}</Typography>
                </div>
                <div className="item-card__content__user">
                    <Typography variant="caption">{item.email}</Typography>
                </div>
                <div className="item-card__content__body">
                    <Typography ellipsis={100} variant="body">
                        {item.description}
                    </Typography>
                </div>
                <div className="item-card__content__footers">
                    <Typography variant="h1">{item.price}€</Typography>
                    <div>
                        <Button
                            onClick={openDetails}
                            variant="icon"
                            icon={<UnfoldIcon color={theme.palette.gray[700]} />}
                        />
                        <Button variant="icon" icon={<FavoriteIcon color={theme.palette.gray[700]} />} />
                    </div>
                </div>
            </div>
        </article>
    );
});

export default Card;
