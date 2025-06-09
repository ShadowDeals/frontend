import * as React from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Stack, Radio, FormControlLabel, Typography
} from '@mui/material';
import {useEffect, useState} from "react";
import { useFreeExecutors } from "../Common/useFreeExecutors.js";

export default function AssignEmployeesDialog({ open, onClose, onSave }) {
    const MAX_SELECTION = 5;

    const [selectedExecutorIds, setSelectedExecutorIds] = useState([]);
    const [mainExecutorId, setMainExecutorId] = useState(null);

    const freeExecutors = useFreeExecutors();
    // console.log('free executors: ', freeExecutors.executors);

    useEffect(() => {
        if (!open) {
            setSelectedExecutorIds([]);
            setMainExecutorId(null);
        }
    }, [open]);

    const handleSelectChange = (event) => {
        const options = Array.from(event.target.options);
        const selectedIds = options
            .filter(option => option.selected)
            .map(option => option.value);

        if (selectedIds.length > MAX_SELECTION) {
            return;
        }

        setSelectedExecutorIds(selectedIds);

        if (!selectedIds.includes(mainExecutorId)) {
            setMainExecutorId(null);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle
            >
                Назначение исполнителей
            </DialogTitle>
            <DialogContent dividers>
                {freeExecutors.executors.length === 0 ? (
                    <Typography color="text.secondary" fontStyle="italic">
                        Нет свободных исполнителей
                    </Typography>
                ) : (
                    <>
                        <Typography variant="body2" mb={1}>
                            Выберите исполнителей (Ctrl+Click для множественного выбора, не больше {MAX_SELECTION}):
                        </Typography>
                        <select
                            multiple
                            size={8}
                            style={{
                                width: '100%',
                                padding: 8,
                                fontSize: 16,
                                backgroundColor: '#F2E6C4',
                                border: '1px solid #5C3A0E'
                            }}
                            value={selectedExecutorIds.map(String)}
                            onChange={handleSelectChange}
                        >
                            {freeExecutors.executors.map(({ executorId, executorName }) => {
                                const disabled =
                                    !selectedExecutorIds.includes(executorId) &&
                                    selectedExecutorIds.length >= MAX_SELECTION;
                                return (
                                    <option key={executorId} value={executorId} disabled={disabled}>
                                        {executorName}
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
                                        const employee = freeExecutors.executors.find(e => e.executorId === id);
                                        return (
                                            <FormControlLabel
                                                key={id}
                                                control={
                                                    <Radio
                                                        sx={{
                                                            color: '#7a2e00',
                                                            '&.Mui-checked': {
                                                                color: '#d84315',
                                                            },
                                                        }}
                                                        checked={mainExecutorId === id}
                                                        onChange={() => {
                                                            setMainExecutorId(id);
                                                            if (!selectedExecutorIds.includes(id)) {
                                                                setSelectedExecutorIds(prev => [...prev, id]);
                                                            }
                                                        }}
                                                    />
                                                }
                                                label={employee?.executorName || 'Неизвестный'}
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
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={onClose}>Отмена
                </Button>
                <Button
                    onClick={() => {
                        onSave(selectedExecutorIds, mainExecutorId);
                        onClose();
                    }}
                    disabled={selectedExecutorIds.length === 0 || !mainExecutorId}
                    variant="contained"
                >
                    Сохранить
                </Button>
            </DialogActions>
        </Dialog>
    );
}
