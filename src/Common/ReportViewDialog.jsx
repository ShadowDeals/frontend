import {
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Stack,
    Box
} from '@mui/material';
import { useTaskReport } from './useTaskReport.js';

function ReportViewDialog({ open, onClose, taskInfo }) {
    const { report, loading, error } = useTaskReport(taskInfo?.taskId);

    const statusValue =
        report?.taskStatus === 'FINISHED'
            ? 'success'
            : report?.taskStatus === 'FAILED'
                ? 'failed'
                : '';

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Просмотр отчёта</DialogTitle>
            <DialogContent dividers>
                {loading ? (
                    <Typography>Загрузка...</Typography>
                ) : error ? (
                    <Typography color="error" textAlign={'center'}>Ошибка загрузки отчёта</Typography>
                ) : report ? (
                    <>
                        {statusValue !== '' && (
                            <FormControl component="fieldset" fullWidth disabled={false}>
                                <FormLabel component="legend">Статус</FormLabel>
                                <RadioGroup
                                    row
                                    name="status"
                                    value={statusValue}
                                    sx={{ justifyContent: 'center', display: 'flex' }}
                                >
                                    <FormControlLabel
                                        value="success"
                                        control={
                                            <Radio
                                                sx={{
                                                    color: statusValue === 'success' ? 'green' : 'text.disabled',
                                                    '&.Mui-checked': {
                                                        color: 'green',
                                                    },
                                                }}
                                            />
                                        }
                                        label={
                                            <Typography
                                                sx={{
                                                    color: statusValue === 'success' ? 'green' : 'text.disabled',
                                                }}
                                            >
                                                Успешно
                                            </Typography>
                                        }
                                    />
                                    <FormControlLabel
                                        value="failed"
                                        control={
                                            <Radio
                                                sx={{
                                                    color: statusValue === 'failed' ? 'red' : 'text.disabled',
                                                    '&.Mui-checked': {
                                                        color: 'red',
                                                    },
                                                }}
                                            />
                                        }
                                        label={
                                            <Typography
                                                sx={{
                                                    color: statusValue === 'failed' ? 'red' : 'text.disabled',
                                                }}
                                            >
                                                Провалено
                                            </Typography>
                                        }
                                    />
                                </RadioGroup>
                            </FormControl>
                        )}

                        <Stack spacing={2} mt={2} alignItems="center">
                            <Box width="100%">
                                <Typography variant="subtitle2" color="text.secondary">
                                    Затраченное время (часы)
                                </Typography>
                                <Typography variant="body1" textAlign="center">
                                    {report.timeSpent ?? '-'}
                                </Typography>
                            </Box>

                            <Box width="100%">
                                <Typography variant="subtitle2" color="text.secondary">
                                    Краткое описание
                                </Typography>
                                <Typography
                                    variant="body1"
                                    textAlign="center"
                                >
                                    {report.description || '-'}
                                </Typography>
                            </Box>
                        </Stack>

                    </>
                ) : (
                    <Typography>Нет отчёта по задаче</Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Закрыть</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ReportViewDialog;
