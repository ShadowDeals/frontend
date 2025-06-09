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
        createOrder: async ({newTask}) => {
            console.log('createOrder: ', );
            try {
                const res = await axios.post('http://localhost:8080/task', newTask, {
                    headers: {
                        'Content-Type': 'application/json',
                        ...authHeaders,
                    },
                });
                console.log('Задание создано:', res.data);
                return {
                    success: true,
                    message: 'Задание успешно создано',
                };
            } catch (err) {
                if (err.response) {
                    console.error('Ошибка создания задания:', err.response.data);
                } else {
                    console.error('Ошибка сети:', err.message);
                }
                return {
                    success: false,
                    message: 'Ошибка создания задания',
                };
            }
        },
        setPrice: async ({ selectedOrder, price }) => {
            console.log('selectedOrder, price  --->', selectedOrder, price.price);
            try {
                const bandId = decodedToken?.bandId || null;

                const params = {
                    taskId: selectedOrder.taskId,
                    bandId,
                    price: Number(price.price),
                };

                console.log('params: ', params);
                const url = `http://localhost:8080/task/price`;

                console.log('URL запроса:', `${url}?${new URLSearchParams(params).toString()}`);

                const res = await axios.put(url, null, {
                    headers: {
                        'Content-Type': 'application/json',
                        ...authHeaders,
                    },
                    params,
                });

                console.log('Цена установлена:', res.data);

                return {
                    success: true,
                    message: 'Цена успешно установлена',
                };
            } catch (err) {
                console.error('Ошибка установки цены:', err?.response?.data || err.message);
                return {
                    success: false,
                    message: 'Ошибка при установке цены',
                };
            }
        },
        payment: async ({ selectedOrder }) => {
            console.log('payment destr: ', selectedOrder);
            try {
                const taskId = selectedOrder?.taskId;
                const bandId = decodedToken?.bandId;

                if (!taskId || !bandId) {
                    console.error('Отсутствуют необходимые параметры: taskId или bandId');
                    return {
                        success: false,
                        message: 'Не удалось выполнить оплату: отсутствует taskId или bandId',
                    };
                }

                const params = {
                    taskId,
                    bandId,
                    taskStatus: 'WAITING_FOR_ASSIGNMENT',
                };

                const url = 'http://localhost:8080/task';

                const res = await axios.put(url, null, {
                    params,
                    headers: {
                        'Content-Type': 'application/json',
                        ...authHeaders,
                    },
                });

                console.log('Задание оплачено:', res.data);

                return {
                    success: true,
                    message: 'Задание успешно оплачено',
                };
            } catch (err) {
                console.error('Ошибка при оплате задания:', err?.response?.data || err.message);
                return {
                    success: false,
                    message: 'Ошибка при оплате задания',
                };
            }
        },
        reject: async ({ selectedOrder, reason }) => {
            console.log('selectedOrder, reason  --->', selectedOrder, reason.reason);
            try {
                const taskId = selectedOrder?.taskId;
                if (!taskId) {
                    console.error('Нет taskId для отмены задания');
                    return {
                        success: false,
                        message: 'ID задания отсутствует',
                    };
                }
                const res = await axios.put(
                    `http://localhost:8080/task/cancel`,
                    { reason: reason.reason },
                    {
                        params: { taskId },
                        headers: {
                            'Content-Type': 'application/json',
                            ...authHeaders,
                        },
                    }
                );

                console.log('Задание отменено:', res.data);

                return {
                    success: true,
                    message: 'Задание успешно отменено',
                };
            } catch (err) {
                console.error('Ошибка отмены задания:', err?.response?.data || err.message);
                return {
                    success: false,
                    message: 'Ошибка при отмене задания',
                };
            }
        },
    };
}
