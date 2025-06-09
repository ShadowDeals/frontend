import React, { useEffect, useState } from 'react';
import {Box, Typography, Card, CardContent, Stack, Button} from '@mui/material';
import axios from "axios";
import Cookies from "js-cookie";

const FindGang = () => {
    const [submitted, setSubmitted] = useState([]); // массив строк: regionName
    const [gangs, setGangs] = useState([]);
    const [loading, setLoading] = useState(true);
    const accessToken = Cookies.get('accessToken');

    const handleApply = (regionName) => {
        setSubmitted((prev) => [...prev, regionName]);
        // Здесь можно добавить POST-запрос на отправку заявки
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [gangsRes, ownRequestsRes] = await Promise.all([
                    axios.get('http://localhost:8080/region?isBandExist=true'),
                    axios.get('http://localhost:8080/request/own', {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        }
                    })
                ]);

                const gangList = gangsRes.data || [];
                const ownRequests = ownRequestsRes.data;

                const submittedRegions = Array.isArray(ownRequests)
                    ? ownRequests.map(r => r.bandRegion)
                    : [];

                setGangs(gangList);
                setSubmitted(submittedRegions);
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [accessToken]);

    return (
        <Box sx={{ width: '100%', height: '100%', padding: 4 }}>
            <Typography variant="h5" textAlign={'right'} sx={{ marginBottom: 2 }}>
                Найди свою банду
            </Typography>

            <Box
                sx={{
                    width: '100%',
                    height: '80%',
                    overflowY: 'auto',
                    border: '1px solid #900000',
                    padding: 2,
                }}
            >
                {gangs.map((gang, index) => (
                    <Card
                        key={gang.id || gang}
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
                                    {gang}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={() => handleApply(gang)}
                                    disabled={submitted.includes(gang)}
                                >
                                    {submitted.includes(gang) ? 'Заявка отправлена' : 'Отправить заявку'}
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default FindGang;
