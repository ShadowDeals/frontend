import {
    Box,
    FormControl,
    InputLabel,
    Link,
    MenuItem,
    Paper,
    Select,
    Stack,
    Typography,
    Checkbox,
    FormControlLabel, FormHelperText, Alert, Snackbar
} from "@mui/material";

import ColorSwitchableButton from "../CommonComponents/Buttons.jsx";
import { StyledTextField } from "./Login.jsx";
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {Formik, useFormikContext} from 'formik';
import * as Yup from 'yup';
import {
    getRegisterPaperSx,
    registerSelectMenuItemSx,
    registerSelectSx
} from "../CommonComponents/RegisterStyles.js";
import axios from "axios";

const REGION_MAP = {
    'Василеостровский район': 'VASILEOSTROVKIY_REGION',
    'Выборгский район': 'VIBORGSKY_REGION',
    'Московский район': 'MOSCOW_REGION',
    '': null
};

const userValidationSchema = Yup.object({
    username: Yup.string().required('Введите имя'),
    email: Yup.string().email('Неверный формат email').required('Введите почту'),
    specifyRegion: Yup.boolean(),
    region: Yup.string().when('specifyRegion', {
        is: true,
        then: (schema) => schema.required('Выберите регион'),
        otherwise: (schema) => schema.notRequired()
    }),
    password: Yup.string().min(6, 'Минимум 6 символов').required('Введите пароль'),
    passwordConfirm: Yup.string()
        .required('Подтвердите пароль').test(
            'passwords-match',
            'Пароли должны совпадать',
            function (value) {
                const { password } = this.parent;
                if (!password && !value) return false;
                return password === value;
            }
        )
});

const administratorSoldierValidationSchema = Yup.object({
    surname: Yup.string().required('Обязательно'),
    name: Yup.string().required('Обязательно'),
    email: Yup.string().email('Неверный формат email').required('Введите почту'),
    specifyRegion: Yup.boolean(),
    region: Yup.string().when('specifyRegion', {
        is: true,
        then: (schema) => schema.required('Выберите регион'),
        otherwise: (schema) => schema.notRequired()
    }),
    password: Yup.string().min(6, 'Минимум 6 символов').required('Введите пароль'),
    passwordConfirm: Yup.string()
        .required('Подтвердите пароль').test(
            'passwords-match',
            'Пароли должны совпадать',
            function (value) {
                const { password } = this.parent;
                if (!password && !value) return false;
                return password === value;
            }
        )
});

const donValidationSchema = Yup.object({
    surname: Yup.string().required('Обязательно'),
    name: Yup.string().required('Обязательно'),
    region: Yup.string().required('Выберите регион'),
    email: Yup.string().email('Неверный формат email').required('Введите почту'),
    password: Yup.string().min(6, 'Минимум 6 символов').required('Введите пароль'),
    passwordConfirm: Yup.string()
        .required('Подтвердите пароль').test(
            'passwords-match',
            'Пароли должны совпадать',
            function (value) {
                const { password } = this.parent;
                if (!password && !value) return false;
                return password === value;
            }
        )
});

function OptionalRegionChoosingComponent() {
    const { values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
        setFieldTouched,
        setFieldError } = useFormikContext();
    const [specReg, setSpecReg] = useState(false);
    return (
        <Box>
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2} sx={{marginTop:'3%'}}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={specReg}
                            onChange={(e) => {
                                const checked= e.target.checked;
                                setSpecReg(checked)
                                setFieldValue('specifyRegion', checked);
                                if (!checked) {
                                    setFieldValue('region', '');
                                }
                                setFieldTouched('region', false);
                                setFieldError('region', undefined);
                            }}
                            sx={{
                                color: 'black',
                                '&.Mui-checked': {
                                    color: 'black',
                                },
                            }}
                        />
                    }
                    label="Указать регион"
                    sx={{ color: 'black' }}
                />
                {specReg && (
                    <RegionSelect
                        name="region"
                        values={values}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isBandExist={true}
                        error={values.specifyRegion && touched.region && Boolean(errors.region)}
                        helperText={values.specifyRegion && touched.region && errors.region}
                        sx={{ width: '100%' }}
                    />
                )}
            </Stack>
        </Box>
    );
}

function EmailPasswordTextFields() {
    const { values,
        errors,
        touched,
        handleChange,
        handleBlur } = useFormikContext();
    return (
        <Box>
            <StyledTextField
                size={'small'}
                fullWidth
                label="Почта"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
            />
            <StyledTextField
                size={'small'}
                fullWidth
                label="Пароль"
                type="password"
                sx={{ marginTop: '3%' }}
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
            />
            <StyledTextField
                size={'small'}
                fullWidth
                label="Подтверждение пароля"
                type="password"
                sx={{ marginTop: '3%' }}
                name="passwordConfirm"
                value={values.passwordConfirm}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.passwordConfirm && Boolean(errors.passwordConfirm)}
                helperText={touched.passwordConfirm && errors.passwordConfirm}
            />
        </Box>
    );
}

function SurnameNameStack() {
    const { values,
        errors,
        touched,
        handleChange,
        handleBlur } = useFormikContext();

    return (
        <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{ marginBottom: '3%', width:'100%' }}
        >
            <StyledTextField
                size={'small'}
                fullWidth
                label="Фамилия"
                name="surname"
                value={values.surname}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.surname && Boolean(errors.surname)}
                helperText={touched.surname && errors.surname}
            />
            <StyledTextField
                size={'small'}
                fullWidth
                label="Имя"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
            />
        </Stack>
    );
}

function UserRegisterForm({onSuccess, onError, role}) {
    return (
        <Formik
            initialValues={{
                username: '',
                email: '',
                specifyRegion: false,
                region: '',
                password: '',
                passwordConfirm: '',
            }}
            validationSchema={userValidationSchema}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    console.log('Отправляем body: ')
                    const body = {
                        nickname: values.surname,
                        firstName: values.name,
                        lastName: values.surname,
                        password: values.password,
                        role:  role,
                        region: REGION_MAP[values.region],
                        email: values.email,
                    };

                    console.log('Отправляем body: ', body)

                    const res = await fetch('http://localhost:8080/auth/signup', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(body),
                    });

                    if (res.ok) {
                        onSuccess(values.email);
                    } else {
                        const errorData = await res.json();
                        onError({ errcode: res.status, text: errorData.message || 'Ошибка регистрации' });
                    }
                } catch (err) {
                    onError({ errcode: 'network', text: err.message || err.toString() });
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <UserRegisterComponent />
                    <OptionalRegionChoosingComponent />
                    <ColorSwitchableButton type="submit" fullWidth sx={{ marginTop: '8%' }}>
                        Зарегистрироваться
                    </ColorSwitchableButton>
                </form>
            )}
        </Formik>
    );
}

function UserRegisterComponent() {
    const { values,
        errors,
        touched,
        handleChange,
        handleBlur } = useFormikContext();
    return (
        <Box>
            <StyledTextField
                name={'username'}
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
                size='small' fullWidth sx={{marginBottom:'3%'}} label="Никнейм" />
            <EmailPasswordTextFields></EmailPasswordTextFields>
        </Box>
    )
}

function AdministratorSoldierRegisterForm({onSuccess, onError, role}) {
    return (
        <Formik
            initialValues={{
                surname: '',
                name: '',
                specifyRegion: false,
                region: '',
                email: '',
                password: '',
                passwordConfirm: '',
            }}
            validationSchema={administratorSoldierValidationSchema}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    console.log('Отправляем body: ')
                    const body = {
                        nickname: values.surname,
                        firstName: values.name,
                        lastName: values.surname,
                        password: values.password,
                        role:  role,
                        region: REGION_MAP[values.region],
                        email: values.email,
                    };

                    console.log('Отправляем body: ', body)

                    const res = await fetch('http://localhost:8080/auth/signup', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(body),
                    });

                    if (res.ok) {
                        onSuccess(values.email);
                    } else {
                        const errorData = await res.json();
                        onError({ errcode: res.status, text: errorData.message || 'Ошибка регистрации' });
                    }
                } catch (err) {
                    onError({ errcode: 'network', text: err.message || err.toString() });
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {formik => (
                <form onSubmit={formik.handleSubmit}>
                    <AdministratorSoldierRegisterComponent/>
                    <OptionalRegionChoosingComponent></OptionalRegionChoosingComponent>
                    <ColorSwitchableButton type="submit" fullWidth sx={{ marginTop: '8%' }}>
                        Зарегистрироваться
                    </ColorSwitchableButton>
                </form>
            )}
        </Formik>
    );
}

function AdministratorSoldierRegisterComponent() {
    return (
        <Box>
            <SurnameNameStack></SurnameNameStack>
            <EmailPasswordTextFields></EmailPasswordTextFields>
        </Box>
    )
}

function DonRegisterComponent() {
    const {values,
        errors,
        touched,
        handleChange,
        handleBlur
    } = useFormikContext();
    return (
        <Box>
            <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
            >
                <SurnameNameStack/>
            </Stack>
            <RegionSelect
                name="region"
                size={'small'}
                sx={{ marginTop: '3%' }}
                isBandExist={false}
            />
            <EmailPasswordTextFields
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
            />
        </Box>
    );
}

function DonRegisterForm({onSuccess, onError}) {
    return (
        <Formik
            initialValues={{
                surname: '',
                name: '',
                region: '',
                email: '',
                password: '',
                passwordConfirm: '',
            }}
            validationSchema={donValidationSchema}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    console.log('Отправляем body: ')
                    const body = {
                        nickname: values.surname,
                        firstName: values.name,
                        lastName: values.surname,
                        password: values.password,
                        role: 'DON',
                        region: REGION_MAP[values.region],
                        email: values.email,
                    };

                    console.log('Отправляем body: ', body)

                    const res = await fetch('http://localhost:8080/auth/signup', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(body),
                    });

                    if (res.ok) {
                        onSuccess(values.email);
                    } else {
                        const errorData = await res.json();
                        onError({ errcode: res.status, text: errorData.message || 'Ошибка регистрации' });
                    }
                } catch (err) {
                    onError({ errcode: 'network', text: err.message || err.toString() });
                } finally {
                    setSubmitting(false);
                }
            }}

        >
            {({handleSubmit}) => {
                return (
                    <form onSubmit={handleSubmit}>
                        <DonRegisterComponent/>
                        <ColorSwitchableButton type="submit" fullWidth sx={{ marginTop: '8%' }}>
                            Зарегистрироваться
                        </ColorSwitchableButton>
                    </form>
                );
            }}
        </Formik>
    );
}

function RegionSelect({ sx = {}, name, isBandExist= true }) {
    const { values,
        handleChange,
        handleBlur,
        touched,
        errors} = useFormikContext();

    const [regions, setRegions] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/region?isBandExist=${isBandExist}`, {
        })
            .then(response => {
                setRegions(response.data);
            })
            .catch(error => {
                console.error('Ошибка при загрузке регионов:', error);
            });
    }, []);

    return (
        <Box sx={{ width: '100%', marginTop: '3%', marginBottom: '3%', ...sx }}>
            <FormControl size='small' fullWidth error={touched.region && Boolean(errors.region)}>
                <InputLabel
                    size='small'
                    id="region-selector-label"
                    sx={{
                        color: 'black',
                        '&.Mui-error': {
                            color: '#cc0000',
                        },
                        '&.Mui-focused': {
                            color: 'black',
                        },
                        '&.Mui-error[data-shrink="true"]': {
                            color: '#cc0000',
                        }
                    }}
                >
                    Регион влияния
                </InputLabel>
                <Select
                    labelId="region-selector-label"
                    id="region-select"
                    name={name}
                    value={values.region}
                    label="Выберите регион"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.region && Boolean(errors.region)}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                border: '3px black',
                                backgroundColor: '#990000'
                            },
                        },
                    }}
                    sx={registerSelectSx}
                >
                    {regions.map(region => (
                        <ColoredMenuItem key={region} value={region}>
                            {region}
                        </ColoredMenuItem>
                    ))}
                </Select>
                {touched.region && Boolean(errors.region) && (
                    <FormHelperText sx={{
                        '&.Mui-error': {
                            color: '#cc0000',
                        },
                    }}>{touched.region && errors.region}</FormHelperText>
                )}
            </FormControl>
        </Box>
    );
}


function ColoredMenuItem({ value, children, ...props }) {
    return (
        <MenuItem
            value={value}
            sx={registerSelectMenuItemSx}
            {...props}
        >
            {children}
        </MenuItem>
    );
}

function RoleSelect({ role, onRoleChanged }) {
    const handleChange = (event) => {
        onRoleChanged(event.target.value);
    };
    const [availableRoles, setAvailableRoles] = useState([]);

    useEffect(() => {
        const fetchRegions = async () => {
            try {
                const [withBandsResponse, withoutBandsResponse] = await Promise.all([
                    axios.get('http://localhost:8080/region?isBandExist=true'),
                    axios.get('http://localhost:8080/region?isBandExist=false')
                ]);

                const regionsWithBands = withBandsResponse.data;
                const regionsWithoutBands = withoutBandsResponse.data;

                const hasWithBands = Array.isArray(regionsWithBands) && regionsWithBands.length > 0;
                const hasWithoutBands = Array.isArray(regionsWithoutBands) && regionsWithoutBands.length > 0;

                if (!hasWithBands) {
                    setAvailableRoles(["Дон"]);
                } else if (!hasWithoutBands) {
                    setAvailableRoles(["Администратор", "Солдат", "Пользователь"]);
                } else {
                    setAvailableRoles(["Дон", "Администратор", "Солдат", "Пользователь"]);
                }

            } catch (error) {
                console.error("Ошибка при загрузке регионов:", error);
                setAvailableRoles(["Дон"]);
            }
        };

        fetchRegions();
    }, []);



    return (
        <Box
            sx={{ width: '100%',marginBottom: '3%' }}
        >
            <FormControl size='small' fullWidth>
                <InputLabel
                    id="role-selector-label"
                    sx={{
                        color: 'black',
                        '&.Mui-focused': {
                            color: 'black',
                        },
                    }}
                >Выберите роль</InputLabel>
                <Select
                    labelId="role-selector-label"
                    id="demo-simple-select"
                    value={role}
                    label="Выберите роль"
                    onChange={handleChange}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                border: '3px black',
                                backgroundColor: '#990000',
                            },
                        },
                    }}
                    sx={registerSelectSx}
                >
                    {availableRoles.map((r) => (
                        <ColoredMenuItem key={r} value={r}>
                            {r}
                        </ColoredMenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

function RegisterComponent() {
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState('');

    const [snackbarPresented, setSnackbarPresented] = useState(false);
    const [snackbarError, setSnackbarError] = useState({ errcode: null, text: '' });

    const navigateWelcome = () => {
        navigate('/welcome');
    };
    const handleRegisterSuccess = (email) => {
        console.log('Почта для подтверждения:', email);
        navigate('/check-email', { state: { email } });
    };

    const handleRegisterError = ({ errcode, text }) => {
        console.error(`Ошибка регистрации [${errcode}]: ${text}`);
        setSnackbarError({ errcode, text });
        setSnackbarPresented(true);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbarPresented(false);
    };

    return (
        <Box
            display="flex"
            alignItems="right"
            gap={1}
            justifyContent="center"
            width="100vw"
            height="100vh"
            sx={{ bgcolor: 'black', placeItems: 'center' }}
        >
            <Paper
                elevation={3}
                sx={getRegisterPaperSx(selectedRole)}
            >
                <Link
                    underline="hover"
                    sx={{
                        alignSelf: 'flex-start',
                        cursor: 'pointer',
                        color: 'black',
                        fontSize: '0.9rem',
                        marginBottom: '5%',
                    }}
                    onClick={navigateWelcome}
                >
                    На главную
                </Link>
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                        textAlign: 'center',
                        marginBottom: '10%',
                    }}>
                    Регистрация
                </Typography>
                <RoleSelect role={selectedRole} onRoleChanged={setSelectedRole} fullWidth></RoleSelect>
                {selectedRole === '' ? (<></>):(
                    selectedRole === 'Дон' ? (
                        <DonRegisterForm onSuccess={handleRegisterSuccess} onError={handleRegisterError}></DonRegisterForm>
                    ) : (
                        selectedRole === 'Администратор' || selectedRole === 'Солдат' ? (
                            <Box>
                                <AdministratorSoldierRegisterForm
                                    onSuccess={handleRegisterSuccess} onError={handleRegisterError}
                                    role={selectedRole === 'Администратор' ? 'ADMIN' : 'SOLDIER'}
                                >

                                </AdministratorSoldierRegisterForm>
                            </Box>
                        ) : (
                            <Box>
                                <UserRegisterForm
                                    onSuccess={handleRegisterSuccess} onError={handleRegisterError}
                                    role={selectedRole === 'Администратор' ? 'ADMIN' : 'SOLDIER'}
                                ></UserRegisterForm>
                            </Box>
                        )
                    )
                )}
            </Paper>
            <Snackbar
                open={snackbarPresented}
                autoHideDuration={5000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
                    Ошибка {snackbarError.errcode}: {snackbarError.text}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default RegisterComponent;