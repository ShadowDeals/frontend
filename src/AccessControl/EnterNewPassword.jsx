import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Box, Button, TextField, Typography, Stack, Paper} from '@mui/material';
import {useSnackbar} from "../Common/useSnackbar.js";
import StatusSnackbar from "../Common/StatusSnackbar.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {API_BASE} from "../baseUrl.js";

const validationSchema = Yup.object({
    password: Yup.string()
        .min(6, 'Пароль должен содержать минимум 6 символов')
        .required('Обязательное поле'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
        .required('Обязательное поле'),
});

const EnterNewPassword = ({onSubmit}) => {
    const {
        open,
        snackbar,
        showSnackbar,
        hideSnackbar
    } = useSnackbar();
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const changePasswordCode = searchParams.get('code');
    const email = searchParams.get('email');

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await axios.put(`${API_BASE}/api/auth/change/password`, {
                    email,
                    newPassword: values.password,
                    changePasswordCode,
                });
                console.log('response: ', response.data, response.data.errorCode);
                showSnackbar({ type: 'success', text: 'Пароль успешно изменён' });
                navigate('/login');
            } catch (error) {
                const message = error?.response?.data?.message || 'Ошибка при смене пароля';
                showSnackbar({ type: 'error', text: message });
            } finally {
                setSubmitting(false);
            }
        },
    });

    const fields = [
        {
            name: 'password',
            label: 'Пароль',
        },
        {
            name: 'confirmPassword',
            label: 'Подтверждение пароля',
        },
    ];

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100vw"
            height="100vh"
            component="form"
            onSubmit={formik.handleSubmit}
        >
            <Paper elevation={5} sx={{
                width: { xs: '90%', sm: '400px', md: '400px' },
                p: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}>
                <Stack spacing={2}>
                    <Typography variant="h6" textAlign="center">Введите новый пароль</Typography>

                    {fields.map(({ name, label }) => (
                        <TextField
                            key={name}
                            fullWidth
                            label={label}
                            name={name}
                            type="password"
                            size="small"
                            value={formik.values[name]}
                            onChange={formik.handleChange}
                            onFocus={() => {
                                formik.setFieldError(name, undefined);
                                formik.setFieldTouched(name, false, false);
                            }}
                            onBlur={formik.handleBlur}
                            error={formik.touched[name] && Boolean(formik.errors[name])}
                            helperText={formik.touched[name] ? (formik.errors[name] || ' ') : ' '}
                        />
                    ))}

                    <Button type="submit" variant="contained" color="primary">
                        Сохранить
                    </Button>
                </Stack>
            </Paper>
            <StatusSnackbar open={open} onClose={hideSnackbar} snackbar={snackbar}/>
        </Box>
    );
};

export default EnterNewPassword;
