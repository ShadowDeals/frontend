import React, { useState } from 'react';
import {Box, Typography, Card, CardContent, Stack, Paper} from '@mui/material';
import ColorSwitchableButton from "../CommonComponents/Buttons.jsx";
import {useEmployees} from "./EmployeesHook.jsx";
import axios from "axios";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";


const EmployeesListWithStatus = ({ employees, status }) => {
    const [actioned, setActioned] = useState({});

    const accessToken = Cookies.get('accessToken');
    console.log(accessToken);
    const handleAction = async (employee) => {
        const employeeId = status === 'pending' ? employee.id : employee.workerId;

        console.log('работаем для employeeId: ', employeeId);
        if (status === 'pending') {
            try {
                await axios.put(
                    `http://localhost:8080/request?requestId=${employeeId}`,
                    null,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                console.log(`Запрос отправлен для requestId=${employeeId}`);
                setActioned((prev) => ({ ...prev, [employeeId]: true }));
            } catch (error) {
                console.error('Ошибка при отправке запроса:', error);
            }
        } else {
            console.log(`Действие для статуса ${status} не реализовано`);
            setActioned((prev) => ({ ...prev, [employeeId]: true }));
        }
    };

    const buttonText = {
        pending: ['Принять', 'Принят'],
        active: ['Уволить', 'Уволен'],
    };

    const [labelActive, labelDone] = buttonText[status] || buttonText.pending;


    if (!employees || employees.length === 0) {
        return (
            <Box
                sx={{
                    width: '100%',
                    height: '600px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 2,
                }}
            >
                <Typography variant="body1" color="text.secondary" textAlign="center">
                    Здесь пока пусто
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                width: '100%',
                height: '600px',
                overflowY: 'auto',
                border: '1px solid black',
                padding: 2,
            }}
        >
            {employees.map((employee) => (
                <Card
                    key={employee.id}
                    sx={{
                        minWidth: 200,
                        backgroundColor: '#990000',
                        borderRadius: 2,
                        boxShadow: 2,
                        margin: '1% 0',
                    }}
                >
                    <CardContent>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Box>
                                <Typography
                                    color="black"
                                    variant="h6"
                                    sx={{ fontWeight: 'bold', mb: 0.5 }}
                                >
                                    Имя: {status === 'pending' ? (employee.name) : (employee.workerName)}
                                </Typography>
                                <Typography
                                    color="black"
                                    variant="body2"
                                    sx={{ fontFamily: 'Monospace', mb: 0.5 }}
                                >
                                    ID: {status === 'pending' ? (employee.id) : (employee.workerId)}
                                </Typography>
                                {
                                    status === 'pending' ? (
                                        <Typography
                                            color="black"
                                            variant="body2"
                                            sx={{ fontFamily: 'Monospace', mb: 0.5 }}
                                        >
                                            Дата создания заявки: {employee.dateCreated ? new Date(employee.dateCreated).toLocaleString() : 'неизвестна'}
                                        </Typography>
                                    ) : (<></>)
                                }
                            </Box>
                            <ColorSwitchableButton
                                variant="contained"
                                color="primary"
                                size="small"
                                sx={{
                                    '&.Mui-disabled': {
                                        backgroundColor: '#990000',
                                        color: 'black',
                                    },
                                }}
                                onClick={() => handleAction(employee)}
                                disabled={actioned[employee.id]}
                            >
                                {actioned[employee.id] ? labelDone : labelActive}
                            </ColorSwitchableButton>
                        </Stack>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};


const EmployeesStatusView = ({ role, status = 'pending' }) => {
    console.log('Статус в EmployeesStatusView: ', status);
    const { employees, loading, error } = useEmployees(role, status);
    console.log('employees', employees);
    return (
        <Box sx={{ width: '100%', height: '100%', padding: 4 }}>

            {role === 'Дон' ? (
                <Box>
                    <Box sx={{ width: '100%', height: '100%' }}>
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>
                            Администраторы
                        </Typography>
                        <EmployeesListWithStatus employees={employees} status={status} />
                    </Box>
                </Box>
            ) : role === 'Администратор' ? (
                <Box sx={{ width: '100%' }}>
                    <Typography variant="h6" sx={{ ml:2 }}>
                        Солдаты
                    </Typography>
                    <EmployeesListWithStatus employees={employees} status={status} />
                </Box>
            ) : null}
        </Box>
    );
};

export default EmployeesStatusView;
