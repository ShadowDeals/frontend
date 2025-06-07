import {useEffect, useMemo, useState} from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export function useDecodedToken() {
    return useMemo(() => {
        const token = Cookies.get('accessToken');
        if (!token) return null;

        try {
            return jwtDecode(token);
        } catch (error) {
            console.error('Ошибка при декодировании токена:', error);
            return null;
        }
    }, []);
}

export function useAccessToken() {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const accessToken = Cookies.get('accessToken');
        setToken(accessToken || null);
    }, []);

    return token;
}

export function useAuthHeaders() {
    const token = useAccessToken();

    return useMemo(() => {
        return token ? { Authorization: `Bearer ${token}` } : {};
    }, [token]);
}
