import * as React from 'react';
import { Box, Card, CardContent, Typography, Stack } from '@mui/material';

function formatDate(dateString) {
    if (!dateString) return '';

    const date = new Date(dateString);
    if (isNaN(date)) return dateString;

    const datePart = date.toLocaleDateString('ru-RU');
    const timePart = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

    return `${datePart} ${timePart}`;
}

export default function OrderCard({ taskInfo, actions }) {


    return (
        <Card sx={{ width: '100%', height:'100%' }} elevation={5}>
            <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    ID: {taskInfo.taskId}
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: 14 }} component="div">
                    Адрес: {taskInfo.address}
                </Typography>
                <Typography variant="h5" textAlign={'center'}>{taskInfo.taskType}</Typography>
                <Typography variant="body1">
                    {formatDate(taskInfo.dateCreated)}
                </Typography>
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
