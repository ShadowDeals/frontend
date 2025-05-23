
import { Box, FormControl, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import ColorSwitchableButton from "../CommonComponents/Buttons.jsx";
import { StyledTextField } from "./Login.jsx";
import { useState } from "react";

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
                >Роль</InputLabel>
                <Select
                    labelId="role-selector-label"
                    id="demo-simple-select"
                    value={age}
                    label="Роль"
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
                    <ColoredMenuItem value={20}>Дон</ColoredMenuItem>
                    <ColoredMenuItem value={30}>Солдат</ColoredMenuItem>
                    <ColoredMenuItem value={30}>Пользователь</ColoredMenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

function RegisterComponent() {
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
                    height: '35vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 5,
                    bgcolor: '#990000',
                    color: 'black',
                    justifyContent: 'flex-start'
                }}
            >
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