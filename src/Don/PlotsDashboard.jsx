import React, {useEffect, useState} from 'react';
import {Box, Grid, Stack, Typography} from '@mui/material';
import {BarChart, Unstable_RadarChart as RadarChart} from '@mui/x-charts';
import {useAuthHeaders} from "../Common/tokenHooks.js";
import CircularProgress from "@mui/material/CircularProgress";
import StatusSnackbar from "../Common/StatusSnackbar.jsx";
import axios from "axios";
import {useSnackbar} from "../Common/useSnackbar.js";

export function ChartsOverviewDemo({data = [], xLabels = []}) {
    return (
        <BarChart
            series={[{data}]}
            height={290}
            xAxis={[{data: xLabels}]}
        />
    );
}

export function BasicRadar({metrics = [], data = []}) {
    return (
        <RadarChart
            height={200}
            sx={{height: '100%', width: '100%'}}
            series={[{label: 'Всего', data}]}
            radar={{
                max: Math.max(...data, 5),
                metrics,
            }}
        />
    );
}

const PlotsDashboard = () => {
    const authHeaders = useAuthHeaders();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const {
        open,
        snackbar,
        showSnackbar,
        hideSnackbar
    } = useSnackbar();

    useEffect(() => {
        const fetchStats = async () => {
            if (!authHeaders.Authorization) {
                setLoading(false);
                console.log("authHeaders пока не получены! ", authHeaders);
                return;
            }
            try {
                const response = await axios.get('http://localhost:8080/band/stats', {
                    headers: authHeaders,
                });
                setStats(response.data);
                console.log('Получены статистические данные: ', response.data);
                showSnackbar({ type: 'success', text: 'Получение статистики успешно' });
            } catch (error) {
                if (error.response?.status === 423) {
                    showSnackbar({ type: 'error', text: 'Дон заблокировал базу данных! ' });
                } else {
                    showSnackbar({ type: 'error', text: 'Ошибка' });
                }
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [authHeaders, showSnackbar]);

    return (
        <>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <CircularProgress />
                </Box>
            ) : stats ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%" width="100%">
                    <Grid container rowSpacing={3} columns={12} columnSpacing={{ padding: 3, xs: 1, sm: 2, md: 3 }}>
                        <Grid xs={6}>
                            <Stack>
                                <Typography variant="h5" textAlign="center" color="textSecondary">
                                    Выполнено заказов
                                </Typography>
                                <ChartsOverviewDemo
                                    data={[
                                        stats?.completedTasksCount,
                                        stats?.tasksCount,
                                        Math.max(stats.tasksCount - stats.completedTasksCount, 0)
                                    ]}
                                    xLabels={['Выполнено', 'Всего', 'Провалено']}
                                />
                            </Stack>
                        </Grid>
                        <Grid xs={6}>
                            <Stack>
                                <Typography variant="h5" textAlign="center" color="textSecondary">
                                    Состав сотрудников
                                </Typography>
                                <BasicRadar
                                    metrics={['Админы', 'Солдаты', 'Дон']}
                                    data={[stats.adminsCount, stats.soldiersCount, 1]}
                                />
                            </Stack>
                        </Grid>
                        <Grid xs={6}>
                            <Stack>
                                <Typography variant="h5" textAlign="center" color="textSecondary">
                                    Выручка, $
                                </Typography>
                                <ChartsOverviewDemo
                                    data={[stats.totalPrice]}
                                    xLabels={['За весь период']}
                                />
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            ) : (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <Typography variant="h6">Данные недоступны</Typography>
                </Box>
            )}
            <StatusSnackbar open={open} onClose={hideSnackbar} snackbar={snackbar} />
        </>
    );
};

export default PlotsDashboard;
