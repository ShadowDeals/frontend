import React from 'react';
import Button from '@mui/material/Button';
import OrderCard from './OrderCard.jsx';

export default function PendingEmployeesOrderCard({ id, onAssignEmployee, onMoreInfo }) {
    const getOrderType = (id) => {
        const types = ['Убийство', 'Поджог', 'Кража'];
        return types[id % 3];
    };

    return (
        <OrderCard
            id={id}
            sender="annihilator-zxc"
            orderType={getOrderType(id)}
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
