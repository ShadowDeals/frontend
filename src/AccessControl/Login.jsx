import { useNavigate } from 'react-router-dom';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Link,
} from "@mui/material";
import ColorSwitchableButton from "../CommonComponents/Buttons.jsx";

export function StyledTextField({ sx, ...props }) {
    return (
        <TextField
            sx={{
                width: '100%',
                '& .MuiInputLabel-root': {
                    color: 'black',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: 'black',
                },
                '& .MuiFormHelperText-root': {
                    color: 'black',
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: 'black',
                    },
                    '&:hover fieldset': {
                        borderColor: 'black',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: 'black',
                    },
                    '&.Mui-focused:not(:hover) fieldset': {
                        borderColor: 'black',
                    },
                },
                ...sx,
            }}
            {...props}
        />
    );
}

function LoginComponent() {
    const navigate = useNavigate();

    const navigatePasswordReset = () => {
        navigate('/password-reset', { state: { fromLogin: true } });
    };

    const navigateWelcome = () => {
        navigate('/welcome');
    };

    return(
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
                    height: '30 vh',
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
                    Логин
                </Typography>
                <StyledTextField fullWidth label="Почта"></StyledTextField>
                <StyledTextField sx={{marginTop:'3%'}} fullWidth label="Пароль"></StyledTextField>
                <Link
                    underline="hover"
                    sx={{
                        marginTop: '3%',
                        alignSelf: 'flex-end',
                        cursor: 'pointer',
                        color: 'black',
                        fontSize: '0.9rem',
                    }}
                    onClick={navigatePasswordReset}
                >
                    Забыли пароль?
                </Link>
                <ColorSwitchableButton
                    fullWidth sx={{marginTop:'10%'}}> Войти </ColorSwitchableButton>
            </Paper>
        </Box>
    );
}

export default LoginComponent