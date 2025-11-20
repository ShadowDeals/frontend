import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthHeaders } from './tokenHooks.js';

export function useTaskReport(taskId) {
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const authHeaders = useAuthHeaders();

    useEffect(() => {
        if (!authHeaders.Authorization) {
            setError('authHeaders отсутствует');
            return;
        }
        if (!taskId) return;

        const fetchReport = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8080/task/report', {
                    headers: authHeaders,
                    params: { taskId },
                });
                setReport(response.data);
                setError(null);
                console.log('Успешно загружен reportView: ');
            } catch (err) {
                console.log('Ошибка загрузки reportView: ', err);
                setError(err);
                setReport(null);
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [taskId, authHeaders]);

    return { report, loading, error };
}
