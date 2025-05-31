import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button,
    Stack
} from '@mui/material';

export default function OrderDetailsDialog({ open, onClose, order }) {
    if (!order) return null;

    return (
        <Dialog slotProps={{
            paper: {
                sx: {
                    width:'80%',
                    height:'60%',
                }
            }}}
                open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Детали заказа</DialogTitle>
            <DialogContent dividers>
                <Stack spacing={2}>
                    <Typography variant="body1">
                        <strong>ID заказа:</strong> {order.id}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Отправитель:</strong> {order.sender}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Описание:</strong> {order.description}
                    </Typography>
                    <Typography variant="body1">
                        Доп инфо
                    </Typography>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Закрыть</Button>
            </DialogActions>
        </Dialog>
    );
}
