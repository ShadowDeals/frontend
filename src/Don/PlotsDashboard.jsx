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
                max: Math.max(...data, 5), // зазор
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
                        console.log("authHeaders пока не получены! ", authHeaders);
                        return;
                    }
                    try {
                        const response = await axios.get('http://localhost:8080/band/stats', {
                            headers: authHeaders,
                        });
                        setStats(response.data);
                        console.log('Получены статистические данные: ', response.data);
                    } catch
                        (error) {
                        console.error('Ошибка при загрузке статистики:', error);
                        showSnackbar?.({type: 'error', text: 'Ошибка при загрузке статистики'});
                    } finally {
                        setLoading(false);
                    }
                }
            ;

            fetchStats();
        }, [authHeaders, showSnackbar]
    );

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress/>
            </Box>
        );
    }

    if (!stats) {
        return null;
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%" width="100%">
            <Grid container rowSpacing={3} columns={12} columnSpacing={{padding: 3, xs: 1, sm: 2, md: 3}}>
                <Grid xs={6}>
                    <Stack>
                        <Typography variant="h5" textAlign="center" color="textSecondary">Выполнено
                            заказов</Typography>
                        <ChartsOverviewDemo
                            data={[stats?.completedTasksCount, stats?.tasksCount, Math.max(stats.tasksCount - stats.completedTasksCount, 0)]}
                            xLabels={['Выполнено', 'Всего', 'Провалено']}
                        />
                    </Stack>
                </Grid>
                <Grid xs={6}>
                    <Stack>
                        <Typography variant="h5" textAlign="center" color="textSecondary">Состав
                            сотрудников</Typography>
                        <BasicRadar
                            metrics={['Админы', 'Солдаты', 'Дон']}
                            data={[stats.adminsCount, stats.soldiersCount, 1]}
                        />
                    </Stack>
                </Grid>
                <Grid xs={6}>
                    <Stack>
                        <Typography variant="h5" textAlign="center" color="textSecondary">Выручка, $</Typography>
                        <ChartsOverviewDemo
                            data={[stats.totalPrice]}
                            xLabels={['За весь период']}
                        />
                    </Stack>
                </Grid>
            </Grid>
            <StatusSnackbar open={open} onClose={hideSnackbar} snackbar={snackbar}/>
        </Box>
    );
};

export default PlotsDashboard;
