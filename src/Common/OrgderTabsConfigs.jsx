import { PendingApplyOrderCard } from "../Admin/PendingApplyOrderCard.jsx";
import PendingEmployeesOrderCard from "../Admin/PendingEmployeesOrderCard.jsx";
import { InProgressOrderCard } from "../Admin/InProgressOrderCard.jsx";
import { DoneOrderCard } from "../Admin/DoneOrderCard.jsx";
import { PendingPaymentOrderCard } from "../Admin/PendingPaymentOrderCard.jsx";

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
            onAssignEmployee: () => {},
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
