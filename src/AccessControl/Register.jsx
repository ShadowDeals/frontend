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
    FormControlLabel, FormHelperText
} from "@mui/material";

import ColorSwitchableButton from "../CommonComponents/Buttons.jsx";
import { StyledTextField } from "./Login.jsx";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Formik, useFormikContext} from 'formik';
import * as Yup from 'yup';
import {
    getRegisterPaperSx,
    registerSelectMenuItemSx,
    registerSelectSx
} from "../CommonComponents/RegisterStyles.js";


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

const administratorValidationSchema = Yup.object({
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
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
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
                        error={values.specifyRegion && touched.region && Boolean(errors.region)}
                        helperText={values.specifyRegion && touched.region && errors.region}
                        sx={{ width: '60%' }}
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
            sx={{ marginBottom: '3%' }}
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

function UserRegisterForm() {
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
            onSubmit={(values) => {
                console.log('Форма пользователя отправлена:', values);
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

function AdministratorSoldierRegisterForm() {
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
            validationSchema={administratorValidationSchema}
            onSubmit={(values) => {
                console.log('Форма отправлена:', values);
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

function DonRegisterForm() {
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
            onSubmit={(values) => {
                console.log('Форма дона отправлена:', values);
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

function RegionSelect({ sx = {}, name }) {
    const { values,
        handleChange,
        handleBlur,
        touched,
        errors} = useFormikContext();
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
                    <ColoredMenuItem value={"Выборгский район"}>Выборгский район</ColoredMenuItem>
                    <ColoredMenuItem value={"Московский район"}>Московский район</ColoredMenuItem>
                    <ColoredMenuItem value={"Василеостровский район"}>Василеостровский район</ColoredMenuItem>
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
                    <ColoredMenuItem value={"Дон"}>Дон</ColoredMenuItem>
                    <ColoredMenuItem value={"Администратор"}>Администратор</ColoredMenuItem>
                    <ColoredMenuItem value={"Солдат"}>Солдат</ColoredMenuItem>
                    <ColoredMenuItem value={"Пользователь"}>Пользователь</ColoredMenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

function RegisterComponent() {
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState('');

    const navigateWelcome = () => {
        navigate('/welcome');
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
                        <DonRegisterForm></DonRegisterForm>
                    ) : (
                        selectedRole === 'Администратор' || selectedRole === 'Солдат' ? (
                            <Box>
                                <AdministratorSoldierRegisterForm></AdministratorSoldierRegisterForm>
                            </Box>
                        ) : (
                            <Box>
                                <UserRegisterForm></UserRegisterForm>
                            </Box>
                        )
                    )
                )}
            </Paper>
        </Box>
    );
}

export default RegisterComponent;