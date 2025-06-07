import {useEffect, useState} from "react";
import {useAuthHeaders, useDecodedToken} from "../Common/tokenHooks.js";
import axios from "axios";

export function useBandTaskByStatus(taskStatus) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const decodedToken = useDecodedToken();
    const bandId = decodedToken?.bandId;

    const authHeaders = useAuthHeaders();
    useEffect(() => {
        if (!bandId) {
            setError('useBandTaskByStatus ошибка: bandId отсутствует');
            setLoading(false);
            return;
        }

        if (!authHeaders.Authorization) {
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            try {
                console.log('authHeaders приз апроса ', authHeaders);
                const { data } = await axios.get('http://localhost:8080/task', {
                    headers: authHeaders,
                    params: { bandId, taskStatus },
                });
                setTasks(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [taskStatus, bandId, authHeaders]);

    return { tasks, loading, error };
}

