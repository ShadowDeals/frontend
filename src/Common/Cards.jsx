import React from 'react';
import Button from '@mui/material/Button';
import {Card, CardContent, Typography, Stack, Tooltip} from '@mui/material';

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

export const taskStatusLabels = {
    IN_WORK: "IN_WORK",
    FINISHED: "FINISHED",
    WAITING_FOR_ACCEPT: "WAITING_FOR_ACCEPT",
    WAITING_FOR_PAYMENT: "WAITING_FOR_PAYMENT",
    WAITING_FOR_ASSIGNMENT: "WAITING_FOR_ASSIGNMENT",
    WAITING_FOR_PRICE_ASSIGNMENT: "WAITING_FOR_PRICE_ASSIGNMENT"
};

export function OrderCard({taskInfo, actions}) {
    return (
        <Card sx={{ minWidth:'350px', width: '100%', height: '100%'}} elevation={5}>
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

export function PendingApplyOrderCard({taskInfo, onReject, onMoreInfo, onSetPrice, role}) {
    const actions = [
        <Button key="reject" size="small" color="error" onClick={onReject}>
            {role === 'Администратор' ? 'Отклонить' : 'Отозвать'}
        </Button>,
        <Button key="info" size="small" color="info" onClick={onMoreInfo}>
            Подробнее
        </Button>,
    ];

    if (role === 'Администратор' && onSetPrice) {
        actions.push(
            <Button key="set-price" size="small" color="success" onClick={onSetPrice}>
                Назначить оплату
            </Button>
        );
    }

    return <OrderCard taskInfo={taskInfo} actions={actions}/>;
}

export function PendingPaymentOrderCard({taskInfo, onReject, onMoreInfo, onPay, role}) {
    const actions = [
        <Button key="reject" size="small" color="error" onClick={onReject}>
            {role === 'Администратор' ? 'Отклонить' : 'Отозвать'}
        </Button>,
        <Button key="info" size="small" color="info" onClick={onMoreInfo}>
            Подробнее
        </Button>,
    ];
    // console.log('В кнопке taskInfo', taskInfo);
    if (role === 'Пользователь') {
        const isDisabled = taskInfo.taskStatus === taskStatusLabels.WAITING_FOR_PRICE_ASSIGNMENT;
        actions.push(
            <Button
                key="pay"
                size="small"
                color="success"
                onClick={() => {
                    console.log('[PendingPaymentOrderCard] Кнопка "Оплатить" нажата, taskInfo:', taskInfo, 'typeof:', typeof taskInfo);
                    onPay(taskInfo);
                }}
                disabled={isDisabled}
            >
                Оплатить
            </Button>
        );
    }

    return <OrderCard taskInfo={taskInfo} actions={actions}/>;
}

export function PendingEmployeesOrderCard({taskInfo, onAssignEmployee, onMoreInfo, role}) {
    const actions = [
        <Button key="info" size="small" color="info" onClick={onMoreInfo}>
            Подробнее
        </Button>,
    ];

    if (role !== 'Пользователь') {
        actions.push(
            <Button key="assign" size="small" color="success" onClick={onAssignEmployee}>
                Назначить солдат
            </Button>
        );
    }

    return <OrderCard taskInfo={taskInfo} actions={actions}/>;
}

export function InProgressOrderCard({taskInfo, onMoreInfo, onReportCompletion, role}) {
    const actions = [
        <Button key="info" size="small" color="info" onClick={onMoreInfo}>
            Подробнее
        </Button>,
    ];

    if (role === 'Солдат' && onReportCompletion) {
        actions.push(
            <Button key="report" size="small" color="primary" onClick={onReportCompletion}>
                Отчитаться о выполнении
            </Button>
        );
    }

    return <OrderCard taskInfo={taskInfo} actions={actions}/>;
}


export function DoneOrderCard({ taskInfo, onMoreInfo, onViewReport, role }) {
    const actions = [
        <Button key="info" size="small" color="info" onClick={onMoreInfo}>
            Подробнее
        </Button>,
    ];

    if (
        onViewReport &&
        taskInfo.taskStatus !== 'CANCELED_BY_USER' &&
        taskInfo.taskStatus !== 'CANCELED_BY_ADMIN'
    ) {
        actions.push(
            <Button key="reportView" size="small" color="secondary" onClick={onViewReport}>
                Посмотреть отчёт
            </Button>
        );
    }

    return <OrderCard taskInfo={taskInfo} actions={actions} role={role} />;
}
