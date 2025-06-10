import React from 'react';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import axios from 'axios';
import {useAuthHeaders, useDecodedToken, useRefreshToken} from "./tokenHooks.js";
import StatusSnackbar from "./StatusSnackbar.jsx";
import {useSnackbar} from "./useSnackbar.js";
import {useDispatch, useSelector} from "react-redux";
import {jwtDecode} from "jwt-decode";
import {setBandId} from "../Redux/store.js";

const leaveGang = async (authHeaders) => {
    try {
        await axios.put('http://localhost:8080/user/leave', {}, { headers: authHeaders });
        return { status: 'success', message: 'Вы успешно вышли из банды.' };
    } catch (error) {
        return {
            status: 'error',
            message: error.response?.data?.message || error.message || 'Ошибка при выходе из банды.',
        };
    }
};

export function GangInfo ({ role }) {
    const dispatch = useDispatch();
    const authHeaders = useAuthHeaders();
    const decodedToken = useDecodedToken() || null;

    const currentBandId = useSelector(state => state.band.bandId);

    console.log('decodedToken из дочернего', decodedToken);
    console.log('currentBandId из дочернего', currentBandId);

    const {
        open,
        snackbar,
        showSnackbar,
        hideSnackbar
    } = useSnackbar();

    const { refresh } = useRefreshToken();

    const handleLeave = async ({ decodedToken }) => {
        const result = await leaveGang(authHeaders);
        const newAccessToken = await refresh();

        console.log('newaccess',newAccessToken);
        decodedToken = jwtDecode(newAccessToken);

        console.log('decoded token из дочернего: ', decodedToken);
        dispatch(setBandId(decodedToken?.bandId || null));
        console.log('decoded token band id: ', decodedToken?.bandId || null);

        if (showSnackbar) {
            if (!newAccessToken) {
                showSnackbar?.({
                    type: 'error',
                    text: 'Не удалось обновить токен. Попробуйте снова.',
                });
                return;
            }
            showSnackbar({
                type: result.status,
                text: result.message,
            });
        } else {
            console.log(result.message);
        }
    };

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-around',
            }}
        >
            <Paper elevation={5} sx={{ width: '40%', alignItems: 'center', padding: 3 }}>
                <Stack spacing={2} alignItems="center">
                    <Typography variant="h5" gutterBottom>
                        Вы состоите в банде!
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        ID вашей банды: {decodedToken?.bandId || 'неизвестен'}
                    </Typography>
                    {role !== 'Дон' && (
                        <Button variant="contained" onClick={(decodedToken) => handleLeave(decodedToken)}>
                            Выйти
                        </Button>
                    )}
                </Stack>
            </Paper>
            <StatusSnackbar open={open} onClose={hideSnackbar} snackbar={snackbar} />
        </Box>
    );
}

export default GangInfo;
