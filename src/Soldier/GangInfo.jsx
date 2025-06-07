import React from 'react';
import {Box, Button, Paper, Stack, Typography} from '@mui/material';
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const GangInfo = ({role}) => {
    const accessToken = Cookies.get("accessToken");
    const decodedToken = accessToken ? jwtDecode(accessToken) : null;

    console.log("Decoded token:", decodedToken);

    return (
        <Paper
            elevation={5} sx={{ width: '40%', alignItems: 'center', padding: 3 }}
        >
            <Stack spacing={2} alignItems='center'>
                <Typography variant="h5" gutterBottom>
                    Вы состоите в банде!
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                    ID вашей банды: {decodedToken.bandId}
                </Typography>
                {
                    role !== 'Дон'&& (
                        <Button
                            variant="contained"
                            onClick={()=> {
                                console.log("хэндлер выхода из банды активирован");
                            }}
                        >
                            Выйти
                        </Button>)
                }
            </Stack>
        </Paper>
    );
};

export default GangInfo;
