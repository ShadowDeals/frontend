import React from 'react';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import axios from 'axios';
import {useAuthHeaders, useDecodedToken, useRefreshToken} from "./tokenHooks.js";
import StatusSnackbar from "./StatusSnackbar.jsx";
import {useSnackbar} from "./useSnackbar.js";
import {jwtDecode} from "jwt-decode";

import {API_BASE} from "../baseUrl.js";

const leaveGang =  (authHeaders) => {
    try {
        axios.put(`${API_BASE}/api/user/leave`, {}, { headers: authHeaders });
        return { status: 'success', message: 'Вы успешно вышли из банды.' };
    } catch (error) {
        return {
            status: 'error',
            message: error.response?.data?.message || error.message || 'Ошибка при выходе из банды.',
        };
    }
};

export function GangInfo ({ role, onBandIdChange }) {
    const authHeaders = useAuthHeaders();
    const decodedToken = useDecodedToken() || null;

    console.log('decodedToken из дочернего', decodedToken);

    const {
        open,
        snackbar,
        showSnackbar,
        hideSnackbar
    } = useSnackbar();

    const { refresh } = useRefreshToken();

    const handleLeave = async () => {
        const result = leaveGang(authHeaders);
        const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        console.log('Ждем 2 секунды перед обновлением токена...');
        await sleep(300);
        console.log('Задержка завершена, обновляем токен...');

        const newAccessToken = await refresh();

        console.log('decoded token band id: ', jwtDecode(newAccessToken)?.bandId || null);
        onBandIdChange(jwtDecode(newAccessToken)?.bandId);

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
                        <Button variant="contained" onClick={handleLeave}>
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
