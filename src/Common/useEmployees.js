import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const useEmployees = (role, status) => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const accessToken = Cookies.get('accessToken');

    useEffect(() => {
        setLoading(true);
        setError(null);

        if (!accessToken) {
            setError('Нет accessToken');
            setLoading(false);
            setEmployees([]);
            return;
        }

        let bandId = null;
        try {
            const decoded = jwtDecode(accessToken);
            bandId = decoded.bandId;
        } catch {
            setError('Невозможно декодировать токен');
            setLoading(false);
            setEmployees([]);
            return;
        }

        if (status === 'pending') {
            const pendingEndpoint = 'http://localhost:8080/request';
            axios.get(pendingEndpoint, {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
                .then(response => {
                    setEmployees(response.data);
                    setLoading(false);
                })
                .catch(err => {
                    if (err.response?.status === 423) {
                        setError('Дон заблокировал базу данных!');
                    } else {
                        setError(err.message || 'Ошибка загрузки данных');
                    }
                    setLoading(false);
                });
        } else if (status === 'active') {
            if (!bandId) {
                setError('bandId не найден в токене');
                setLoading(false);
                setEmployees([]);
                return;
            }
            console.log('активный запрос пошёл');

            const userRole = role === 'Дон' ? 'ADMIN' : 'SOLDIER';
            const activeEndpoint = `http://localhost:8080/band/workers?bandId=${bandId}&userRole=${userRole}`;

            axios.get(activeEndpoint, {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
                .then(response => {
                    console.log('Запрос успешен. /band/workers?', response.data);
                    setEmployees(response.data);
                    setLoading(false);
                })
                .catch(err => {
                    if (err.response?.status === 423) {
                        setError('Дон заблокировал базу данных!');
                    } else {
                        setError(err.message || 'Ошибка загрузки данных');
                    }
                    setLoading(false);
                });
        } else {
            setEmployees([]);
            setError('Неверный статус');
            setLoading(false);
        }
    }, [role, status, accessToken]);

    return { employees, loading, error };
};
