import {useEffect, useState, useCallback} from "react";
import {useAuthHeaders, useDecodedToken} from "./tokenHooks.js";
import axios from "axios";

const mockedTasks = [{
    "taskId": "95da87e2-7ec7-43c8-8839-ba4e4d17ee7a",
    "address": "город Mock",
    "description": "Мокированные данные",
    "dateCreated": "2025-06-07T12:54:46.731320Z",
    "taskType": "HIJACKING",
    "taskStatus": "WAITING_FOR_PAYMENT"
}];

export function useTaskByStatus(taskStatus) {
    const [tasks, setTasks] = useState(mockedTasks);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const decodedToken = useDecodedToken();
    const bandId = decodedToken?.bandId || null;
    const authHeaders = useAuthHeaders();

    const fetchData = useCallback(async () => {
        if (!bandId || !authHeaders.Authorization) {
            setError('bandId или authHeaders отсутствует');
            return;
        }

        setLoading(true);
        try {
            const { data } = await axios.get('http://localhost:8080/task', {
                headers: authHeaders,
                params: { bandId, taskStatus },
            });

            setTasks(data.length === 0 ? mockedTasks : data);
        } catch (err) {
            console.log('useTaskByStatusError:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [bandId, taskStatus, authHeaders]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        tasks,
        loading,
        error,
        refetch: fetchData
    };
}


export const TASK_STATUS_LABELS = {
    IN_WORK: "IN_WORK",
    FINISHED: "FINISHED",
    WAITING_FOR_ACCEPT: "WAITING_FOR_ACCEPT",
    WAITING_FOR_PAYMENT: "WAITING_FOR_PAYMENT",
    WAITING_FOR_ASSIGNMENT: "WAITING_FOR_ASSIGNMENT",
};


export function useTasks() {
    const waitingForAccept = useTaskByStatus(TASK_STATUS_LABELS.WAITING_FOR_ACCEPT);
    const waitingForPayment = useTaskByStatus(TASK_STATUS_LABELS.WAITING_FOR_PAYMENT);
    const waitingForEmployee = useTaskByStatus(TASK_STATUS_LABELS.WAITING_FOR_ASSIGNMENT);
    const inProgress = useTaskByStatus(TASK_STATUS_LABELS.IN_WORK);
    const finished = useTaskByStatus(TASK_STATUS_LABELS.FINISHED);

    const refetchAll = () => {
        console.log('Вызвался refetch ВСЕХ заданий!');
        waitingForAccept.refetch();
        waitingForPayment.refetch();
        waitingForEmployee.refetch();
        inProgress.refetch();
        finished.refetch();
    };

    return {
        waitingForAccept,
        waitingForPayment,
        waitingForEmployee,
        inProgress,
        finished,
        refetch: refetchAll
    };
}


// console.log('waitingForAccept:222', waitingForAccept?.tasks);
// console.log('waitingForPayment:222', waitingForPayment?.tasks);
// console.log('waitingForEmployee222:', waitingForEmployee?.tasks);
// console.log('inProgress:222', inProgress?.tasks);
// console.log('finished:222', finished?.tasks);