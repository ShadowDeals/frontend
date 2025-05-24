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
    FormControlLabel
} from "@mui/material";
import ColorSwitchableButton from "../CommonComponents/Buttons.jsx";
import { StyledTextField } from "./Login.jsx";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getRegisterPaperSx,
    registerSelectMenuItemSx,
    registerSelectSx
} from "../CommonComponents/registerStyles.js";


function OptionalRegionChoosingComponent() {
    const [specifyRegion, setSpecifyRegion] = useState(false);
    return (
        <Box>
            <Stack
                direction="row"

                justifyContent="flex-start"
                alignItems="flex-start"
            >
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={specifyRegion}
                            onChange={(e) => setSpecifyRegion(e.target.checked)}
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
                {specifyRegion !== false ? (<RegionSelect></RegionSelect>) :(<></>)}
            </Stack>
        </Box>
    );
}

function EmailPasswordTextFields() {
    return (
        <>
            <StyledTextField fullWidth label="Почта" />
            <StyledTextField sx={{ marginTop: '3%' }} fullWidth label="Пароль" />
        </>
    )
}

function SurnameNameStack() {
    return (
        <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{marginBottom:'3%'}}
        >
            <StyledTextField fullWidth label="Фамилия" />
            <StyledTextField sx={{ marginTop: '3%' }} fullWidth label="Имя" />
        </Stack>
    )
}

function UserRegisterComponent() {
    return (
        <>
            <StyledTextField fullWidth sx={{marginBottom:'3%'}} label="Никнейм" />
            <EmailPasswordTextFields></EmailPasswordTextFields>
        </>
    )
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
    return (
        <>
            <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
            >
                <SurnameNameStack></SurnameNameStack>
            </Stack>
            <RegionSelect sx={{ marginTop: '3%' }} ></RegionSelect>
            <EmailPasswordTextFields></EmailPasswordTextFields>
        </>
    )
}

function RegionSelect({ sx, props }) {
    const [region, setRegion] = useState("");
    const handleChange = (event) => {
        setRegion(event.target.value);
    };
    return (
        <Box
            sx={{ width: '100%', marginTop: '3%', marginBottom: '3%', ...sx}}
        >
            <FormControl fullWidth>
                <InputLabel
                    id="region-selector-label"
                    sx={{
                        color: 'black',
                        '&.Mui-focused': {
                            color: 'black',
                        },
                    }}
                >
                    Выберите регион
                </InputLabel>
                <Select
                    labelId="region-selector-label"
                    id="region-select"
                    value={region}
                    label="Выберите регион"
                    onChange={handleChange}
                    {...props}
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
                    <ColoredMenuItem value={"Шумиловский городок"}>Шумиловский городок</ColoredMenuItem>
                    <ColoredMenuItem value={"Выборгский район"}>Выборгский район</ColoredMenuItem>
                    <ColoredMenuItem value={"Московский район"}>Московский район</ColoredMenuItem>
                    <ColoredMenuItem value={"Василеостровский раайон"}>Василеостровский раайон</ColoredMenuItem>
                </Select>
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
            <FormControl fullWidth>
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
                        <DonRegisterComponent></DonRegisterComponent>
                    ) : (
                        selectedRole === 'Администратор' || selectedRole === 'Солдат' ? (
                            <Box>
                                <AdministratorSoldierRegisterComponent></AdministratorSoldierRegisterComponent>
                                <OptionalRegionChoosingComponent></OptionalRegionChoosingComponent>
                            </Box>
                        ) : (
                            <Box>
                                <UserRegisterComponent></UserRegisterComponent>
                                <OptionalRegionChoosingComponent></OptionalRegionChoosingComponent>
                            </Box>
                        )
                    )
                )}
                <ColorSwitchableButton
                    fullWidth sx={{marginTop:'8%'}}> Зарегистрироваться </ColorSwitchableButton>
            </Paper>
        </Box>
    );
}

export default RegisterComponent;