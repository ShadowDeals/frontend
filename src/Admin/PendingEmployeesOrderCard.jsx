import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Stack} from "@mui/material";
import AssignEmployeesDialog from "./AssignEmployeesDialog.jsx";

export function PendingEmployeesOrderCard({id, onAssignEmployee, onMoreInfo}) {
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
            <Stack direction="row" spacing={2} sx={{ paddingLeft:'25px', width: '100%', justifyContent: 'space-between' }}>
                <Button size="small" color="info" onClick={onMoreInfo}>
                    Подробнее
                </Button>
                <Button size="small" color="success" onClick={onAssignEmployee}>
                    Назначить солдат
                </Button>
            </Stack>
        </Card>
    );
}