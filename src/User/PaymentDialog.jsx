import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from '@mui/material';

export default function PaymentDialog({ open, onClose, onSubmit, taskInfo }) {
    console.log('[PaymentDialog] taskInfo =', taskInfo, '| typeof =', typeof taskInfo);
    const handlePayClick = () => {
        if (onSubmit) {
            onSubmit(taskInfo);
        }
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Оплата задания</DialogTitle>
            <DialogContent>
                <Typography>
                    Заказ: {taskInfo?.taskId}
                </Typography>
                {/* Можно добавить любую дополнительную информацию по задаче */}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отмена</Button>
                <Button variant="contained" color="primary" onClick={handlePayClick}>
                    Оплатить
                </Button>
            </DialogActions>
        </Dialog>
    );
}
