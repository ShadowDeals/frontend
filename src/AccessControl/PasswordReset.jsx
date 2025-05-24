import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions, Link
} from '@mui/material';
import {useLocation, Navigate, useNavigate} from 'react-router-dom';
import ColorSwitchableButton from "../CommonComponents/Buttons.jsx";
import { StyledTextField } from "./Login.jsx";

function PasswordResetComponent() {
    const [email, setEmail] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    if (!location.state?.fromLogin) {
        return <Navigate to="/login" replace />;
    }

    const handleSubmit = () => {
        if (email.trim()) {
            setDialogOpen(true);
        }
    };

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
            sx={{ bgcolor: 'black' }}
        >
            {!dialogOpen && (
                <Paper
                    elevation={3}
                    sx={{
                        width: '15vw',
                        height: '28vh',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        p: 5,
                        bgcolor: '#990000',
                        color: 'black',
                        justifyContent: 'flex-start',
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
                        onClick={navigateToLogin}
                    >
                        Назад
                    </Link>
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{
                            textAlign: 'center',
                            marginBottom: '10%',
                        }}
                    >
                        Восстановить пароль
                    </Typography>
                    <StyledTextField
                        fullWidth
                        label="Почта"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <ColorSwitchableButton
                        fullWidth
                        sx={{ marginTop: '10%' }}
                        onClick={handleSubmit}
                    >
                        Подтвердить
                    </ColorSwitchableButton>
                </Paper>
            )}

            <Dialog
                open={dialogOpen}
                onClose={handleClose}
                aria-labelledby="password-reset-dialog-title"
            >
                <DialogTitle
                    id="password-reset-dialog-title"
                    sx = {{backgroundColor:'#990000'}}
                >
                    Запрос принят
                </DialogTitle>
                <DialogContent
                    sx = {{backgroundColor:'#990000'}}
                >
                    <DialogContentText>
                        Проверьте почту  {email} — мы отправили вам ссылку для восстановления пароля.
                    </DialogContentText>
                </DialogContent>
                <DialogActions
                    sx = {{backgroundColor:'#990000'}}
                >
                    <ColorSwitchableButton onClick={handleClose} autoFocus>
                        OK
                    </ColorSwitchableButton>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default PasswordResetComponent;