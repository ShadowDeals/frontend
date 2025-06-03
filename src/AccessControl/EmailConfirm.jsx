import { Box, Paper, Typography, Button } from "@mui/material";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';

export function EmailConfirmComponent() {
    const navigate = useNavigate();

    const handleGoToLogin = () => {
        navigate("/login");
    };

    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        const code = searchParams.get("code");

        if (!code) {
            return;
        }

        axios.post("http://localhost:8080/api/auth/confirm", { code })
            .then(() => {
                console.log('Почта успешно подтверждена')
                setSuccess(true);
            })
            .catch(() => {
                console.log('Произошла ошибка')
                setError(true);
            })
            .finally(() => {
                console.log('Загрзка завершена')
                setLoading(false);
            });
    }, [searchParams]);

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100vw"
            height="100vh"
            sx={{ bgcolor: 'black' }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 5,
                    width: '30vw',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    bgcolor: '#990000',
                    color: 'black',
                }}
            >
                {loading ? (
                    <CircularProgress color="inherit" />
                ) : error ? (
                    <>
                        <Typography variant="h5" gutterBottom textAlign="center">
                            Ошибка подтверждения
                        </Typography>
                        <Typography variant="body1" textAlign="center" sx={{ mb: 4 }}>
                            Ссылка недействительна или код истёк.
                        </Typography>
                    </>
                ) : success ? (
                    <>
                        <Typography variant="h4" gutterBottom textAlign="center">
                            Поздравляем!
                        </Typography>
                        <Typography variant="body1" textAlign="center" sx={{ mb: 4 }}>
                            Почта успешно подтверждена.
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={handleGoToLogin}
                            sx={{
                                bgcolor: 'black',
                                color: '#990000',
                                '&:hover': {
                                    bgcolor: '#660000',
                                    color: 'black',
                                },
                            }}
                        >
                            Перейти ко входу
                        </Button>
                    </>
                ) : null}
            </Paper>
        </Box>
    );
}

export default EmailConfirmComponent;
