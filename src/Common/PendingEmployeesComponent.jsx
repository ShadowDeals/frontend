import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Stack } from '@mui/material';
import ColorSwitchableButton from "../CommonComponents/Buttons.jsx";

const mockPendingEmployees = [
    { id: 1, name: 'Иван Иванов', email: 'ivan@example.com' },
    { id: 2, name: 'Анна Смирнова', email: 'anna@example.com' },
    { id: 3, name: 'Петр Петров', email: 'petr@example.com' },
];

const PendingEmployees = () => {
    const [approved, setApproved] = useState({});

    const handleApprove = (employeeId) => {
        setApproved((prev) => ({ ...prev, [employeeId]: true }));
    };

    return (
        <Box sx={{ width: '100%', height: '100%', padding: 4 }}>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
                Ожидающие сотрудники
            </Typography>

            <Box
                sx={{
                    width: '100%',
                    height: '80%',
                    overflowY: 'auto',
                    border: '1px solid #900000',
                    padding: 2,
                }}
            >
                {mockPendingEmployees.map((employee) => (
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
                                    <Typography color="black" variant="h6">{employee.name}</Typography>
                                    <Typography color="black" variant="body2">{employee.email}</Typography>
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
                                    onClick={() => handleApprove(employee.id)}
                                    disabled={approved[employee.id]}
                                >
                                    {approved[employee.id] ? 'Одобрено' : 'Одобрить'}
                                </ColorSwitchableButton>
                            </Stack>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default PendingEmployees;
