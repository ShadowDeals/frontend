import {useEffect, useState} from 'react';
import axios from 'axios';
import {useAuthHeaders} from './tokenHooks.js';
import {API_BASE} from "../baseUrl.js";

export const useGangInfo = () => {
    const [regions, setRegions] = useState([]);
    const [ownRegions, setOwnRegions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState({status: '', message: ''});
    const authHeaders = useAuthHeaders();
    console.log(authHeaders);

    useEffect(() => {
        if (!authHeaders?.Authorization) {
            return;
        }

        const fetchData = async () => {
            try {
                const [regionsRes, requestsRes] = await Promise.all([
                    axios.get(`${API_BASE}/api/region?isBandExist=true`),
                    axios.get(`${API_BASE}/api/request/own`, {
                        headers: authHeaders
                    })
                ]);

                const regionsData = regionsRes.data || [];
                const requestsData = requestsRes.data || [];

                const userRegions = Array.isArray(requestsData)
                    ? requestsData.map(req => req.bandRegion)
                    : [];

                setRegions(regionsData);
                setOwnRegions(userRegions);
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
                setResponse({
                    status: 'error',
                    message: 'Не удалось загрузить данные о регионах и заявках.'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [authHeaders]);

    return {regions, ownRegions, loading, response};
};
