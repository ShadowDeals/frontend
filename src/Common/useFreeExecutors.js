import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useDecodedToken, useAuthHeaders } from "./tokenHooks.js";

export function useFreeExecutors() {
    const [executors, setExecutors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const decodedToken = useDecodedToken();
    const bandId = decodedToken?.bandId;
    const authHeaders = useAuthHeaders();

    const fetchExecutors = useCallback(async () => {
        if (!bandId) {
            setError("useFreeExecutors ошибка: bandId отсутствует");
            setLoading(false);
            return;
        }

        if (!authHeaders.Authorization) {
            console.log("Токен ещё не получен в useFreeExecutors");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.get("http://localhost:8080/task/executors", {
                headers: authHeaders,
                params: { bandId },
            });
            console.log('executors: ', data);
            setExecutors(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [bandId, authHeaders]);

    useEffect(() => {
        fetchExecutors();
    }, [fetchExecutors]);

    return { executors, loading, error, refetch: fetchExecutors };
}
