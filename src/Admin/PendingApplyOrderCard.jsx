import React from 'react';
import Button from '@mui/material/Button';
import OrderCard from './OrderCard.jsx';

export function PendingApplyOrderCard({ taskInfo, onReject, onMoreInfo, onSetPrice }) {
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
