import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Stack} from "@mui/material";

export function ActiveTaskCard({id, onMoreInfo, onCreateReport}) {
    const getOrderType = (id) => {
        const types = ['Убийство', 'Поджог', 'Кража'];
        return types[id % 3];
    };

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    Заказ: ID 306784509
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: 14 }} component="div">
                    Отправитель: annihilator-zxc
                </Typography>
                <Typography variant={'h4'}>{getOrderType(id).toLowerCase()}</Typography>
                <Typography variant="body1">
                    Описание: требуется сделать то-то и то-то
                </Typography>
            </CardContent>
            <Stack direction="row" spacing={2} sx={{ width: '100%', justifyContent: 'space-between' }}>
                <Button size="small" color="info" onClick={onMoreInfo}>
                    Подробнее
                </Button>
                <Button size="small" color="success" onClick={onCreateReport}>
                    Отчитаться о выполнении
                </Button>
            </Stack>
        </Card>
    );
}