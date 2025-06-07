import React from 'react';
import Button from '@mui/material/Button';
import OrderCard from './OrderCard.jsx';

export default function PendingEmployeesOrderCard({ taskInfo, onAssignEmployee, onMoreInfo }) {
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
