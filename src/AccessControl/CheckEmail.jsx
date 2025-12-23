import {Typography, Paper, Box, Link, Stack} from '@mui/material';
import {useLocation, useNavigate} from "react-router-dom";

export default function CheckEmailComponent() {
    const location = useLocation();
    const email = location.state?.email;

    const navigate = useNavigate();
    const navigateWelcome = () => {
        navigate('/welcome');
    };

    return (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Paper
                elevation={5}
                sx={{
                    p: 4,
                    textAlign: 'center',
                    width: { xs: '90%', sm: '500px', md: '500px' },
                    minWidth: '300px',
                }}
            >
                <Stack>
                    <Link
                        underline="hover"
                        sx={{
                            alignSelf: 'flex-start'}}
                        onClick={navigateWelcome}
                    >
                        На главную
                    </Link>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Регистрация успешна!
                    </Typography>
                    <Typography variant="body1">
                        Проверь почту {email || '...'} для подтверждения письма.
                    </Typography>
                </Stack>
            </Paper>
        </Box>
    );
}
