
import {Box, FormControl, InputLabel, Link, MenuItem, Paper, Select, Typography} from "@mui/material";
import ColorSwitchableButton from "../CommonComponents/Buttons.jsx";
import { StyledTextField } from "./Login.jsx";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

function ColoredMenuItem({ value, children, ...props }) {
    return (
        <MenuItem
            value={value}
            sx={{
                backgroundColor: '#990000',
                color: 'black',
                '&:hover': {
                    backgroundColor: 'black',
                    color: '#990000',
                },
            }}
            {...props}
        >
            {children}
        </MenuItem>
    );
}

function RoleSelect() {
    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
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
                    value={age}
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
                    sx={{
                        backgroundColor: '#990000',
                        color: 'black',
                        width: '100%',
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'black',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'black',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'black',
                        },
                        '&.MuiSelect-iconOpen': {
                            borderColor: 'black',
                        },
                    }}
                >
                    <ColoredMenuItem >Дон</ColoredMenuItem>
                    <ColoredMenuItem >Солдат</ColoredMenuItem>
                    <ColoredMenuItem >Пользователь</ColoredMenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

function RegisterComponent() {
    const navigate = useNavigate();

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
                sx={{
                    width: '15vw',
                    height: '38vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 5,
                    bgcolor: '#990000',
                    color: 'black',
                    justifyContent: 'flex-start'
                }}
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
                <RoleSelect fullWidth></RoleSelect>
                <StyledTextField fullWidth label="Почта"></StyledTextField>
                <StyledTextField sx={{marginTop:'3%'}} fullWidth label="Пароль"></StyledTextField>
                <ColorSwitchableButton
                    fullWidth sx={{marginTop:'10%'}}> Зарегистрироваться </ColorSwitchableButton>
            </Paper>
        </Box>
    );
}

export default RegisterComponent;