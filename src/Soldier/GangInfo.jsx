import React from 'react';
import { Box, Typography } from '@mui/material';
import ColorSwitchableButton from "../CommonComponents/Buttons.jsx";
import {useSelector} from "react-redux";
import { jwtDecode } from "jwt-decode";

const GangInfo = () => {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const decoded = accessToken ? jwtDecode(accessToken) : null;

    console.log("Decoded token:", decoded);

    return (
        <Box
            sx={{
                padding: 4,
                backgroundColor: '#990000',
                borderRadius: 2,
                boxShadow: 2,
                maxWidth: 600,
                margin: '0 auto',
                textAlign: 'center',
            }}
        >
            <Typography variant="h5" sx={{color:'black'}} gutterBottom>
                Информация о банде
            </Typography>
            <Typography variant="body1" sx={{ color:'black', mb: 3 }}>
                Здесь будет отображаться информация о вашей банде.
            </Typography>

            <ColorSwitchableButton
                variant="contained"
            >
                Выйти
            </ColorSwitchableButton>
        </Box>
    );
};

export default GangInfo;
