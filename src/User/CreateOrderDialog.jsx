import React, {useEffect} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useRegions from "../AccessControl/useRegions.js";
import {taskTypeLabels} from "../Common/Cards.jsx";
import {createTaskFormConfig} from "../AccessControl/ValidationSchemas.js";

const getFieldsConfig = (regions = []) => [
    {
        name: 'address',
        label: 'Адрес',
        type: 'text',
        required: true,
        multiline: false,
        onFocusResetError: true,
    },
    {
        name: 'description',
        label: 'Описание',
        type: 'text',
        multiline: true,
        rows: 3,
        required: true,
        onFocusResetError: true,
    },
    {
        name: 'taskType',
        label: 'Тип задания',
        type: 'select',
        required: true,
        options: Object.entries(taskTypeLabels).map(([value, label]) => ({ value, label })),
        onFocusResetError: true,
    },
    {
        name: 'region',
        label: 'Выберите регион',
        type: 'select',
        required: false,
        options: regions.map(region => ({ value: region, label: region })),
    },
];




export default function CreateOrderDialog({ open, onClose, onSubmit }) {
    const {regionsBandExist} = useRegions();
    console.log('Регионы: ', regionsBandExist);
    const formik = useFormik({
        initialValues: createTaskFormConfig.initialValues,
        validationSchema: createTaskFormConfig.validationSchema,
        onSubmit: (values) => {
            const finalData = {
                ...values,
                region: values.region || null,
                price: null
            };
            onSubmit(finalData);
            onClose();
        },
    });

    useEffect(() => {
        if (open) {
            formik.resetForm();
        }
    }, [open]);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                Создание задания
                <IconButton
                    aria-label="закрыть"
                    onClick={onClose}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                    size="large"
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <form onSubmit={formik.handleSubmit}>
                <DialogContent dividers>
                    {getFieldsConfig(regionsBandExist).map(({ name: field, label, type, multiline, rows, options, onFocusResetError }) => (
                        <TextField
                            key={field}
                            fullWidth
                            size="small"
                            select={type === 'select'}
                            type={type !== 'select' ? type : undefined}
                            label={label}
                            name={field}
                            value={formik.values[field] || ''}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            onFocus={
                                onFocusResetError
                                    ? () => {
                                        formik.setFieldError(field, undefined);
                                        formik.setFieldTouched(field, false, false);
                                    }
                                    : undefined
                            }
                            error={formik.touched[field] && Boolean(formik.errors[field])}
                            helperText={formik.touched[field] && formik.errors[field] ? formik.errors[field] : ' '}
                            margin="normal"
                            multiline={multiline}
                            rows={rows}
                        >
                            {type === 'select' &&
                                options.map(({ value, label }) => (
                                    <MenuItem key={value} value={value}>
                                        {label}
                                    </MenuItem>
                                ))}
                        </TextField>
                    ))}
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose}>Отмена</Button>
                    <Button type="submit" variant="contained">
                        Создать
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
