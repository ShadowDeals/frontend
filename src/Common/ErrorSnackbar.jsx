import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function ErrorSnackbar({ open, onClose, error }) {
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
                severity="error"
                sx={{ width: '100%' }}
            >
                Ошибка {error?.errcode}: {error?.text}
            </Alert>
        </Snackbar>
    );
}
