import {useCallback, useEffect, useMemo, useState} from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import axios from "axios";

export function useDecodedToken() {
    console.log('useDecodedToken call');
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

export function useRefreshToken() {
    console.log('useRefreshToken call');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const refresh = useCallback(async () => {
        console.log('refresh call');
        const refreshToken = Cookies.get('refreshToken');
        if (!refreshToken) {
            setError('Отсутствует refreshToken');
            return null;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:8080/auth/refresh', {
                refreshToken,
            });

            const { accessToken, accessExpiresAt, refreshToken: newRefreshToken, email } = response.data;

            Cookies.set('accessToken', accessToken, {
                expires: accessExpiresAt / 86400,
                secure: true,
                sameSite: 'Strict',
            });

            if (newRefreshToken) {
                Cookies.set('refreshToken', newRefreshToken, {
                    expires: accessExpiresAt / 86400,
                    secure: true,
                    sameSite: 'Strict',
                });
            }

            if (email) {
                Cookies.set('userEmail', email, {
                    expires: accessExpiresAt / 86400,
                    secure: true,
                    sameSite: 'Strict',
                });
            }

            console.log('Новые токены сохранены:', {
                accessToken,
                accessExpiresAt,
                refreshToken: newRefreshToken,
                email,
            });

            console.log('Декодированные данные в дочернем компоненте: ', jwtDecode(accessToken));

            return accessToken;
        } catch (err) {
            console.error('Ошибка обновления токена:', err);
            setError(err.response?.data?.message || err.message);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return { refresh, loading, error };
}