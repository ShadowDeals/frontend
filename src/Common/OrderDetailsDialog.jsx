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
import {formatDate, taskTypeLabels} from "./Cards.jsx";

export default function OrderDetailsDialog({ open, onClose, taskInfo }) {
    if (!taskInfo) return null;

    return (
        <Dialog
            slotProps={{
                paper: {
                    sx: {
                        width: '80%',
                        minHeight:'30%',
                        maxHeight: '40%',
                    },
                },
            }}
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>Детали заказа: {taskTypeLabels[taskInfo.taskType] || taskInfo.taskType}</DialogTitle>
            <DialogContent dividers>
                <Stack spacing={1}>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                        ID: {taskInfo.taskId}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: 14 }} component="div">
                        Адрес: {taskInfo.address}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: 14 }} component="div">
                        Описание: {taskInfo.description}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: 14 }} variant="body1">
                        Дата заявки: {formatDate(taskInfo.dateCreated)}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: 14 }} component="div">
                        Статус: {taskInfo.taskStatus}
                    </Typography>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={onClose} color="primary">
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    );
}
