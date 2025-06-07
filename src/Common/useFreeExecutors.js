import { useEffect, useState } from "react";
import axios from "axios";
import { useDecodedToken, useAuthHeaders } from "./tokenHooks.js";

export function useFreeExecutors() {
    const [executors, setExecutors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const decodedToken = useDecodedToken();
    const bandId = decodedToken?.bandId;
    const authHeaders = useAuthHeaders();

    useEffect(() => {
        if (!bandId) {
            setError('useFreeExecutors ошибка: bandId отсутствует');
            setLoading(false);
            return;
        }

        if (!authHeaders.Authorization) {
            console.log('Токен ещё не получен в useFreeExecutors');
            return;
        }

        const fetchExecutors = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get("http://localhost:8080/task/executors", {
                    headers: authHeaders,
                    params: { bandId },
                });
                setExecutors(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchExecutors();
    }, [bandId, authHeaders]);

    return { executors, loading, error };
}
