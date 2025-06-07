import * as React from 'react';
import { Box, Card, CardContent, Typography, Stack } from '@mui/material';

export default function OrderCard({ id, title, description, sender, actions }) {
    const getOrderType = (id) => {
        const types = ['Убийство', 'Поджог', 'Кража'];
        return types[id % 3];
    };

    return (
        <Card sx={{ minWidth: 275 }} elevation={5}>
            <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    Заказ: ID {id}
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: 14 }} component="div">
                    Отправитель: {sender}
                </Typography>
                <Typography variant="h4">{title || getOrderType(id).toLowerCase()}</Typography>
                <Typography variant="body1">{description}</Typography>
            </CardContent>

            <Stack
                padding={'2%'}
                direction="row"
                spacing={2}
                sx={{ width: '100%', justifyContent: 'space-between' }}
            >
                {actions}
            </Stack>
        </Card>
    );
}
