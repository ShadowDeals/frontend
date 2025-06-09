import {
    Box,
    FormControl,
    InputLabel,
    Link,
    Paper,
    Select,
    Stack,
    Typography,
    Checkbox,
    FormControlLabel,
    TextField,
    Button, MenuItem, FormHelperText
} from "@mui/material";

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import { registerFormConfigs } from "./ValidationSchemas.js";
import { v4 as uuidv4 } from 'uuid';
import useRegions from "./useRegions.js";
import ErrorSnackbar from "../Common/ErrorSnackbar.jsx";
import {useErrorSnackbar} from "../Common/useErrorSnackbar.js";



function RegionSelectField({formik, field, gangs, visible}) {
    const showError = formik.touched[field] && Boolean(formik.errors[field]);
    const uniqueId = useMemo(() => uuidv4(), []);

    useEffect(() => {
        if (!visible) {
            formik.setFieldError(field, undefined);
            formik.setFieldTouched(field, false, false);
        }
    }, [visible, field, formik]);

    if (!visible) return null;

    return (
        <FormControl fullWidth size="small" error={showError}>
            <InputLabel id={`${field}-label`}>Выберите регион</InputLabel>
            <Select
                key={field}
                name={field}
                labelId={`${field}-label-${uniqueId}`}
                id={`${field}-select`}
                label="Выберите регион"
                onFocus={() => {
                    formik.setFieldError(field, undefined);
                    formik.setFieldTouched(field, false, false);
                }}
                value={formik.values[field] || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            >
                {gangs.map((region, index) => (
                    <MenuItem key={`${region}-${index}`} value={region}>
                        {region}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>
                {showError ? formik.errors[field] : '\u00A0'}
            </FormHelperText>
        </FormControl>
    );
}

const getRoleLabel = (role) => {
    switch (role) {
        case 'don':
            return 'Дон';
        case 'admin':
            return 'Администратор';
        case 'soldier':
            return 'Солдат';
        case 'user':
            return 'Пользователь';
        default:
            return role;
    }
};

const onRoleChange = (role, setSelectedRole, setFormConfig) => {
    console.log('onRoleChange', role);
    setSelectedRole(role);
    if (role && registerFormConfigs[role]) {
        console.log('выбрана схема: ', registerFormConfigs[role]);
        setFormConfig(registerFormConfigs[role]);
    } else {
        setFormConfig(null);
    }
};

function RegisterComponent() {
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState('');
    const { open, error, showError, hideError } = useErrorSnackbar();

    const [formConfig, setFormConfig] = useState(null);
    const { regionsBandExist, regionsBandNotExist } = useRegions();

    const formik = useFormik({
        initialValues: formConfig ? formConfig.initialValues : {},
        validationSchema: formConfig ? formConfig.validationSchema : null,
        enableReinitialize: true,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const body = {
                    nickname: selectedRole !== 'user' ? null : values.username,
                    firstName: selectedRole !== 'user' ? values.name : null,
                    lastName: selectedRole !== 'user' ? values.surname : null,
                    password: values.password,
                    role: selectedRole.toUpperCase(),
                    region:
                        selectedRole === 'don'
                            ? values.region || null
                            : values.specifyRegion
                                ? values.region || null
                                : null,
                    email: values.email,
                };

                console.log('Request body:', body);

                const res = await fetch('http://localhost:8080/auth/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                });

                if (res.ok) {
                    navigate('/check-email', { state: { email: values.email } });
                } else {
                    const errorData = await res.json();
                    showError({ errcode: res.status, text: errorData.message || 'Ошибка регистрации' });
                }
            } catch (err) {
                showError({ errcode: 'network', text: err.message || err.toString() });
            } finally {
                setSubmitting(false);
            }
        },
    });

    console.log('exist:', regionsBandExist);
    console.log('not exist:', regionsBandNotExist);

    function renderField(field) {
        if (field === 'specifyRegion' && selectedRole !== 'don') {
            return (
                <FormControlLabel
                    key={field}
                    control={
                        <Checkbox
                            name={field}
                            checked={!!formik.values[field]}
                            onChange={(e) => formik.setFieldValue(field, e.target.checked)}
                        />
                    }
                    label="Указать регион"
                />
            );
        }

        if (field === 'region') {
            if (selectedRole === 'don') {
                return <RegionSelectField
                    formik={formik}
                    field={field}
                    gangs={regionsBandNotExist}
                    visible={true}
                />
            }

            if (!formik.values.specifyRegion) return null;

            return <RegionSelectField formik={formik}
                                      field={field}
                                      gangs={regionsBandExist}
                                      visible={formik.values.specifyRegion}
            />
        }

        let label = field;
        if (field === 'username') label = 'Никнейм';
        else if (field === 'surname') label = 'Фамилия';
        else if (field === 'name') label = 'Имя';
        else if (field === 'email') label = 'Email';
        else if (field.toLowerCase().includes('password')) {
            label = field === 'passwordConfirm' ? 'Подтверждение пароля' : 'Пароль';
        }

        const type = field.toLowerCase().includes('password') ? 'password' : 'text';

        return (
            <TextField
                key={field}
                fullWidth
                size="small"
                type={type}
                label={label}
                name={field}
                value={formik.values[field] || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onFocus={() => {
                    formik.setFieldError(field, undefined);
                    formik.setFieldTouched(field, false, false);
                }}
                error={formik.touched[field] && Boolean(formik.errors[field])}
                helperText={formik.touched[field] && formik.errors[field] ? formik.errors[field] : ' '}
            />
        );
    }

    console.log('selected role: ', selectedRole);
    return (
        <Box
            display="flex"
            alignItems="center"
            gap={1}
            justifyContent="center"
            width="100vw"
            height="100vh"
            sx={{ placeItems: 'center' }}
        >
            <Paper elevation={5} sx={{ width: 400, padding: 3 }}>
                <Stack spacing={2}>
                    <Link
                        underline="hover"
                        sx={{ cursor: 'pointer', alignSelf: 'flex-start' }}
                        onClick={() => navigate('/welcome')}
                    >
                        На главную
                    </Link>

                    <Typography variant="h4" component="h1" sx={{ textAlign: 'center' }}>
                        Регистрация
                    </Typography>
                    <FormControl>
                        <InputLabel id={`role-label`}>Выберите роль</InputLabel>
                        <Select
                            variant="outlined"
                            size="sm"
                            labelId={`role-label`}
                            id={`role-select`}
                            label="Выберите роль"
                            style={{ width: '100%' }}
                            value={selectedRole}
                            onChange={(e) => onRoleChange(e.target.value, setSelectedRole, setFormConfig)}
                        >
                            {(regionsBandExist.length === 0
                                    ? ['don']
                                    : [
                                        ...(regionsBandNotExist.length > 0 ? ['don'] : []),
                                        'admin',
                                        'soldier',
                                        'user'
                                    ]
                            ).map((role) => (
                                <MenuItem key={role} value={role}>
                                    {getRoleLabel(role)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {formConfig && (
                        <form onSubmit={formik.handleSubmit}>
                            {Object.keys(formConfig.initialValues).map((field) => (
                                <Box key={field}>
                                    {renderField(field)}
                                </Box>
                            ))}

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={formik.isSubmitting}
                            >
                                Зарегистрироваться
                            </Button>
                        </form>
                    )}
                </Stack>
            </Paper>

            <ErrorSnackbar
                open={open}
                error={error}
                onClose={hideError}
            ></ErrorSnackbar>
        </Box>
    );
}


export default RegisterComponent;