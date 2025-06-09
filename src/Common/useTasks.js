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
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const decodedToken = useDecodedToken();
    const bandId = decodedToken?.bandId || null;
    const authHeaders = useAuthHeaders();

    const fetchData = useCallback(async () => {
        if (!authHeaders.Authorization) {
            setError('authHeaders отсутствует');
            return;
        }

        setLoading(true);
        try {
            const { data } = await axios.get('http://localhost:8080/task', {
                headers: authHeaders,
                params: { bandId, taskStatus },
            });

            setTasks(data.length === 0 ? [] : data);
            // setTasks(data.length === 0 ? mockedTasks : data);
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
    CANCELED_BY_ADMIN: "CANCELED_BY_ADMIN",
    CANCELED_BY_USER: "CANCELED_BY_USER",
    FAILED: "FAILED"

};

function useTaskByStatusWithRole(status, role) {
    const cancelledStatuses = [
        TASK_STATUS_LABELS.CANCELED_BY_ADMIN,
        TASK_STATUS_LABELS.CANCELED_BY_USER,
    ];

    const isCancelledStatus = cancelledStatuses.includes(status);
    const isSoldier = role === 'Солдат';

    const result = useTaskByStatus(status);

    if (isCancelledStatus && isSoldier) {
        return {
            ...result,
            tasks: [],
            refetch: () => {},
        };
    }

    return result;
}

export function useTasks({ role }) {
    const waitingForAccept = useTaskByStatusWithRole(TASK_STATUS_LABELS.WAITING_FOR_ACCEPT, role);
    const waitingForPayment = useTaskByStatusWithRole(TASK_STATUS_LABELS.WAITING_FOR_PAYMENT, role);
    const waitingForEmployee = useTaskByStatusWithRole(TASK_STATUS_LABELS.WAITING_FOR_ASSIGNMENT, role);
    const inProgress = useTaskByStatusWithRole(TASK_STATUS_LABELS.IN_WORK, role);
    const finished = useTaskByStatusWithRole(TASK_STATUS_LABELS.FINISHED, role);
    const failed = useTaskByStatusWithRole(TASK_STATUS_LABELS.FAILED, role);
    const cancelledByAdmin = useTaskByStatusWithRole(TASK_STATUS_LABELS.CANCELED_BY_ADMIN, role);
    const cancelledByUser = useTaskByStatusWithRole(TASK_STATUS_LABELS.CANCELED_BY_USER, role);

    const refetchAll = () => {
        waitingForAccept.refetch();
        waitingForPayment.refetch();
        waitingForEmployee.refetch();
        inProgress.refetch();
        finished.refetch();
        failed.refetch();
        cancelledByAdmin.refetch();
        cancelledByUser.refetch();
    };

    return {
        waitingForAccept,
        waitingForPayment,
        waitingForEmployee,
        inProgress,
        finished,
        failed,
        cancelledByAdmin,
        cancelledByUser,
        refetch: refetchAll,
    };
}
// console.log('waitingForAccept:222', waitingForAccept?.tasks);
// console.log('waitingForPayment:222', waitingForPayment?.tasks);
// console.log('waitingForEmployee222:', waitingForEmployee?.tasks);
// console.log('inProgress:222', inProgress?.tasks);
// console.log('finished:222', finished?.tasks);