import {useAuthHeaders, useDecodedToken} from './tokenHooks.js';
import axios from 'axios';

export function useDialogSubmitConfig() {
    const authHeaders = useAuthHeaders();
    const decodedToken = useDecodedToken();
    return {
        orderDetails: async (data) => {
            console.log('submit orderDetails', data);
            // ...
        },
        assignExecutors: async (data) => {
            console.log('submit assignExecutors', data);
            // ...
        },
        report: async (data) => {
            console.log('submit report', data);
            // ...
        },
        createOrder: async (data) => {
            try {
                const res = await axios.post('http://localhost:8080/task', data, {
                    headers: {
                        'Content-Type': 'application/json',
                        ...authHeaders,
                    },
                });
                console.log('Задание создано:', res.data);
            } catch (err) {
                if (err.response) {
                    console.error('Ошибка создания задания:', err.response.data);
                } else {
                    console.error('Ошибка сети:', err.message);
                }
            }
        },
        setPrice: async (taskInfo, price) => {
            try {
                const bandId = decodedToken?.bandId || null;

                const params = {
                    taskId: taskInfo.taskId,
                    bandId: bandId,
                    taskStatus: 'WAITING_FOR_PAYMENT',
                };

                const url = 'http://localhost:8080/task';

                console.log('bandId:', bandId);
                console.log('taskId:', taskInfo.taskId);
                console.log('URL запроса:', `${url}?${new URLSearchParams(params).toString()}`);

                const res = await axios.put(url, null, {
                    headers: {
                        'Content-Type': 'application/json',
                        ...authHeaders,
                    },
                    params,
                });

                console.log('Цена установлена:', res.data);

            } catch (err) {
                if (err.response) {
                    console.error('Ошибка установки цены:', err.response.data);
                } else {
                    console.error('Ошибка сети при установке цены:', err.message);
                }
            }
        },
        payment: async (data) => {
            console.log(' pay via config Цена установлена!', data);

            return {
                success: true,
                message: 'snackbar payment message!',
            };
        },
    };
}
