import React, {useState} from 'react';
import {Typography, Paper, Box, Link, Stack} from '@mui/material';
import {useLocation, useNavigate} from "react-router-dom";

export default function CheckEmailComponent() {
    const location = useLocation();
    const email = location.state?.email;

    const navigate = useNavigate();
    const navigateWelcome = () => {
        navigate('/welcome');
    };

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
                <Stack>
                    <Link
                        underline="hover"
                        sx={{
                            alignSelf: 'flex-start',
                            cursor: 'pointer',
                            color: 'black',
                            fontSize: '0.9rem',
                        }}
                        onClick={navigateWelcome}
                    >
                        На главную
                    </Link>
                    <Typography variant="h4" component="h1" sx={{color: 'black'}} gutterBottom>
                        Регистрация успешна!
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'black' }}>
                        Проверь почту {email || '...'} для подтверждения письма.
                    </Typography>
                </Stack>
            </Paper>
        </Box>
    );
}
