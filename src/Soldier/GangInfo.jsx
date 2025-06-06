import React from 'react';
import { Box, Typography } from '@mui/material';
import ColorSwitchableButton from "../CommonComponents/Buttons.jsx";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const GangInfo = ({role}) => {
    const accessToken = Cookies.get("accessToken");
    const decodedToken = accessToken ? jwtDecode(accessToken) : null;

    console.log("Decoded token:", decodedToken);

    const exitBand = ()=> {
        console.log("хэндлер выхода из банды активирован");
    };
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
                Вы состоите в банде!
            </Typography>
            <Typography variant="body1" sx={{ color:'black', mb: 3 }}>
                ID вашей банды: {decodedToken.bandId}
            </Typography>
            {
                role !== 'Дон'&& (
                <ColorSwitchableButton
                    variant="contained"
                    onClick={exitBand}
                >
                    Выйти
                </ColorSwitchableButton>)
            }
        </Box>
    );
};

export default GangInfo;
