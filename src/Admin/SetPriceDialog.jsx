import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    InputAdornment,
} from '@mui/material';
import { useFormik } from 'formik';

import { setPriceFormConfig } from "../AccessControl/ValidationSchemas.js";

export default function PriceSetDialog({ open, onClose, onSubmit, taskInfo }) {
    // console.log('Пришло PriceSetDialog', taskInfo);
    const formik = useFormik({
        initialValues: setPriceFormConfig.initialValues,
        validationSchema: setPriceFormConfig.validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            console.log('Price Set dialog before onSubmitCall:', values, 'adn', { price: values.price });
            onSubmit({ price: values.price });
            setSubmitting(false);
            onClose();
        },
    });

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Установить цену</DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Цена, $"
                        name="price"
                        value={formik.values.price || ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        onFocus={() => {
                            formik.setFieldError('price', undefined);
                            formik.setFieldTouched('price', false, false);
                        }}
                        error={formik.touched.price && Boolean(formik.errors.price)}
                        helperText={formik.touched.price && formik.errors.price ? formik.errors.price : ' '}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} disabled={formik.isSubmitting}>
                        Отмена
                    </Button>
                    <Button type="submit" variant="contained" color="primary" disabled={formik.isSubmitting}>
                        Установить
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
