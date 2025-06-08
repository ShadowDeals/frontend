import React from 'react';
import Button from '@mui/material/Button';
import {Card, CardContent, Typography, Stack} from '@mui/material';

export function formatDate(dateString) {
    if (!dateString) return '';

    const date = new Date(dateString);
    if (isNaN(date)) return dateString;

    const datePart = date.toLocaleDateString('ru-RU');
    const timePart = date.toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'});

    return `${datePart} ${timePart}`;
}

export const taskTypeLabels = {
    HIJACKING: 'Угон',
    MURDER: 'Убийство',
    ROBBERY: 'Ограбление',
    SCARING: 'Запугивание',
    DELIVERY: 'Доставка',
};

export function OrderCard({taskInfo, actions}) {
    return (
        <Card sx={{width: '100%', height: '100%'}} elevation={5}>
            <CardContent>
                <Stack spacing={1}>
                    <Typography gutterBottom sx={{color: 'text.secondary', fontSize: 14}}>
                        ID: {taskInfo.taskId}
                    </Typography>
                    <Typography sx={{color: 'text.secondary', fontSize: 14}} component="div">
                        Адрес: {taskInfo.address}
                    </Typography>
                    <Typography sx={{color: 'text.secondary', fontSize: 14}} variant="body1">
                        Дата заявки: {formatDate(taskInfo.dateCreated)}
                    </Typography>
                    <Typography variant="h5" textAlign={'center'}>{taskTypeLabels[taskInfo.taskType]}</Typography>
                </Stack>
                <Stack
                    direction="row"
                    sx={{width: '100%', height: '100%', justifyContent: 'space-between'}}
                >
                    {actions}
                </Stack>
            </CardContent>
        </Card>
    );
}

export function PendingApplyOrderCard({taskInfo, onReject, onMoreInfo, onSetPrice}) {
    return (
        <OrderCard
            taskInfo={taskInfo}
            actions={[
                <Button key="reject" size="small" color="error" onClick={onReject}>
                    Отклонить
                </Button>,
                <Button key="info" size="small" color="info" onClick={onMoreInfo}>
                    Подробнее
                </Button>,
                <Button key="set-price" size="small" color="success" onClick={onSetPrice}>
                    Назначить оплату
                </Button>,
            ]}
        />
    );
}

export function PendingPaymentOrderCard({taskInfo, onReject, onMoreInfo, onSetPrice}) {
    return (
        <OrderCard
            taskInfo={taskInfo}
            sender="annihilator-zxc"
            description="Описание: требуется сделать то-то и то-то"
            actions={[
                <Button key="reject" size="small" color="error" onClick={onReject}>
                    Отклонить
                </Button>,
                <Button key="info" size="small" color="info" onClick={onMoreInfo}>
                    Подробнее
                </Button>,
                <Button key="set-price" size="small" color="success" onClick={onSetPrice}>
                    Назначить оплату
                </Button>,
            ]}
        />
    );
}

export function PendingEmployeesOrderCard({taskInfo, onAssignEmployee, onMoreInfo}) {
    return (
        <OrderCard
            taskInfo={taskInfo}
            sender="annihilator-zxc"
            orderType={'qwe'}
            description="Описание: требуется сделать то-то и то-то"
            actions={[
                <Button key="info" size="small" color="info" onClick={onMoreInfo}>
                    Подробнее
                </Button>,
                <Button key="assign" size="small" color="success" onClick={onAssignEmployee}>
                    Назначить солдат
                </Button>,
            ]}
        />
    );
}

export function InProgressOrderCard({taskInfo, onMoreInfo}) {
    return (
        <OrderCard
            taskInfo={taskInfo}
            sender="annihilator-zxc"
            description="Описание: требуется сделать то-то и то-то"
            actions={[
                <Button key="info" size="small" color="info" onClick={onMoreInfo}>
                    Подробнее
                </Button>,
            ]}
        />
    );
}

export function DoneOrderCard({taskInfo, onMoreInfo, onViewReport, role}) {
    return (
        <OrderCard
            role={role}
            taskInfo={taskInfo}
            sender="annihilator-zxc"
            description="Описание: требуется сделать то-то и то-то"
            actions={[
                <Button key="info" size="small" color="info" onClick={onMoreInfo}>
                    Подробнее
                </Button>,
                <Button key="report" size="small" color="secondary" onClick={onViewReport}>
                    Посмотреть отчёт
                </Button>,
            ]}
        />
    );
}
