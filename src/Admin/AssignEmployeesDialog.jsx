import * as React from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Stack, Radio, FormControlLabel, Typography, Alert
} from '@mui/material';
import ColorSwitchableButton from "../CommonComponents/Buttons.jsx";

export default function AssignEmployeesDialog({ open, onClose, employees, onSave }) {
    const MAX_SELECTION = 5;

    const [selectedExecutorIds, setSelectedExecutorIds] = React.useState([]);
    const [mainExecutorId, setMainExecutorId] = React.useState(null);

    React.useEffect(() => {
        if (!open) {
            setSelectedExecutorIds([]);
            setMainExecutorId(null);
        }
    }, [open]);

    const handleSelectChange = (event) => {
        const options = Array.from(event.target.options);
        const selectedIds = options
            .filter(option => option.selected)
            .map(option => Number(option.value));

        if (selectedIds.length > MAX_SELECTION) {
            return;
        }

        setSelectedExecutorIds(selectedIds);

        if (!selectedIds.includes(mainExecutorId)) {
            setMainExecutorId(null);
        }
    };

    const handleSelectMain = (id) => {
        setMainExecutorId(id);
        if (!selectedExecutorIds.includes(id)) {
            setSelectedExecutorIds(prev => [...prev, id]);
        }
    };

    const handleSave = () => {
        onSave(selectedExecutorIds, mainExecutorId);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle
            sx ={{bgcolor:'black'}}
            >
                Назначение исполнителей
            </DialogTitle>
            <DialogContent dividers
                           sx ={{bgcolor:'black'}}
            >
                <Typography variant="body2" mb={1}>
                    Выберите исполнителей (Ctrl+Click для множественного выбора, не больше {MAX_SELECTION}):
                </Typography>
                <select
                    multiple
                    size={8}
                    style={{ width: '100%', padding: 8, fontSize: 16 }}
                    value={selectedExecutorIds.map(String)}
                    onChange={handleSelectChange}
                >
                    {employees.map(({ id, name }) => {
                        const disabled = !selectedExecutorIds.includes(id) && selectedExecutorIds.length >= MAX_SELECTION;
                        return (
                            <option key={id} value={id} disabled={disabled}>
                                {name}
                            </option>
                        );
                    })}
                </select>

                {selectedExecutorIds.length > 0 && (
                    <>
                        <Typography variant="body2" mt={2} mb={1}>
                            Выберите главного исполнителя:
                        </Typography>
                        <Stack spacing={1}>
                            {selectedExecutorIds.map(id => {
                                const employee = employees.find(e => e.id === id);
                                return (
                                    <FormControlLabel
                                        key={id}
                                        control={
                                            <Radio
                                                checked={mainExecutorId === id}
                                                onChange={() => handleSelectMain(id)}
                                            />
                                        }
                                        label={employee?.name || 'Неизвестный'}
                                    />
                                );
                            })}
                        </Stack>
                    </>
                )}

                {selectedExecutorIds.length === 0 && (
                    <Typography color="error" mt={2}>
                        Пожалуйста, выберите хотя бы одного исполнителя.
                    </Typography>
                )}
                {selectedExecutorIds.length > 0 && !mainExecutorId && (
                    <Typography color="error" mt={2}>
                        Пожалуйста, выберите главного исполнителя.
                    </Typography>
                )}
            </DialogContent>
            <DialogActions
                sx ={{bgcolor:'black'}}
            >
                <ColorSwitchableButton
                    onClick={onClose}>Отмена
                </ColorSwitchableButton>
                <ColorSwitchableButton
                    onClick={handleSave}
                    disabled={selectedExecutorIds.length === 0 || !mainExecutorId}
                    sx={{
                        '&.Mui-disabled': {
                            backgroundColor: '#000000',
                            color: '#000000',
                        },
                    }}
                    variant="contained"
                >
                    Сохранить
                </ColorSwitchableButton>
            </DialogActions>
        </Dialog>
    );
}
