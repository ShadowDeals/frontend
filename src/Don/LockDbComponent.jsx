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
import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import {PasswordDbLockConfig} from "../AccessControl/ValidationSchemas.js";
import {useAuthHeaders} from "../Common/tokenHooks.js";
import axios from "axios";
import StatusSnackbar from "../Common/StatusSnackbar.jsx";
import {useSnackbar} from "../Common/useSnackbar.js";

export function PasswordDialog({open, onClose, onConfirm, isLocked, authHeaders, showSnackbar}) {
    const formik = useFormik({
        initialValues: PasswordDbLockConfig.initialValues,
        validationSchema: PasswordDbLockConfig.validationSchema,
        onSubmit: async (values) => {
            if (!authHeaders.Authorization) return;

            const url = 'http://localhost:8080/band/block';
            const config = {
                headers: {
                    ...authHeaders,
                    'Content-Type': 'application/json',
                },
                data: {
                    password: values.password,
                },
            };

            try {
                if (isLocked) {
                    await axios.delete(url, config);
                } else {
                    await axios.post(url, { password: values.password }, { headers: authHeaders });
                }

                onConfirm(values.password);
                formik.resetForm();
                showSnackbar({type: 'success', text: 'Операция успешна!' });
            } catch (error) {
                console.error('Ошибка при блокировке/разблокировке:', error);
                showSnackbar({type: 'error', text: error.message || 'Ошибка работы компонента "Блок БД' });
            }
        },
    });

    return (
        <Dialog open={open} onClose={onClose} sx={{bgcolor: '#F2E6C4'}}>
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
            <DialogActions>
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
    const authHeaders = useAuthHeaders();

    const {
        open,
        snackbar,
        showSnackbar,
        hideSnackbar
    } = useSnackbar();

    useEffect(() => {
        if (!authHeaders.Authorization) return;

        axios.get('http://localhost:8080/band/block',
            {headers: authHeaders})
            .then((res) => {
                if (typeof res.data === 'boolean') {
                    setIsLocked(res.data);
                }
            })
            .catch((error) => {
                console.error('Ошибка при получении статуса блокировки БД:', error);
            });
    }, [authHeaders]);


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
                sx={{bgcolor: '#F2E6C4'}}
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onConfirm={handleConfirm}
                isLocked={isLocked}
                authHeaders={authHeaders}
                showSnackbar={showSnackbar}
            />
            <StatusSnackbar open={open} onClose={hideSnackbar} snackbar={snackbar}/>
        </Box>
    );
}

