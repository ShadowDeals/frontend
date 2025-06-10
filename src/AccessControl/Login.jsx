import { useNavigate } from 'react-router-dom';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Link, Stack, Button,
} from "@mui/material";
import Cookies from 'js-cookie';

import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import {useSnackbar} from "../Common/useSnackbar.js";
import React from "react";
import StatusSnackbar from "../Common/StatusSnackbar.jsx";
import {useDecodedToken} from "../Common/tokenHooks.js";
import {setBandId} from "../Redux/store.js";
import {jwtDecode} from "jwt-decode";
import {useDispatch} from "react-redux";

const validationSchema = Yup.object({
    email: Yup.string().email('Неверный формат email').required('Введите почту'),
    password: Yup.string().required('Введите пароль'),
});


function LoginComponent() {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            console.log('Логин:', values);
            try {
                const { data } = await axios.post('http://localhost:8080/auth/signin', {
                    email: values.email,
                    password: values.password,
                });
                console.log('Успешный логин, данные:', data);

                const expiresInDays = Math.ceil(data.accessExpiresAt / (60 * 60 * 24));
                Cookies.set('accessToken', data.accessToken, {
                    expires: expiresInDays,
                    secure: true,
                    sameSite: 'Strict',
                });

                Cookies.set('refreshToken', data.refreshToken, {
                    expires: expiresInDays,
                    secure: true,
                    sameSite: 'Strict',
                });

                Cookies.set('userEmail', data.email, {
                    expires: expiresInDays,
                    secure: true,
                    sameSite: 'Strict',
                });

                const tokenFromCookie = Cookies.get('accessToken');
                const refreshFromCookie = Cookies.get('refreshToken');
                const emailFromCookie = Cookies.get('userEmail');

                console.log('Access Token из куки:', tokenFromCookie);
                console.log('Refresh Token из куки:', refreshFromCookie);
                console.log('Email из куки:', emailFromCookie);

                console.log('Полные данные ответа:', {
                    accessToken: tokenFromCookie,
                    accessExpiresAt: data.accessExpiresAt,  // 86400 (в секундах)
                    refreshToken: refreshFromCookie,
                    email: emailFromCookie,
                });

                const decodedToken = jwtDecode(tokenFromCookie);
                const bandId = decodedToken?.bandId;
                console.log('Декодирован в логине bandId: ', bandId)
                dispatch(setBandId(bandId));

                navigate("/home");
            } catch (error) {
                if (error.response) {
                    showSnackbar({
                        type: 'error',
                        text: error.response.data?.message || 'Ошибка логина',
                        errcode: error.response.status,
                    });
                } else {
                    showSnackbar({
                        type: 'error',
                        errcode: 'NETWORK',
                        text: error.message || 'Ошибка сети',
                    });
                }
            } finally {
                setSubmitting(false);
            }
        },
    });


    const {
        open,
        snackbar,
        showSnackbar,
        hideSnackbar,
    } = useSnackbar();

    return(
        <Box
            display="flex"
            gap={1}
            justifyContent="center"
            width="100vw"
            height="100vh"
            sx={{ placeItems: 'center' }}
        >
            <Paper
                elevation={5}
                sx={{
                    width: '20%',
                    height: '42%',
                    alignItems: 'center',
                    p: 5,
                }}
            >
                <Stack spacing={2}>
                    <Link
                        underline="hover"
                        onClick={() => navigate('/welcome')}
                    >
                        На главную
                    </Link>
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{
                            textAlign: 'center',
                            marginBottom: '10%',
                        }}>
                        Логин
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                        {['email', 'password'].map((fieldName) => {
                            const hasError = formik.touched[fieldName] && Boolean(formik.errors[fieldName]);
                            const fieldProps = {
                                fullWidth: true,
                                size: 'small',
                                label: fieldName === 'email' ? 'Почта' : 'Пароль',
                                name: fieldName,
                                type: fieldName === 'password' ? 'password' : 'text',
                                value: formik.values[fieldName],
                                onChange: formik.handleChange,
                                onFocus: () => formik.setFieldError(fieldName, ''),
                                onBlur: formik.handleBlur,
                                error: hasError,
                                helperText: formik.touched[fieldName] ? formik.errors[fieldName] || ' ' : ' ',
                            };

                            return (
                                <TextField
                                    key={fieldName}
                                    sx={fieldName === 'password' ? { marginTop: '3%' } : {}}
                                    {...fieldProps}
                                />
                            );
                        })}

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: '3%', mb:'5%' }}>
                            <Link
                                underline="hover"
                                sx={{ fontSize: '0.9rem', cursor: 'pointer' }}
                                onClick={()=> navigate('/password-reset', { state: { fromLogin: true } })}
                            >
                                Забыли пароль?
                            </Link>
                        </Box>

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={formik.isSubmitting}
                        >
                            Войти
                        </Button>
                    </form>
                </Stack>
            </Paper>
            <StatusSnackbar
                open={open}
                snackbar={snackbar}
                onClose={hideSnackbar}
            ></StatusSnackbar>
        </Box>
    );
}

export default LoginComponent