import {useEffect, useState, useCallback} from "react";
import {useAuthHeaders, useDecodedToken} from "./tokenHooks.js";
import axios from "axios";
import {API_BASE} from "../baseUrl.js";


export function useTaskByStatus({taskStatus, showSnackbar}) {
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
            const {data} = await axios.get(`${API_BASE}/api/task`, {
                headers: authHeaders,
                params: {bandId, taskStatus},
            });

            setTasks(data.length === 0 ? [] : data);
            // showSnackbar({
            //     type: 'success',
            //     text: 'Успешно загружено!'
            // });
        } catch (err) {
            setError(err);
            if (err.response?.status === 423) {
                showSnackbar({
                    type: 'error',
                    text: 'Дон заблокировал базу данных!'
                });
            } else {
                showSnackbar({
                    type: 'error',
                    text: 'Произошла ошибка при загрузке задач.'
                });
            }
        } finally {
            setLoading(false);
        }
    }, [bandId, taskStatus, authHeaders, showSnackbar]);

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

function useTaskByStatusWithRole({status, role, showSnackbar}) {
    const cancelledStatuses = [
        TASK_STATUS_LABELS.CANCELED_BY_ADMIN,
        TASK_STATUS_LABELS.CANCELED_BY_USER,
    ];

    const isCancelledStatus = cancelledStatuses.includes(status);
    const isSoldier = role === 'Солдат';

    const result = useTaskByStatus({taskStatus: status, showSnackbar});

    if (isCancelledStatus && isSoldier) {
        return {
            ...result,
            tasks: [],
            refetch: () => {
            },
        };
    }

    return result;
}

export function useTasks({role, showSnackbar}) {
    const waitingForAccept = useTaskByStatusWithRole({
        status: TASK_STATUS_LABELS.WAITING_FOR_ACCEPT,
        role,
        showSnackbar
    });
    const waitingForPayment = useTaskByStatusWithRole({
        status: TASK_STATUS_LABELS.WAITING_FOR_PAYMENT,
        role,
        showSnackbar
    });
    const waitingForEmployee = useTaskByStatusWithRole({
        status: TASK_STATUS_LABELS.WAITING_FOR_ASSIGNMENT,
        role,
        showSnackbar
    });
    const inProgress = useTaskByStatusWithRole({status: TASK_STATUS_LABELS.IN_WORK, role, showSnackbar});
    const finished = useTaskByStatusWithRole({status: TASK_STATUS_LABELS.FINISHED, role, showSnackbar});
    const failed = useTaskByStatusWithRole({status: TASK_STATUS_LABELS.FAILED, role, showSnackbar});
    const cancelledByAdmin = useTaskByStatusWithRole({
        status: TASK_STATUS_LABELS.CANCELED_BY_ADMIN,
        role,
        showSnackbar
    });
    const cancelledByUser = useTaskByStatusWithRole({status: TASK_STATUS_LABELS.CANCELED_BY_USER, role, showSnackbar});

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