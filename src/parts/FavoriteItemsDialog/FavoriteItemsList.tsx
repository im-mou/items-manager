import React from 'react';
import { Button, DeleteIcon, Paper, theme, Typography } from '../../components/design-system';
import { IItem } from '../../types/types';
import './favorite-items.sass';

const data: IItem[] = [
    {
        title: 'iPhone 6S Oro',
        description:
            'Vendo un iPhone 6 S color Oro nuevo y sin estrenar. Me han dado uno en el trabajo y no necesito el que me compré. En tienda lo encuentras por 749 euros y yo lo vendo por 740. Las descripciones las puedes encontrar en la web de apple. Esta libre.',
        price: '740',
        email: 'iphonemail@wallapop.com',
        image: 'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/iphone.png',
    },
    {
        title: 'Polaroid 635',
        description:
            'Cámara clásica de fotos Polaroid, modelo 635. Las fotos son a super color. Está en perfectas condiciones y es fantástica para coleccionistas. Se necesitan carretes instax 20 para hacer fotos. Tamaño M.',
        price: '50',
        email: 'cameramail@wallapop.com',
        image: 'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/camera.png',
    },
    {
        title: 'Bolso piel marca Hoss',
        description:
            'Vendo bolso de piel marrón grande de la marca Hoss. Lo compré hace dos temporadas. Esta en perfectas condiciones, siempre se ha guardado en bolsa de tela para su conservación. Precio original de 400 euros. Lo vendo por 250 porque ya casi no me lo pongo. Tiene varios compartimentos dentro.',
        price: '250',
        email: 'bagmail@wallapop.com',
        image: 'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/bag.png',
    },
    {
        title: 'Reloj de Daniel Wellington',
        description:
            'Reloj de la marca Daniel Wellington usado sólo un mes. Ahora me han regalado otro que me gusta más y es muy parecido; por eso lo vendo. Su precio en tienda son 149 pero lo vendo por 100 euros. Es con la esfera blanca y la correa de piel marron. ',
        price: '100',
        email: 'watchmail@wallapop.com',
        image: 'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/watch.png',
    },
    {
        title: 'Coche antiguo americano',
        description:
            'Coche antiguo americano de color marrón. Se tiene que cambiar el motor pero aparte de eso todo funciona correctamente. Interior de piel clara. Ideal para coleccionistas',
        price: '210000',
        email: 'carmail@wallapop.com',
        image: 'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/car.png',
    },
    {
        title: 'Coche DSHSFHSDFHantiguo americano',
        description:
            'Coche antiguo americano de color marrón. Se tiene que cambiar el motor pero aparte de eso todo funciona correctamente. Interior de piel clara. Ideal para coleccionistas',
        price: '210000',
        email: 'carmail@wallapop.com',
        image: 'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/car.png',
    },
    {
        title: 'Cochasdsdvxcgse antiguo americano',
        description:
            'Coche antiguo americano de color marrón. Se tiene que cambiar el motor pero aparte de eso todo funciona correctamente. Interior de piel clara. Ideal para coleccionistas',
        price: '210000',
        email: 'carmail@wallapop.com',
        image: 'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/car.png',
    },
    {
        title: 'Coche antasdasdhasdhiguo americano',
        description:
            'Coche antiguo americano de color marrón. Se tiene que cambiar el motor pero aparte de eso todo funciona correctamente. Interior de piel clara. Ideal para coleccionistas',
        price: '210000',
        email: 'carmail@wallapop.com',
        image: 'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/car.png',
    },
    {
        title: 'Coche antigasdfuo americano',
        description:
            'Coche antiguo americano de color marrón. Se tiene que cambiar el motor pero aparte de eso todo funciona correctamente. Interior de piel clara. Ideal para coleccionistas',
        price: '210000',
        email: 'carmail@wallapop.com',
        image: 'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/car.png',
    },
    {
        title: 'Coche antiguo amerfgjdfgjicano',
        description:
            'Coche antiguo americano de color marrón. Se tiene que cambiar el motor pero aparte de eso todo funciona correctamente. Interior de piel clara. Ideal para coleccionistas',
        price: '210000',
        email: 'carmail@wallapop.com',
        image: 'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/car.png',
    },
    {
        title: 'Coche asdfasdfantiguo americano',
        description:
            'Coche antiguo americano de color marrón. Se tiene que cambiar el motor pero aparte de eso todo funciona correctamente. Interior de piel clara. Ideal para coleccionistas',
        price: '210000',
        email: 'carmail@wallapop.com',
        image: 'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/car.png',
    },
    {
        title: 'Coche antiguo amerxcbvxcvbxicano',
        description:
            'Coche antiguo americano de color marrón. Se tiene que cambiar el motor pero aparte de eso todo funciona correctamente. Interior de piel clara. Ideal para coleccionistas',
        price: '210000',
        email: 'carmail@wallapop.com',
        image: 'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/car.png',
    },
];

// Main component
const FavoriteItemsList = () => {
    return (
        <div className="favorite-items">
            {/** info */}
            <div className="favorite-items__info">
                <Typography variant="caption">{data.length} items added to list</Typography>{' '}
            </div>

            <div className="favorite-items__list">
                {/** items list */}
                {data.map((item, index) => (
                    <Paper
                        tabIndex={0}
                        variant="outlined"
                        key={`${item.title}_${item.email}`}
                        className="favorite-items__list__item"
                    >
                        <div className="favorite-items__list__item__image">
                            <img src={item.image} alt={item.title} />
                        </div>
                        <div className="favorite-items__list__item__title">
                            <Typography variant="h3">{item.title}</Typography>
                        </div>
                        <div className="favorite-items__list__item__action">
                            <Button
                                tabIndex={0}
                                variant="icon"
                                aria-label="Delete favourite item"
                                icon={<DeleteIcon color={theme.palette.gray[500]} />}
                            />
                        </div>
                    </Paper>
                ))}
            </div>
        </div>
    );
};

export default FavoriteItemsList;
