import ColorSwitchableButton from '../CommonComponents/Buttons.jsx'
import {
    Box,
    Button,
    Stack,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions, TextField
} from '@mui/material';
import React, { useState } from 'react';
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
            <DialogTitle>
                Введите пароль
            </DialogTitle>
            <DialogContent>
                <form onSubmit={formik.handleSubmit} id="password-form">
                    <TextField
                        sx={{
                            '& input': {
                                color: 'black',
                            },
                        }}
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
            <DialogActions >
                <Button
                    variant='contained'
                    onClick={() => {
                    formik.resetForm();
                    onClose();
                }}>
                    Отмена
                </Button>
                <Button
                    type="submit"
                    variant='contained'
                    form="password-form"
                    disabled={!formik.isValid || !formik.dirty}
                >
                    Подтвердить
                </Button>
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
            height="100%"
            width="100%"
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
                    onClick={handleOpenDialog}
                    sx={{
                        fontSize: '1.5rem',
                        padding: '1rem 3rem',
                        bgcolor: isLocked ? '#009900' : '#990000'
                    }}
                >
                    {isLocked ? 'Разблокировать БД' : 'Блокировать БД'}
                </Button>
            </Stack>
            <PasswordDialog
                sx = {{bgcolor:'black'}}
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onConfirm={handleConfirm}
            />
        </Box>
    );
}

