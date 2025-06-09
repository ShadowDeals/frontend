import {
    PendingApplyOrderCard,
    PendingPaymentOrderCard,
    PendingEmployeesOrderCard,
    InProgressOrderCard, DoneOrderCard
} from "./Cards.jsx";

export function getAdminTabsConfig(currentTaskInfos,
                                   openOrderDetailsDialog,
                                   openAssignExecutorsDialog,
                                   openSetPriceDialog,
                                   openRejectDialog,
                                   openReportViewDialog) {
    return [
        {
            index: 0,
            label: 'Ожидающие подтверждения',
            CardComponent: PendingApplyOrderCard,
            onReject: openRejectDialog,
            onMoreInfo: openOrderDetailsDialog,
            onSetPrice: openSetPriceDialog,
            taskInfos: currentTaskInfos,
        },
        {
            index: 1,
            label: 'Ожидающие оплаты',
            CardComponent: PendingPaymentOrderCard,
            onReject: openRejectDialog,
            onMoreInfo: openOrderDetailsDialog,
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
            taskInfos: currentTaskInfos,
        },
        {
            index: 4,
            label: 'Завершенные',
            CardComponent: DoneOrderCard,
            onMoreInfo: openOrderDetailsDialog,
            onViewReport: openReportViewDialog,
            taskInfos: currentTaskInfos,
        },
    ];
}

export function getSoldierTabsConfig(currentTaskInfos, openOrderDetailsDialog, openReportDialog, openReportViewDialog) {
    return [
        {
            index: 0,
            label: 'Назначенные мне',
            CardComponent: InProgressOrderCard,
            onMoreInfo: openOrderDetailsDialog,
            onReportCompletion: openReportDialog,
            taskInfos: currentTaskInfos,
        },
        {
            index: 1,
            label: 'Завершенные мной',
            CardComponent: DoneOrderCard,
            onMoreInfo: openOrderDetailsDialog,
            onViewReport: openReportViewDialog,
            taskInfos: currentTaskInfos,
        },
    ];
}

export function getUserTabsConfig(currentTaskInfos,
                                  openOrderDetailsDialog,
                                  openPaymentDialog,
                                  openRejectDialog,
                                  openReportViewDialog) {
    return [
        {
            index: 0,
            label: 'Ожидающие подтверждения',
            CardComponent: PendingApplyOrderCard,
            onReject: openRejectDialog,
            onMoreInfo: openOrderDetailsDialog,
            taskInfos: currentTaskInfos,
        },
        {
            index: 1,
            label: 'Ожидающие оплаты',
            CardComponent: PendingPaymentOrderCard,
            onReject: openRejectDialog,
            onMoreInfo: openOrderDetailsDialog,
            onPay: openPaymentDialog,
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
            onViewReport: openReportViewDialog,
            taskInfos: currentTaskInfos,
        },
    ];
}
