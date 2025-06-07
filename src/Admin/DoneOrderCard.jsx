import React from 'react';
import Button from '@mui/material/Button';
import OrderCard from './OrderCard.jsx';

export function DoneOrderCard({ taskInfo, onMoreInfo, onViewReport }) {
    return (
        <OrderCard
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
