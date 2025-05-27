import React from 'react';
import {Box, Grid, Stack, Typography,} from '@mui/material';
import { BarChart, LineChart, Unstable_RadarChart as RadarChart } from '@mui/x-charts';



export function ChartsOverviewDemo() {
    return (
        <BarChart
            series={[
                { data: [35, 44, 24, 34] },
                { data: [51, 6, 49, 30] },
                { data: [15, 25, 30, 50] },
                { data: [60, 50, 15, 25] },
            ]}
            height={290}
            xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'] }]}
        />
    );
}

export function BasicLineChart() {
    return (
        <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
                {
                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                },
            ]}
            height={300}
        />
    );
}

export function BasicRadar() {
    return (
        <RadarChart
            height={200}
            sx={{height: '100%', width: '100%'}}
            series={[{ label: 'Lisa', data: [120, 98, 86, 99, 85, 65] }]}
            radar={{
                max: 120,
                metrics: ['Math', 'Chinese', 'English', 'Geography', 'Physics', 'History'],
            }}
        />
    );
}

const DonDashboard = () => {
    return (
        <Grid container rowSpacing={3} size={'sm'} columnSpacing={{padding:3, xs: 1, sm: 2, md: 3 }}>
            <Grid size={6}>
                <Stack>
                    <Typography variant="h5" sx={{textAlign:'center'}} color="textSecondary">Выполнено заказов</Typography>
                    <ChartsOverviewDemo/>
                </Stack>
            </Grid>
            <Grid size={6}>
                <Stack>
                    <Typography variant="h5" sx={{textAlign:'center'}} color="textSecondary">Выручка, $</Typography>
                    <BasicLineChart/>
                </Stack>
            </Grid>
            <Grid size={6}>
                <Stack>
                    <Typography variant="h5" sx={{textAlign:'center'}} color="textSecondary">Доходы по категориям</Typography>
                    <BasicRadar/>
                </Stack>
            </Grid>
            <Grid size={6}>
                <Stack>
                    <Typography variant="h5" sx={{textAlign:'center'}} color="textSecondary">Всего сотрудников</Typography>
                    <ChartsOverviewDemo/>
                </Stack>
            </Grid>
        </Grid>
    );
};


export default DonDashboard;
