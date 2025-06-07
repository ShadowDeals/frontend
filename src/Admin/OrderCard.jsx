import * as React from 'react';
import { Card, CardContent, Typography, Stack } from '@mui/material';

export function formatDate(dateString) {
    if (!dateString) return '';

    const date = new Date(dateString);
    if (isNaN(date)) return dateString;

    const datePart = date.toLocaleDateString('ru-RU');
    const timePart = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

    return `${datePart} ${timePart}`;
}
export const taskTypeLabels = {
    HIJACKING: 'Угон',
    MURDER: 'Убийство',
    ROBBERY: 'Ограбление',
    SCARING: 'Запугивание',
    DELIVERY: 'Доставка',
};


export default function OrderCard({ taskInfo, actions }) {


    return (
        <Card sx={{ width: '100%', height:'100%' }} elevation={5}>
            <CardContent>
                <Stack spacing={1}>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                        ID: {taskInfo.taskId}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: 14 }} component="div">
                        Адрес: {taskInfo.address}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: 14 }} variant="body1">
                        Дата заявки: {formatDate(taskInfo.dateCreated)}
                    </Typography>
                    <Typography variant="h5" textAlign={'center'}>{taskTypeLabels[taskInfo.taskType]}</Typography>
                </Stack>
                <Stack
                    direction="row"
                    sx={{ width: '100%', height:'100%', justifyContent: 'space-between' }}
                >
                    {actions}
                </Stack>
            </CardContent>
        </Card>
    );
}
