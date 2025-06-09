import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function StatusSnackbar({ open, onClose, snackbar }) {
    const { type = 'info', errcode, text } = snackbar || {};

    return (
        <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={(event, reason) => {
                if (reason === 'clickaway') return;
                onClose();
            }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert
                onClose={(event, reason) => {
                    if (reason === 'clickaway') return;
                    onClose();
                }}
                severity={type}
                sx={{ width: '100%' }}
            >
                {type === 'error' && `Ошибка ${errcode ? errcode + ': ' : ''}`}
                {text}
            </Alert>
        </Snackbar>
    );
}
