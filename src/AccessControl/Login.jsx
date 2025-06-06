import { useNavigate } from 'react-router-dom';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Link, Stack, Button,
} from "@mui/material";
import Cookies from 'js-cookie';

import {Formik, useFormik} from 'formik';
import * as Yup from 'yup';
import axios from "axios";

const validationSchema = Yup.object({
    email: Yup.string().email('Неверный формат email').required('Введите почту'),
    password: Yup.string().required('Введите пароль'),
});


function LoginComponent() {
    const navigate = useNavigate();

    const navigatePasswordReset = () => {
        navigate('/password-reset', { state: { fromLogin: true } });
    };

    const navigateWelcome = () => {
        navigate('/welcome');
    };

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

                Cookies.set('accessToken', data.accessToken, {
                    expires: 7,
                    secure: true,
                    sameSite: 'Strict',
                });

                const tokenFromCookie = Cookies.get('accessToken');
                console.log('Токен из куки:', tokenFromCookie);

                navigate("/home");
            } catch (error) {
                if (error.response) {
                    console.error('Ошибка логина:', error.response.data.message || 'Неизвестная ошибка');
                } else {
                    console.error('Ошибка сети или сервера:', error.message);
                }
            } finally {
                setSubmitting(false);
            }
        },
    });

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
                        onClick={navigateWelcome}
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
                                onClick={navigatePasswordReset}
                            >
                                Забыли пароль?
                            </Link>
                        </Box>

                        <Button
                            type="submit"
                            variant="outlined"
                            fullWidth
                            disabled={formik.isSubmitting}
                        >
                            Войти
                        </Button>
                    </form>
                </Stack>
            </Paper>
        </Box>
    );
}

export default LoginComponent