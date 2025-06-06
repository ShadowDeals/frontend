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
    Alert,
    Snackbar,
    TextField,
    Button, MenuItem, FormHelperText
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import axios from "axios";
import { formConfigs } from "./ValidationSchemas.jsx";

const REGION_MAP = {
    'Василеостровский район': 'Василеостровский район',
    'Выборгский район': 'Выборгский район',
    'Московский район': 'Московский район',
    '': null
};


// function OptionalRegionChoosingComponent() {
//     const { values,
//         errors,
//         touched,
//         handleChange,
//         handleBlur,
//         setFieldValue,
//         setFieldTouched,
//         setFieldError } = useFormikContext();
//     const [specReg, setSpecReg] = useState(false);
//     return (
//         <Box>
//             <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2} sx={{marginTop:'3%'}}>
//                 <FormControlLabel
//                     control={
//                         <Checkbox
//                             checked={specReg}
//                             onChange={(e) => {
//                                 const checked= e.target.checked;
//                                 setSpecReg(checked)
//                                 setFieldValue('specifyRegion', checked);
//                                 if (!checked) {
//                                     setFieldValue('region', '');
//                                 }
//                                 setFieldTouched('region', false);
//                                 setFieldError('region', undefined);
//                             }}
//                         />
//                     }
//                     label="Указать регион"
//                 />
//                 {specReg && (
//                     <RegionSelect
//                         name="region"
//                         values={values}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         isBandExist={true}
//                         error={values.specifyRegion && touched.region && Boolean(errors.region)}
//                         helperText={values.specifyRegion && touched.region && errors.region}
//                         sx={{ width: '100%' }}
//                     />
//                 )}
//             </Stack>
//         </Box>
//     );
// }
//
// function EmailPasswordTextFields() {
//     const { values,
//         errors,
//         touched,
//         handleChange,
//         handleBlur } = useFormikContext();
//     return (
//         <Box>
//             <TextField
//                 size={'small'}
//                 fullWidth
//                 label="Почта"
//                 name="email"
//                 value={values.email}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={touched.email && Boolean(errors.email)}
//                 helperText={touched.email && errors.email}
//             />
//             <TextField
//                 size={'small'}
//                 fullWidth
//                 label="Пароль"
//                 type="password"
//                 sx={{ marginTop: '3%' }}
//                 name="password"
//                 value={values.password}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={touched.password && Boolean(errors.password)}
//                 helperText={touched.password && errors.password}
//             />
//             <TextField
//                 size={'small'}
//                 fullWidth
//                 label="Подтверждение пароля"
//                 type="password"
//                 sx={{ marginTop: '3%' }}
//                 name="passwordConfirm"
//                 value={values.passwordConfirm}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={touched.passwordConfirm && Boolean(errors.passwordConfirm)}
//                 helperText={touched.passwordConfirm && errors.passwordConfirm}
//             />
//         </Box>
//     );
// }
//
// function SurnameNameStack() {
//     const { values,
//         errors,
//         touched,
//         handleChange,
//         handleBlur } = useFormikContext();
//
//     return (
//         <Stack
//             direction="row"
//             spacing={2}
//             justifyContent="center"
//             alignItems="center"
//             sx={{ marginBottom: '3%', width:'100%' }}
//         >
//             <TextField
//                 size={'small'}
//                 fullWidth
//                 label="Фамилия"
//                 name="surname"
//                 value={values.surname}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={touched.surname && Boolean(errors.surname)}
//                 helperText={touched.surname && errors.surname}
//             />
//             <TextField
//                 size={'small'}
//                 fullWidth
//                 label="Имя"
//                 name="name"
//                 value={values.name}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={touched.name && Boolean(errors.name)}
//                 helperText={touched.name && errors.name}
//             />
//         </Stack>
//     );
// }
//
// function UserRegisterForm({onSuccess, onError, role}) {
//     return (
//         <Formik
//             initialValues={{
//                 username: '',
//                 email: '',
//                 specifyRegion: false,
//                 region: '',
//                 password: '',
//                 passwordConfirm: '',
//             }}
//             validationSchema={userValidationSchema}
//             onSubmit={async (values, { setSubmitting }) => {
//                 try {
//                     const body = {
//                         nickname: values.surname,
//                         firstName: values.name,
//                         lastName: values.surname,
//                         password: values.password,
//                         role:  role,
//                         region: REGION_MAP[values.region],
//                         email: values.email,
//                     };
//
//                     console.log('Отправляем body: ', body)
//
//                     const res = await fetch('http://localhost:8080/auth/signup', {
//                         method: 'POST',
//                         headers: { 'Content-Type': 'application/json' },
//                         body: JSON.stringify(body),
//                     });
//
//                     if (res.ok) {
//                         onSuccess(values.email);
//                     } else {
//                         const errorData = await res.json();
//                         onError({ errcode: res.status, text: errorData.message || 'Ошибка регистрации' });
//                     }
//                 } catch (err) {
//                     onError({ errcode: 'network', text: err.message || err.toString() });
//                 } finally {
//                     setSubmitting(false);
//                 }
//             }}
//         >
//             {({ handleSubmit }) => (
//                 <form onSubmit={handleSubmit}>
//                     <UserRegisterComponent />
//                     <OptionalRegionChoosingComponent />
//                     <Button type="submit" fullWidth sx={{ marginTop: '8%' }}>
//                         Зарегистрироваться
//                     </Button>
//                 </form>
//             )}
//         </Formik>
//     );
// }
//
// function UserRegisterComponent() {
//     const { values,
//         errors,
//         touched,
//         handleChange,
//         handleBlur } = useFormikContext();
//     return (
//         <Box>
//             <TextField
//                 name={'username'}
//                 value={values.username}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={touched.username && Boolean(errors.username)}
//                 helperText={touched.username && errors.username}
//                 size='small' fullWidth sx={{marginBottom:'3%'}} label="Никнейм" />
//             <EmailPasswordTextFields></EmailPasswordTextFields>
//         </Box>
//     )
// }
//
// function AdministratorSoldierRegisterForm({onSuccess, onError, role}) {
//     return (
//         <Formik
//             initialValues={{
//                 surname: '',
//                 name: '',
//                 specifyRegion: false,
//                 region: '',
//                 email: '',
//                 password: '',
//                 passwordConfirm: '',
//             }}
//             validationSchema={administratorSoldierValidationSchema}
//             onSubmit={async (values, { setSubmitting }) => {
//                 try {
//                     const body = {
//                         nickname: values.surname,
//                         firstName: values.name,
//                         lastName: values.surname,
//                         password: values.password,
//                         role:  role,
//                         region: REGION_MAP[values.region],
//                         email: values.email,
//                     };
//
//                     console.log('Отправляем body: ', body)
//
//                     const res = await fetch('http://localhost:8080/auth/signup', {
//                         method: 'POST',
//                         headers: { 'Content-Type': 'application/json' },
//                         body: JSON.stringify(body),
//                     });
//
//                     if (res.ok) {
//                         onSuccess(values.email);
//                     } else {
//                         const errorData = await res.json();
//                         onError({ errcode: res.status, text: errorData.message || 'Ошибка регистрации' });
//                     }
//                 } catch (err) {
//                     onError({ errcode: 'network', text: err.message || err.toString() });
//                 } finally {
//                     setSubmitting(false);
//                 }
//             }}
//         >
//             {formik => (
//                 <form onSubmit={formik.handleSubmit}>
//                     <AdministratorSoldierRegisterComponent/>
//                     <OptionalRegionChoosingComponent></OptionalRegionChoosingComponent>
//                     <ColorSwitchableButton type="submit" fullWidth sx={{ marginTop: '8%' }}>
//                         Зарегистрироваться
//                     </ColorSwitchableButton>
//                 </form>
//             )}
//         </Formik>
//     );
// }
//
// function AdministratorSoldierRegisterComponent() {
//     return (
//         <Box>
//             <SurnameNameStack></SurnameNameStack>
//             <EmailPasswordTextFields></EmailPasswordTextFields>
//         </Box>
//     )
// }
//
// function DonRegisterComponent() {
//     const {values,
//         errors,
//         touched,
//         handleChange,
//         handleBlur
//     } = useFormikContext();
//     return (
//         <Box>
//             <Stack
//                 direction="row"
//                 spacing={2}
//                 justifyContent="center"
//                 alignItems="center"
//             >
//                 <SurnameNameStack/>
//             </Stack>
//             <RegionSelect
//                 name="region"
//                 size={'small'}
//                 sx={{ marginTop: '3%' }}
//                 isBandExist={false}
//             />
//             <EmailPasswordTextFields
//                 values={values}
//                 errors={errors}
//                 touched={touched}
//                 handleChange={handleChange}
//                 handleBlur={handleBlur}
//             />
//         </Box>
//     );
// }
//
// function DonRegisterForm({onSuccess, onError}) {
//     return (
//         <Formik
//             initialValues={{
//                 surname: '',
//                 name: '',
//                 region: '',
//                 email: '',
//                 password: '',
//                 passwordConfirm: '',
//             }}
//             validationSchema={donValidationSchema}
//             onSubmit={async (values, { setSubmitting }) => {
//                 try {
//                     console.log('Отправляем body: ')
//                     const body = {
//                         nickname: null,
//                         firstName: values.name,
//                         lastName: values.surname,
//                         password: values.password,
//                         role: 'DON',
//                         region: REGION_MAP[values.region],
//                         email: values.email,
//                     };
//
//                     console.log('Отправляем body: ', body)
//
//                     const res = await fetch('http://localhost:8080/auth/signup', {
//                         method: 'POST',
//                         headers: { 'Content-Type': 'application/json' },
//                         body: JSON.stringify(body),
//                     });
//
//                     if (res.ok) {
//                         onSuccess(values.email);
//                     } else {
//                         const errorData = await res.json();
//                         onError({ errcode: res.status, text: errorData.message || 'Ошибка регистрации' });
//                     }
//                 } catch (err) {
//                     onError({ errcode: 'network', text: err.message || err.toString() });
//                 } finally {
//                     setSubmitting(false);
//                 }
//             }}
//
//         >
//             {({handleSubmit}) => {
//                 return (
//                     <form onSubmit={handleSubmit}>
//                         <DonRegisterComponent/>
//                         <Button type="submit" fullWidth sx={{ marginTop: '8%' }}>
//                             Зарегистрироваться
//                         </Button>
//                     </form>
//                 );
//             }}
//         </Formik>
//     );
// }

// function RegionSelect({ sx = {}, name, isBandExist= true }) {
//     const { values,
//         handleChange,
//         handleBlur,
//         touched,
//         errors} = useFormikContext();
//
//     const [regions, setRegions] = useState([]);
//
//     useEffect(() => {
//         axios.get(`http://localhost:8080/region?isBandExist=${isBandExist}`, {
//         })
//             .then(response => {
//                 setRegions(response.data);
//             })
//             .catch(error => {
//                 console.error('Ошибка при загрузке регионов:', error);
//             });
//     }, []);
//
//     return (
//         <Box sx={{ width: '100%', marginTop: '3%', marginBottom: '3%', ...sx }}>
//             <FormControl size='small' fullWidth error={touched.region && Boolean(errors.region)}>
//                 <InputLabel
//                     size='small'
//                     id="region-selector-label"
//                 >
//                     Регион влияния
//                 </InputLabel>
//                 <Select
//                     labelId="region-selector-label"
//                     id="region-select"
//                     name={name}
//                     value={values.region}
//                     label="Выберите регион"
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     error={touched.region && Boolean(errors.region)}
//                 >
//                     {regions.map(region => (
//                         <ColoredMenuItem key={region} value={region}>
//                             {region}
//                         </ColoredMenuItem>
//                     ))}
//                 </Select>
//                 {touched.region && Boolean(errors.region) && (
//                     <FormHelperText sx={{
//                         '&.Mui-error': {
//                             color: '#cc0000',
//                         },
//                     }}>{touched.region && errors.region}</FormHelperText>
//                 )}
//             </FormControl>
//         </Box>
//     );
// }


// function ColoredMenuItem({ value, children, ...props }) {
//     return (
//         <MenuItem
//             value={value}
//             {...props}
//         >
//             {children}
//         </MenuItem>
//     );
// }
//
// function RoleSelect({ role, onRoleChanged }) {
//     const handleChange = (event) => {
//         onRoleChanged(event.target.value);
//     };
//     const [availableRoles, setAvailableRoles] = useState([]);
//
//     useEffect(() => {
//         const fetchRegions = async () => {
//             try {
//                 const [withBandsResponse, withoutBandsResponse] = await Promise.all([
//                     axios.get('http://localhost:8080/region?isBandExist=true'),
//                     axios.get('http://localhost:8080/region?isBandExist=false')
//                 ]);
//
//                 const regionsWithBands = withBandsResponse.data;
//                 const regionsWithoutBands = withoutBandsResponse.data;
//
//                 const hasWithBands = Array.isArray(regionsWithBands) && regionsWithBands.length > 0;
//                 const hasWithoutBands = Array.isArray(regionsWithoutBands) && regionsWithoutBands.length > 0;
//
//                 if (!hasWithBands) {
//                     setAvailableRoles(["Дон"]);
//                 } else if (!hasWithoutBands) {
//                     setAvailableRoles(["Администратор", "Солдат", "Пользователь"]);
//                 } else {
//                     setAvailableRoles(["Дон", "Администратор", "Солдат", "Пользователь"]);
//                 }
//
//             } catch (error) {
//                 console.error("Ошибка при загрузке регионов:", error);
//                 setAvailableRoles(["Дон"]);
//             }
//         };
//
//         fetchRegions();
//     }, []);
//
//
//
//     return (
//         <Box
//             sx={{ width: '100%',marginBottom: '3%' }}
//         >
//             <FormControl size='small' fullWidth>
//                 <InputLabel
//                     id="role-selector-label"
//                     sx={{
//                         color: 'black',
//                         '&.Mui-focused': {
//                             color: 'black',
//                         },
//                     }}
//                 >Выберите роль</InputLabel>
//                 <Select
//                     labelId="role-selector-label"
//                     id="demo-simple-select"
//                     value={role}
//                     label="Выберите роль"
//                     onChange={handleChange}
//                 >
//                     {availableRoles.map((r) => (
//                         <ColoredMenuItem key={r} value={r}>
//                             {r}
//                         </ColoredMenuItem>
//                     ))}
//                 </Select>
//             </FormControl>
//         </Box>
//     );
// }

function RegisterComponent() {
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState('Выберите роль');
    const [snackbarPresented, setSnackbarPresented] = useState(false);
    const [snackbarError, setSnackbarError] = useState({ errcode: null, text: '' });

    const [formConfig, setFormConfig] = useState(null);

    const onRoleChange = (role) => {
        console.log('onRoleChange', role);
        setSelectedRole(role);
        if (role && formConfigs[role]) {
            console.log('выбрана схема: ', formConfigs[role]);
            setFormConfig(formConfigs[role]);
        } else {
            console.log('выбрана схема: !!!!!!!!!!!!!!!!!!!');
            setFormConfig(null);
        }
    };

    const formik = useFormik({
        initialValues: formConfig ? formConfig.initialValues : {},
        validationSchema: formConfig ? formConfig.validationSchema : null,
        enableReinitialize: true,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const body = {
                    ...values,
                    role: selectedRole.toUpperCase(),
                    region: values.region || null,
                };

                const res = await fetch('http://localhost:8080/auth/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                });

                if (res.ok) {
                    handleRegisterSuccess(values.email);
                } else {
                    const errorData = await res.json();
                    handleRegisterError({ errcode: res.status, text: errorData.message || 'Ошибка регистрации' });
                }
            } catch (err) {
                handleRegisterError({ errcode: 'network', text: err.message || err.toString() });
            } finally {
                setSubmitting(false);
            }
        },
    });

    const navigateWelcome = () => navigate('/welcome');

    const handleRegisterSuccess = (email) => {
        navigate('/check-email', { state: { email } });
    };

    const handleRegisterError = ({ errcode, text }) => {
        setSnackbarError({ errcode, text });
        setSnackbarPresented(true);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbarPresented(false);
    };

    const [regionsBandExist, setRegionsBandExist] = useState([]);
    const [regionsBandNotExist, setRegionsBandNotExist] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/region?isBandExist=true`)
            .then(res => setRegionsBandExist(res.data))
            .catch(err => console.error(err));

        axios.get(`http://localhost:8080/region?isBandExist=false`)
            .then(res => setRegionsBandNotExist(res.data))
            .catch(err => console.error(err));
    }, []);
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
                            checked={formik.values[field]}
                            onChange={(e) => formik.setFieldValue(field, e.target.checked)}
                        />
                    }
                    label="Указать регион"
                />
            );
        }

        if (field === 'region') {
            if (selectedRole === 'don') {
                console.log('Выбран Дон')
                const showError = formik.touched[field] && Boolean(formik.errors[field]);
                console.log('Formik value for region:', formik.values[field], 'showError: ', showError);
                console.log('touched:', formik.touched[field]);
                console.log('error:', formik.errors[field]);
                console.log('key:', field);
                console.log('val:', formik.values.region);
                console.log('init val:', formConfigs['don'].validationSchema);
                return (
                    <FormControl fullWidth size="small" error={showError}>
                        <InputLabel id={`${field}-label`}>Выберите регион</InputLabel>
                        <Select
                            key={field}
                            name={field}
                            labelId={`${field}-label`}
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

                            {regionsBandNotExist.map((region, index) => (
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

            if (!formik.values.specifyRegion) return null;

            return (
                <Select
                    key={field}
                    name={field}
                    value={formik.values[field]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    fullWidth
                    size="small"
                    displayEmpty
                    error={formik.touched[field] && Boolean(formik.errors[field])}
                >
                    <MenuItem value="Выберите регион">
                        Выберите регион
                    </MenuItem>
                    {regionsBandExist.map((region) => (
                        <MenuItem key={region} value={region}>
                            {region}
                        </MenuItem>
                    ))}
                </Select>
            );
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
                        onClick={navigateWelcome}
                    >
                        На главную
                    </Link>

                    <Typography variant="h4" component="h1" sx={{ textAlign: 'center' }}>
                        Регистрация
                    </Typography>

                    <Select
                        variant="outlined"
                        size="sm"
                        style={{ width: '100%' }}
                        value={selectedRole}
                        onChange={(e) => onRoleChange(e.target.value)}
                    >
                        <MenuItem value="Выберите роль">Выберите роль</MenuItem>
                        <MenuItem value="don">Дон</MenuItem>
                        <MenuItem value="administrator">Администратор</MenuItem>
                        <MenuItem value="soldier">Солдат</MenuItem>
                        <MenuItem value="user">Пользователь</MenuItem>
                    </Select>

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