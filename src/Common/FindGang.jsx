import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Stack,
    Button
} from '@mui/material';
import { useGangInfo } from './useGangInfo';
import { useSnackbar } from './useSnackbar';
import StatusSnackbar from './StatusSnackbar';
import axios from "axios";
import {useAuthHeaders} from "./tokenHooks.js";
import { API_BASE } from "../baseUrl.js";

export const Regions = {
    VASILEOSTROVKIY_REGION: "Василеостровский район",
    VIBORGSKY_REGION: "Выборгский район",
    MOSCOW_REGION: "Московский район",
};

export const RegionsReverse = Object.fromEntries(
    Object.entries(Regions).map(([key, value]) => [value, key])
);

export const handleApply = async ({
                                      regionName,
                                      ownRegions,
                                      submitted,
                                      setSubmitted,
                                      showSnackbar,
                                      authHeaders,
                                  }) => {
    console.log('Регион какой тут перед оптравкой: ', regionName);
    if (ownRegions.includes(regionName) || submitted.includes(regionName)) {
        console.log('Непонятно какого ну ладно: ', regionName);
        showSnackbar({
            type: 'info',
            text: `Вы уже подали заявку в регион "${regionName}".`,
        });
        return;
    }

    const sendRequest = async (regionName, headers) => {
        const regionKey = RegionsReverse?.[regionName];
        try {
            await axios.post(
                `${API_BASE}/api/request?regionName=${encodeURIComponent(regionKey)}`,
                {},
                { headers }
            );

            return {
                type: 'success',
                text: `Заявка на вступление в регион "${regionName}" отправлена!`,
            };
        } catch (error) {
            return {
                type: 'error',
                text: `Ошибка при отправке заявки: ${error.response?.data?.message || error.message}`,
            };
        }
    };

    const result = await sendRequest(regionName, authHeaders);

    if (result.type === 'success') {
        console.log('устанавливаем что регион: ', regionName, 'помечен как отправленный');
        setSubmitted((prev) => [...prev, regionName]);
    }

    showSnackbar({
        type: result.type,
        text: result.text,
    });
};

export function FindGang() {
    const { regions, ownRegions, loading, response } = useGangInfo();
    const [submitted, setSubmitted] = useState([]);
    const {
        open,
        snackbar,
        showSnackbar,
        hideSnackbar
    } = useSnackbar();

    const authHeaders = useAuthHeaders();

    const onApplyClick = (regionName) => {
        handleApply({
            regionName,
            ownRegions,
            submitted,
            setSubmitted,
            showSnackbar,
            authHeaders,
        });
    };

    if (loading) {
        return (
            <Box sx={{ padding: 4 }}>
                <Typography>Загрузка...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%', height: '100%', padding: 4 }}>
            <Typography variant="h5" textAlign="right" sx={{ marginBottom: 2 }}>
                Найди свою банду
            </Typography>

            <Box
                sx={{
                    width: '100%',
                    height: '80%',
                    overflowY: 'auto',
                    // border: '1px solid #900000',
                    padding: 2,
                }}
            >
                {regions.length > 0 && regions.map((region, index) => (
                    <Card
                        key={region}
                        sx={{
                            minWidth: 200,
                            borderRadius: 2,
                            boxShadow: 2,
                            margin: '1% 0',
                        }}
                    >
                        <CardContent>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6">
                                    {region}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={() => onApplyClick(region)}
                                    disabled={ownRegions.includes(region) || submitted.includes(region)}
                                >
                                    {(ownRegions.includes(region) || submitted.includes(region))
                                        ? 'Заявка отправлена'
                                        : 'Отправить заявку'}
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                ))}

            </Box>

            <StatusSnackbar open={open} onClose={hideSnackbar} snackbar={snackbar} />
        </Box>
    );
}
