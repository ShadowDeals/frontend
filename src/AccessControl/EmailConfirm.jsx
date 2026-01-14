import {Box, Paper, Typography, Button, Stack} from "@mui/material";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import {API_BASE} from "../baseUrl.js";

export function EmailConfirmComponent() {
    const navigate = useNavigate();

    const handleGoToLogin = () => {
        navigate("/login");
    };

    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const didRun = useRef(false);

    useEffect(() => {
        if (didRun.current) return;
        didRun.current = true;

        const code = searchParams.get("code");
        if (!code) return;

        const baseUrl = `${API_BASE}/api/auth/confirm/email`;
        const fullUrl = `${baseUrl}?code=${encodeURIComponent(code)}`;
        console.log("Полный HTTP путь запроса:", fullUrl);

        axios.put(fullUrl)
            .then(() => {
                console.log("Почта успешно подтверждена");
                setSuccess(true);
            })
            .catch((error) => {
                if (error.response) {
                    console.log("Произошла ошибка");
                    console.log("Код ошибки:", error.response.status);
                    console.log("Текст ошибки:", error.response.data?.message || "Нет сообщения");
                } else if (error.request) {
                    console.log("Запрос был отправлен, но ответа нет");
                } else {
                    console.log("Ошибка настройки запроса:", error.message);
                }
                setError(true);
            })
            .finally(() => {
                console.log("Загрузка завершена");
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
        >
            <Paper
                elevation={5}
                sx={{
                    p: 5,
                    width: '30%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {loading ? (
                    <CircularProgress color="inherit" />
                ) : error ? (
                    <Stack spacing={2}>
                        <Typography variant="h4" gutterBottom textAlign="center">
                            Ошибка подтверждения
                        </Typography>
                        <Typography variant="body1" textAlign="center" sx={{ mb: 4 }}>
                            Ссылка недействительна или код истёк.
                        </Typography>
                    </Stack>
                ) : success ? (
                    <Stack spacing={2}>
                        <Typography variant="h4" gutterBottom textAlign="center">
                            Поздравляем!
                        </Typography>
                        <Typography variant="body1" textAlign="center" sx={{ mb: 4 }}>
                            Почта успешно подтверждена.
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={handleGoToLogin}
                        >
                            Перейти ко входу
                        </Button>
                    </Stack>

                ) : null}
            </Paper>
        </Box>
    );
}

export default EmailConfirmComponent;
