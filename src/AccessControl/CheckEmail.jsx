import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { useLocation } from "react-router-dom";

export default function CheckEmailComponent() {
    const location = useLocation();
    const email = location.state?.email;

    return (
        <Box
            sx={{
                bgcolor: 'black',
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    textAlign: 'center',
                    width: '40%',
                    bgcolor: '#990000',
                    color: 'black',
                }}
            >
                <Typography variant="h4" component="h1" sx={{color: 'black'}} gutterBottom>
                    Регистрация успешна!
                </Typography>
                <Typography variant="body1" sx={{ color: 'black' }}>
                    Проверь почту {email || '...'} для подтверждения письма.
                </Typography>
            </Paper>
        </Box>
    );
}
