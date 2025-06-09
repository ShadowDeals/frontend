import { useState, useCallback } from 'react';

export function useSnackbar() {
    const [open, setOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({ type: 'info', text: '', errcode: null });

    const showSnackbar = useCallback(({ type = 'info', errcode = null, text }) => {
        setSnackbar({ type, errcode, text });
        setOpen(true);
    }, []);

    const hideSnackbar = useCallback(() => {
        setOpen(false);
    }, []);

    return {
        open,
        snackbar,
        showSnackbar,
        hideSnackbar,
    };
}
