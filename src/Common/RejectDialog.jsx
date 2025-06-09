import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Typography,
    TextField
} from '@mui/material';
import { useState, useEffect } from 'react';

export default function RejectDialog({ open, onClose, onSubmit, taskInfo }) {
    const [reason, setReason] = useState('');

    useEffect(() => {
        if (!open) setReason('');
    }, [open]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>Подтверждение</DialogTitle>
            <DialogContent dividers>
                <Typography mb={2}>
                    Вы точно хотите закрыть задание{' '}
                    <strong>{taskInfo?.description || 'это задание'}</strong>?
                </Typography>
                <TextField
                    fullWidth
                    label="Причина закрытия"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    multiline
                    minRows={2}
                    required
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Отмена
                </Button>
                <Button
                    onClick={() => {
                        onSubmit({ reason });
                    }}
                    color="error"
                    variant="contained"
                    disabled={!reason.trim()}
                >
                    Закрыть задание
                </Button>
            </DialogActions>
        </Dialog>
    );
}
