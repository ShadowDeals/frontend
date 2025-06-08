import {
    PendingApplyOrderCard,
    PendingPaymentOrderCard,
    PendingEmployeesOrderCard,
    InProgressOrderCard, DoneOrderCard
} from "./Cards.jsx";

export function getAdminTabsConfig(currentTaskInfos, openOrderDetailsDialog, openAssignExecutorsDialog) {
    return [
        {
            index: 0,
            label: 'Ожидающие подтверждения',
            CardComponent: PendingApplyOrderCard,
            onReject: (id) => console.log('Reject order', id),
            onMoreInfo: openOrderDetailsDialog,
            taskInfos: currentTaskInfos,
        },
        {
            index: 1,
            label: 'Ожидающие оплаты',
            CardComponent: PendingPaymentOrderCard,
            onReject: (id) => console.log('Cancel deal', id),
            onMoreInfo: openOrderDetailsDialog,
            onSetPrice: (card) => console.log('Set price', card),
            taskInfos: currentTaskInfos,
        },
        {
            index: 2,
            label: 'Ожидающие назначения',
            CardComponent: PendingEmployeesOrderCard,
            onMoreInfo: openOrderDetailsDialog,
            onAssignEmployee: openAssignExecutorsDialog,
            taskInfos: currentTaskInfos,
        },
        {
            index: 3,
            label: 'В работе',
            CardComponent: InProgressOrderCard,
            onMoreInfo: openOrderDetailsDialog,
            onAssignEmployee: () => {
            },
            taskInfos: currentTaskInfos,
        },
        {
            index: 4,
            label: 'Завершенные',
            CardComponent: DoneOrderCard,
            onMoreInfo: openOrderDetailsDialog,
            onViewReport: (card) => console.log('View report', card),
            taskInfos: currentTaskInfos,
        },
    ];
}

export function getSoldierTabsConfig(currentTaskInfos, openOrderDetailsDialog) {
    return [
        {
            index: 0,
            label: 'Назначенные мне',
            CardComponent: InProgressOrderCard,
            onMoreInfo: openOrderDetailsDialog,
            onViewReport: (card) => console.log('View report', card),
            taskInfos: currentTaskInfos,
        },
        {
            index: 1,
            label: 'Завершенные мной',
            CardComponent: DoneOrderCard,
            onMoreInfo: openOrderDetailsDialog,
            onViewReport: (card) => console.log('View report', card),
            taskInfos: currentTaskInfos,
        },
    ];
}

export function getUserTabsConfig(currentTaskInfos, openOrderDetailsDialog) {
    console.log('tracing currTI', currentTaskInfos);
    return [
        {
            index: 0,
            label: 'Ожидающие подтверждения',
            CardComponent: PendingApplyOrderCard,
            onReject: (id) => console.log('Reject order', id),
            onMoreInfo: openOrderDetailsDialog,
            taskInfos: currentTaskInfos,
        },
        {
            index: 1,
            label: 'Ожидающие оплаты',
            CardComponent: PendingPaymentOrderCard,
            onReject: (id) => console.log('Cancel deal', id),
            onMoreInfo: openOrderDetailsDialog,
            onPay: (card) => console.log('Paid successfully', card),
            taskInfos: currentTaskInfos,
        },
        {
            index: 2,
            label: 'Ожидающие назначения',
            CardComponent: PendingEmployeesOrderCard,
            onMoreInfo: openOrderDetailsDialog,
            taskInfos: currentTaskInfos,
        },
        {
            index: 3,
            label: 'В работе',
            CardComponent: InProgressOrderCard,
            onMoreInfo: openOrderDetailsDialog,
            taskInfos: currentTaskInfos,
        },
        {
            index: 4,
            label: 'Завершенные',
            CardComponent: DoneOrderCard,
            onMoreInfo: openOrderDetailsDialog,
            onViewReport: (card) => console.log('View report', card),
            taskInfos: currentTaskInfos,
        },
    ];
}
