import React, { useState } from 'react';
import {
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';

function ReportDialog({ open, onClose, onSubmit }) {
    const [status, setStatus] = useState('success');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!description.trim()) {
            alert('Пожалуйста, введите краткое описание');
            return;
        }
        onSubmit({ status, description });
        setDescription('');
        onClose();
    };

    const handleClose = () => {
        console.log('handleClose call')
        setDescription('');
        setStatus('success');
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Отчитаться о выполнении</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent dividers>
                    <FormControl component="fieldset" fullWidth>
                        <FormLabel component="legend">Статус</FormLabel>
                        <RadioGroup
                            row
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            name="status"
                        >
                            <FormControlLabel value="success" control={<Radio />} label="Успешно" />
                            <FormControlLabel value="failed" control={<Radio />} label="Провалено" />
                        </RadioGroup>
                    </FormControl>

                    <TextField
                        label="Краткое описание"
                        multiline
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Отмена</Button>
                    <Button type="submit" variant="contained">
                        Отправить
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default ReportDialog;
