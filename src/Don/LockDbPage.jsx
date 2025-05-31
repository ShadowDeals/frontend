import ColorSwitchableButton from '../CommonComponents/Buttons.jsx'
import {Box,
    Button,
    Stack,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import React, { useState } from 'react';
import {StyledTextField} from "../AccessControl/Login.jsx";
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';

const PasswordSchema = Yup.object().shape({
    password: Yup.string()
        .required('Пароль обязателен')
        .min(4, 'Минимум 4 символа'),
});

export function PasswordDialog({ open, onClose, onConfirm }) {
    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validationSchema: PasswordSchema,
        onSubmit: (values) => {
            onConfirm(values.password);
            formik.resetForm();
        },
    });

    return (
        <Dialog open={open} onClose={onClose} sx={{ bgcolor: 'black' }}>
            <DialogTitle sx={{ color: 'black', bgcolor: '#990000' }}>
                Введите пароль
            </DialogTitle>
            <DialogContent sx={{ bgcolor: '#990000', color: 'black' }}>
                <form onSubmit={formik.handleSubmit} id="password-form">
                    <StyledTextField
                        autoFocus
                        margin="dense"
                        label="Пароль"
                        type="password"
                        fullWidth
                        variant="outlined"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={Boolean(formik.touched.password && formik.errors.password && formik.values.password !== '')}
                        helperText={formik.touched.password && formik.values.password !== '' ? formik.errors.password : ' '}
                    />
                </form>
            </DialogContent>
            <DialogActions sx={{ color: '#990000', bgcolor: '#990000' }}>
                <ColorSwitchableButton onClick={() => {
                    formik.resetForm();
                    onClose();
                }}>
                    Отмена
                </ColorSwitchableButton>
                <ColorSwitchableButton
                    type="submit"
                    form="password-form"
                    sx={{
                        bgcolor: 'black',
                        color: '#990000',
                        '&.Mui-disabled': {
                            bgcolor: '#990000',
                            color: '#990000',
                        },
                    }}
                    disabled={!formik.isValid || !formik.dirty}
                >
                    Подтвердить
                </ColorSwitchableButton>
            </DialogActions>
        </Dialog>
    );
}

export function LockDatabaseComponent() {
    const [isLocked, setIsLocked] = useState(false);

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleConfirm = (password) => {
        console.log(`Пароль введён: ${password}`);
        setIsLocked(prev => !prev);
        setDialogOpen(false);
    };
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            width="100vw"
            bgcolor="black"
        >
            <Stack spacing={10}>
                <Typography
                    variant="h4"
                    color={isLocked ? 'error.main' : 'success.main'}
                    gutterBottom
                >
                    Статус: {isLocked ? 'Блокирована' : 'Разблокирована'}
                </Typography>

                <Button
                    variant="contained"
                    color={isLocked ? 'success' : 'error'}
                    onClick={handleOpenDialog}
                    sx={{
                        fontSize: '1.5rem',
                        padding: '1rem 3rem',
                        color: 'black',
                    }}
                >
                    {isLocked ? 'Разблокировать БД' : 'Блокировать БД'}
                </Button>
            </Stack>
            <PasswordDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onConfirm={handleConfirm}
            />
        </Box>
    );
}

