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
import * as Yup from 'yup';
import ColorSwitchableButton from "../CommonComponents/Buttons.jsx";

function PasswordResetComponent() {
    const [dialogOpen, setDialogOpen] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    if (!location.state?.fromLogin) {
        return <Navigate to="/login" replace />;
    }

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Неверный формат почты').required('Обязательное поле'),
        }),
        onSubmit: () => {
            setDialogOpen(true);
        },
    });

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
                        width: '20%',
                        height: '30%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        p: 5,
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
                            variant='outlined'
                            sx={{ marginTop: '10%' }}
                            disabled={formik.isSubmitting}
                        >
                            Подтвердить
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
                    <ColorSwitchableButton onClick={handleClose} autoFocus>
                        OK
                    </ColorSwitchableButton>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default PasswordResetComponent;
