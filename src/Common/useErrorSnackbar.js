import { useState, useCallback } from 'react';

export function useErrorSnackbar() {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState({ errcode: null, text: '' });

    const showError = useCallback(({ errcode, text }) => {
        setError({ errcode, text });
        setOpen(true);
    }, []);

    const hideError = useCallback(() => {
        setOpen(false);
    }, []);

    return {
        open,
        error,
        showError,
        hideError
    };
}
