import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Link,
    Stack,
    TextField,
    Button
} from '@mui/material';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import StatusSnackbar from "../Common/StatusSnackbar.jsx";
import {useSnackbar} from "../Common/useSnackbar.js";
import {EmailResetPasswordConfig} from "./ValidationSchemas.js";
import axios from "axios";

function PasswordResetComponent() {
    const {
        open,
        snackbar,
        showSnackbar,
        hideSnackbar
    } = useSnackbar();
    const [dialogOpen, setDialogOpen] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: EmailResetPasswordConfig.initialValues,
        validationSchema:  EmailResetPasswordConfig.validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post(
                    'http://localhost:8080/auth/change/password/email',
                    { email: values.email }
                );
                console.log('Ответ от сервера: ', response.data);
                // showSnackbar({ type: 'success', text: 'Инструкция отправлена на почту' });
                setDialogOpen(true);
            } catch (error) {
                console.error('Ошибка при отправке письма:', error);
                showSnackbar({ type: 'error', text: error.response?.data?.message || 'Ошибка при отправке письма' });
            }
        },

    });

    if (!location.state?.fromLogin) {
        return <Navigate to="/login" replace />;
    }

    const handleClose = () => {
        setDialogOpen(false);
        navigate('/login');
    };

    const navigateToLogin = () => {
        navigate('/login');
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100vw"
            height="100vh"
        >
            {!dialogOpen && (
                <Paper
                    elevation={5}
                    sx={{
                        width: { xs: '90%', sm: '400px', md: '400px' },
                        minWidth: '300px',
                        p: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                    }}
                >
                    <Stack spacing={2} component="form" onSubmit={formik.handleSubmit}>
                        <Link
                            underline="hover"
                            sx={{
                                alignSelf: 'flex-start',
                                cursor: 'pointer',
                                marginBottom: '5%',
                            }}
                            onClick={navigateToLogin}
                        >
                            Назад
                        </Link>
                        <Typography
                            variant="h6"
                            component="h1"
                            sx={{
                                textAlign: 'center',
                                marginBottom: '10%',
                            }}
                        >
                            Восстановить пароль
                        </Typography>
                        <TextField
                            fullWidth
                            size="small"
                            label="Почта"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            onFocus={() => formik.setFieldError('email', '')}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email ? formik.errors.email || ' ' : ' '}
                        />
                        <Button
                            fullWidth
                            type="submit"
                            variant='contained'
                            sx={{ marginTop: '10%' }}
                            disabled={formik.isSubmitting}
                        >
                            Отправить инструкции
                        </Button>
                    </Stack>
                </Paper>
            )}

            <Dialog
                open={dialogOpen}
                onClose={handleClose}
                aria-labelledby="password-reset-dialog-title"
            >
                <DialogTitle id="password-reset-dialog-title">Запрос принят</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Проверьте почту <strong>{formik.values.email}</strong> — мы отправили вам ссылку для восстановления пароля.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
            <StatusSnackbar open={open} onClose={hideSnackbar} snackbar={snackbar}/>
        </Box>
    );
}

export default PasswordResetComponent;
