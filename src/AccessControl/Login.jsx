import { useNavigate } from 'react-router-dom';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Link,
} from "@mui/material";
import ColorSwitchableButton from "../CommonComponents/Buttons.jsx";
import Cookies from 'js-cookie';

import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";

import { useDispatch } from 'react-redux';
import { setCredentials } from '../Redux/store.js';


const validationSchema = Yup.object({
    email: Yup.string().email('Неверный формат email').required('Введите почту'),
    password: Yup.string().required('Введите пароль'),
});

function LoginForm({ navigatePasswordReset }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
                console.log('Логин:', values);

                try {
                    const { data } = await axios.post('http://localhost:8080/auth/signin', {
                        email: values.email,
                        password: values.password,
                    });
                    console.log('Успешный логин, данные:', data);
                    dispatch(setCredentials({
                        accessToken: data.accessToken,
                        accessExpiresAt: data.accessExpiresAt,
                        email: data.email,
                        refreshToken: data.refreshToken,
                    }));

                    Cookies.set('accessToken', data.accessToken, {
                        expires: 7,
                        secure: true,
                        sameSite: 'Strict',
                    });

                    const tokenFromCookie = Cookies.get('accessToken');
                    console.log('Токен из куки:', tokenFromCookie);

                    navigate("/home")
                } catch (error) {
                    if (error.response) {
                        console.error('Ошибка логина:', error.response.data.message || 'Неизвестная ошибка');
                    } else {
                        console.error('Ошибка сети или сервера:', error.message);
                    }
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
              }) => (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                    <StyledTextField
                        fullWidth
                        size="small"
                        label="Почта"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                    />

                    <StyledTextField
                        sx={{ marginTop: '3%' }}
                        size="small"
                        fullWidth
                        label="Пароль"
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                    />

                    <Link
                        underline="hover"
                        sx={{
                            marginTop: '3%',
                            alignSelf: 'flex-end',
                            cursor: 'pointer',
                            color: 'black',
                            fontSize: '0.9rem',
                        }}
                        onClick={navigatePasswordReset}
                    >
                        Забыли пароль?
                    </Link>

                    <ColorSwitchableButton
                        type="submit"
                        fullWidth
                        sx={{ marginTop: '10%' }}
                        disabled={isSubmitting}
                    >
                        Войти
                    </ColorSwitchableButton>
                </form>
            )}
        </Formik>
    );
}

export function StyledTextField({ sx, ...props }) {
    return (
        <TextField
            sx={{
                width: '100%',
                '& .MuiInputLabel-root': {
                    color: 'black',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: 'black',
                },
                '& .MuiInputLabel-root.Mui-error': {
                    color: 'red',
                },
                '& .MuiFormHelperText-root': {
                    color: 'black',
                },
                '& .MuiFormHelperText-root.Mui-error': {
                    color: 'red',
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: 'black',
                    },
                    '&:hover fieldset': {
                        borderColor: 'black',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: 'black',
                    },
                    '&.Mui-error fieldset': {
                        borderColor: 'red',
                    },
                    '&.Mui-focused:not(:hover) fieldset': {
                        borderColor: 'black',
                    },
                },
                ...sx,
            }}
            {...props}
        />
    );
}


function LoginComponent() {
    const navigate = useNavigate();

    const navigatePasswordReset = () => {
        navigate('/password-reset', { state: { fromLogin: true } });
    };

    const navigateWelcome = () => {
        navigate('/welcome');
    };

    return(
        <Box
            display="flex"
            alignItems="flex-end"
            gap={1}
            justifyContent="center"
            width="100vw"
            height="100vh"
            sx={{ bgcolor: 'black', placeItems: 'center' }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: '20vw',
                    height: '45vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 5,
                    bgcolor: '#990000',
                    color: 'black',
                    justifyContent: 'flex-start'
                }}
            >
                <Link
                    underline="hover"
                    sx={{
                        alignSelf: 'flex-start',
                        cursor: 'pointer',
                        color: 'black',
                        fontSize: '0.9rem',
                        marginBottom: '5%',
                    }}
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
                <LoginForm navigatePasswordReset={navigatePasswordReset}></LoginForm>
            </Paper>
        </Box>
    );
}

export default LoginComponent