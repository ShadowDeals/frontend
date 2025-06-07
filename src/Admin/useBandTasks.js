import { useBandTaskByStatus } from './useTaskByStatus.js';

export const TASK_STATUS_LABELS = {
    IN_WORK: "IN_WORK",
    FINISHED: "FINISHED",
    WAITING_FOR_ACCEPT: "WAITING_FOR_ACCEPT",
    WAITING_FOR_PAYMENT: "WAITING_FOR_PAYMENT",
    WAITING_FOR_ASSIGNMENT: "WAITING_FOR_ASSIGNMENT",
};

export function useBandTasks() {
    const waitingForAccept = useBandTaskByStatus(TASK_STATUS_LABELS.WAITING_FOR_ACCEPT);
    const waitingForPayment = useBandTaskByStatus(TASK_STATUS_LABELS.WAITING_FOR_PAYMENT);
    const waitingForEmployee = useBandTaskByStatus(TASK_STATUS_LABELS.WAITING_FOR_ASSIGNMENT);
    const inProgress = useBandTaskByStatus(TASK_STATUS_LABELS.IN_WORK);
    const finished = useBandTaskByStatus(TASK_STATUS_LABELS.FINISHED);
    const assignedToMe = useBandTaskByStatus(TASK_STATUS_LABELS.IN_WORK);
    return {
        waitingForAccept,
        waitingForPayment,
        waitingForEmployee,
        inProgress,
        finished,
        assignedToMe
    };
}
