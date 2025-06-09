import { useAuthHeaders } from './tokenHooks.js';

export function useDialogSubmitConfig() {
    const authHeaders = useAuthHeaders();

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
                const res = await fetch('http://localhost:8080/task', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...authHeaders,
                    },
                    body: JSON.stringify(data),
                });
                if (!res.ok) {
                    const errData = await res.json();
                    console.error('Ошибка создания задания:', errData);
                    return;
                }
                const result = await res.json();
                console.log('Задание создано:', result);
            } catch (err) {
                console.error('Ошибка сети:', err);
            }
        },
        setPrice: async (data) => {
            console.log('price is set', data);
            // ...
        },
    };
}
