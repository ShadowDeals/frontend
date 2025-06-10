import React, {useEffect, useState} from 'react';
import {Box, Typography, Card, CardContent, Stack, Paper, Button} from '@mui/material';
import {useEmployees} from "./useEmployees.js";
import axios from "axios";
import {useAuthHeaders} from "./tokenHooks.js";

const EmployeesListWithStatus = ({employees, status}) => {
    console.log('employees тут какие', employees);
    console.log('EmployeesListWithStatus статус какой: ', status);
    const [actioned, setActioned] = useState({});

    const authHeaders = useAuthHeaders();

    useEffect(() => {
        console.log('Updated actioned:', actioned);
    }, [actioned]);

    const handleAction = async (employee) => {
        const employeeId = status === 'pending' ? employee.id : employee.workerId;

        console.log('работаем для employee: ', employee);
        if (status === 'pending') {
            try {
                await axios.put(
                    `http://localhost:8080/request?requestId=${employeeId}`,
                    {},
                    {
                        headers: {
                            ...authHeaders,
                        },
                    }
                );
                console.log(`Запрос отправлен для requestId=${employeeId}`);
                setActioned((prev) => ({...prev, [employeeId]: true}));
                console.log('actioned pending -> ', actioned);
            } catch (error) {
                console.error('Ошибка при отправке запроса:', error);
            }
        } else if (status === 'active') {
            await axios.put(
                `http://localhost:8080/band/kick?userId=${employeeId}`,{},
                {
                    headers: {
                        ...authHeaders,
                    },
                }
            );
            setActioned((prev) => ({...prev, [employeeId]: true}));
            console.log('actioned active -> ', actioned);
        } else {
            console.log(`Действие для статуса ${status} не реализовано`);
            setActioned((prev) => ({...prev, [employeeId]: true}));
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
                // border: '1px solid #5C3A0E',
                padding: 2,
            }}
        >
            {employees.map((employee) => (
                <Card
                    key={employee.id}
                    sx={{
                        minWidth: 200,
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
                                    sx={{fontWeight: 'bold', mb: 0.5}}
                                >
                                    Имя: {status === 'pending' ? (employee.name) : (employee.workerName)}
                                </Typography>
                                <Typography
                                    color="black"
                                    variant="body2"
                                    sx={{fontFamily: 'Monospace', mb: 0.5}}
                                >
                                    ID: {status === 'pending' ? (employee.id) : (employee.workerId)}
                                </Typography>
                                {
                                    status === 'pending' ? (
                                        <Typography
                                            color="black"
                                            variant="body2"
                                            sx={{fontFamily: 'Monospace', mb: 0.5}}
                                        >
                                            Дата создания
                                            заявки: {employee.dateCreated ? new Date(employee.dateCreated).toLocaleString() : 'неизвестна'}
                                        </Typography>
                                    ) : (<></>)
                                }
                            </Box>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={() => handleAction(employee)}
                                disabled={actioned[status === 'pending' ? employee.id : employee.workerId]}
                            >
                                {actioned[status === 'pending' ? employee.id : employee.workerId] ? labelDone : labelActive}
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

const EmployeesStatusView = ({role, status = 'pending'}) => {
    console.log('Статус в EmployeesStatusView: ', status);
    const {employees, loading, error} = useEmployees(role, status);
    console.log('employees', employees);
    return (
        <Box sx={{width: '100%', height: '100%', padding: 4}}>

            {role === 'Дон' ? (
                <Stack spacing={2}>
                    <Typography variant="h6" sx={{marginBottom: 2, textAlign: 'right'}}>
                        Администраторы
                    </Typography>
                    <EmployeesListWithStatus employees={employees} status={status}/>
                </Stack>
            ) : role === 'Администратор' ? (
                <Box sx={{width: '100%'}}>
                    <Typography textAlign={'right'} variant="h6" sx={{ml: 2}}>
                        Солдаты
                    </Typography>
                    <EmployeesListWithStatus employees={employees} status={status}/>
                </Box>
            ) : null}
        </Box>
    );
};

export default EmployeesStatusView;
