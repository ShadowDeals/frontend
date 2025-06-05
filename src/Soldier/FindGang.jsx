import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Stack } from '@mui/material';
import ColorSwitchableButton from "../CommonComponents/Buttons.jsx";

const mockGangs = [
    { id: 1, name: 'Василеостровский район' },
    { id: 2, name: 'Выборгский район' },
    { id: 3, name: 'Девяткино' },
    { id: 4, name: 'Десяткино' },
    { id: 5, name: 'Купчино' },
    { id: 6, name: 'Мурино' },
    { id: 7, name: 'Московский район' },
    { id: 8, name: 'Парк Победы' },
    { id: 9, name: 'Лесная' },
    { id: 10, name: 'Кантемировская' },
    { id: 11, name: 'без названия' },
    { id: 12, name: 'без названия' },
    { id: 13, name: 'без названия' },
    { id: 14, name: 'без названия' },
];

const FindGang = () => {
    const [submitted, setSubmitted] = useState({});

    const handleApply = (gangId) => {
        setSubmitted((prev) => ({ ...prev, [gangId]: true }));
    };

    return (
        <Box sx={{ width: '100%', height: '100%', padding: 4 }}>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
                Найди свою банду
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
                {mockGangs.map((gang) => (
                    <Card
                        key={gang.id}
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
                                <Typography color="black" variant="h6">
                                    {gang.name}
                                </Typography>
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
                                    onClick={() => handleApply(gang.id)}
                                    disabled={submitted[gang.id]}
                                >
                                    {submitted[gang.id] ? 'Заявка отправлена' : 'Отправить заявку'}
                                </ColorSwitchableButton>
                            </Stack>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default FindGang;
