import { Box, Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function EmailConfirmComponent() {
    const navigate = useNavigate();

    const handleGoToLogin = () => {
        navigate("/login");
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100vw"
            height="100vh"
            sx={{ bgcolor: 'black' }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 5,
                    width: '30vw',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    bgcolor: '#990000',
                    color: 'black',
                }}
            >
                <Typography variant="h4" gutterBottom textAlign="center">
                    Поздравляем!
                </Typography>
                <Typography variant="body1" textAlign="center" sx={{ mb: 4 }}>
                    Почта успешно подтверждена.
                </Typography>
                <Button
                    variant="contained"
                    onClick={handleGoToLogin}
                    sx={{
                        bgcolor: 'black',
                        color: '#990000',
                        '&:hover': {
                            bgcolor: '#660000',
                            color: 'black',
                        },
                    }}
                >
                    Перейти ко входу
                </Button>
            </Paper>
        </Box>
    );
}

export default EmailConfirmComponent;
