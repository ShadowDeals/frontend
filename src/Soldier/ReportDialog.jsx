import React, { useEffect } from 'react';
import { useFormik } from 'formik';
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
    FormHelperText,
} from '@mui/material';

import { reportFormConfig } from '../AccessControl/ValidationSchemas.js';

function ReportDialog({ open, onClose, onSubmit, taskInfo }) {
    const formik = useFormik({
        initialValues: reportFormConfig.initialValues,
        validationSchema: reportFormConfig.validationSchema,
        onSubmit: (reportInfo) => {
            onSubmit({ reportInfo });
            onClose();
        },
    });

    useEffect(() => {
        if (open) {
            formik.resetForm();
        }
    }, [open]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Отчитаться о выполнении</DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent dividers>
                    <FormControl
                        component="fieldset"
                        fullWidth
                        error={formik.touched.status && Boolean(formik.errors.status)}
                    >
                        <FormLabel component="legend">Статус</FormLabel>
                        <RadioGroup
                            row
                            name="status"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <FormControlLabel value="success" control={<Radio />} label="Успешно" />
                            <FormControlLabel value="failed" control={<Radio />} label="Провалено" />
                        </RadioGroup>
                        <FormHelperText>
                            {formik.touched.status && formik.errors.status ? formik.errors.status : ' '}
                        </FormHelperText>
                    </FormControl>
                    <TextField
                        label="Затраченное время (часы)"
                        name="timeSpent"
                        value={formik.values.timeSpent}
                        onBlur={formik.handleBlur}
                        onChange={(e) => formik.handleChange(e)}
                        onFocus={() => {
                            if (formik.errors.timeSpent) {
                                formik.setFieldError('timeSpent', '');
                            }
                        }}
                        fullWidth
                        error={formik.touched.timeSpent && Boolean(formik.errors.timeSpent)}
                        helperText={formik.touched.timeSpent && formik.errors.timeSpent ? formik.errors.timeSpent : ' '}
                    />
                    <TextField
                        label="Краткое описание"
                        multiline
                        rows={3}
                        name="description"
                        value={formik.values.description}
                        onChange={(e) => formik.handleChange(e)}
                        onFocus={() => {
                            if (formik.errors.description) {
                                formik.setFieldError('description', '');
                            }
                        }}
                        fullWidth
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description ? formik.errors.description : ' '}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Отмена</Button>
                    <Button type="submit" variant="contained" disabled={formik.isSubmitting}>
                        Отправить
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default ReportDialog;
