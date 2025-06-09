import {useAuthHeaders, useDecodedToken} from './tokenHooks.js';
import axios from 'axios';

export function useDialogSubmitConfig() {
    const authHeaders = useAuthHeaders();
    const decodedToken = useDecodedToken();
    return {
        assignExecutors: async ({
                                    selectedOrder,
                                    selectedExecutorIds,
                                    mainExecutorId
                                }) => {
            console.log(
                'submit assignExecutors:',
                'selectedOrder', selectedOrder,
                'selectedExecutorIds', selectedExecutorIds,
                'mainExecutorId', mainExecutorId
            );

            try {
                const taskId = selectedOrder?.taskId;
                const officerId = mainExecutorId;

                if (!taskId || !officerId || !Array.isArray(selectedExecutorIds) || selectedExecutorIds.length === 0) {
                    console.error('Недостаточно данных для назначения исполнителей');
                    return {
                        success: false,
                        message: 'Не удалось назначить исполнителей: проверьте taskId, officerId и список исполнителей',
                    };
                }

                const url = 'http://localhost:8080/task/executors';
                const params = { taskId, officerId };

                const res = await axios.post(url, selectedExecutorIds, {
                    params,
                    headers: {
                        'Content-Type': 'application/json',
                        ...authHeaders,
                    },
                });

                console.log('Исполнители назначены:', res.data);
            } catch (err) {
                console.error('Ошибка при назначении исполнителей:', err?.response?.data || err.message);
                return {
                    success: false,
                    message: 'Ошибка при назначении исполнителей',
                };
            }

            try {
                const taskId = selectedOrder?.taskId;
                const bandId = decodedToken?.bandId;

                console.log('taskId:', taskId);
                console.log('bandId:', bandId);
                console.log('authHeaders:', authHeaders);

                const putUrl = 'http://localhost:8080/task';
                const putParams = {
                    taskId,
                    bandId,
                    taskStatus: 'IN_WORK'
                };

                await axios.put(putUrl, null, {
                    params: putParams,
                    headers: {
                        'Content-Type': 'application/json',
                        ...authHeaders,
                    },
                });

                console.log('Статус задачи обновлён на IN_WORK');

                return {
                    success: true,
                    message: 'Исполнители назначены, статус задачи обновлён',
                };
            } catch (err) {
                console.error('Ошибка при обновлении статуса задачи:', err?.response?.data || err.message);
                return {
                    success: false,
                    message: 'Исполнители назначены, но статус задачи не удалось обновить',
                };
            }
        },
        report: async ({ reportInfo, selectedOrder }) => {
            console.log('submit reportInfo', reportInfo, selectedOrder);

            try {
                const taskId = selectedOrder?.taskId;
                if (!taskId) {
                    console.error('Нет taskId для отчёта');
                    return {
                        success: false,
                        message: 'ID задания отсутствует',
                    };
                }

                const url = `http://localhost:8080/task/report`;
                const params = { taskId };

                const body = {
                    status: reportInfo.status === 'success' ? 'FINISHED' : 'FAILED',
                    description: reportInfo.description,
                    timeSpent: reportInfo.timeSpent,
                };

                const res = await axios.post(url, body, {
                    params,
                    headers: {
                        'Content-Type': 'application/json',
                        ...authHeaders,
                    },
                });

                console.log('Отчёт успешно отправлен:', res.data);

                return {
                    success: true,
                    message: 'Отчёт успешно отправлен',
                };
            } catch (err) {
                console.error('Ошибка при отправке отчёта:', err?.response?.data || err.message);
                return {
                    success: false,
                    message: 'при отправке отчёта',
                };
            }
        },
        createOrder: async ({newTask}) => {
            console.log('createOrder: ', newTask);
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
                    message: 'создания задания',
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
                    message: 'при установке цены',
                };
            }
        },
        payment: async ({ selectedOrder }) => {
            console.log('payment destr: ', selectedOrder);
            try {
                const taskId = selectedOrder?.taskId;

                if (!taskId) {
                    console.error('Отсутствуют необходимые параметры: taskId');
                    return {
                        success: false,
                        message: 'Не удалось выполнить оплату: отсутствует taskId',
                    };
                }

                const params = {
                    taskId,
                };

                const url = 'http://localhost:8080/task/payment';

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
                    message: 'при оплате задания',
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
                    message: 'при отмене задания',
                };
            }
        },
    };
}
