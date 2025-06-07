import * as React from 'react';
import PropTypes from 'prop-types';
import {Tabs,
    Tab,
    Box,
    Pagination,
    Typography,
    Stack,
    Grid
} from "@mui/material";
import {PendingApplyOrderCard} from "./PendingApplyOrderCard.jsx";
import {useMemo, useState} from "react";
import OrderDetailsDialog from "./OrderDetailsDialog.jsx";
import PendingEmployeesOrderCard from "./PendingEmployeesOrderCard.jsx";
import AssignEmployeesDialog from "./AssignEmployeesDialog.jsx";
import {InProgressOrderCard} from "./InProgressOrderCard.jsx";
import {DoneOrderCard} from "./DoneOrderCard.jsx";
import {PendingPaymentOrderCard} from "./PendingPaymentOrderCard.jsx";
import {useBandTasks} from "./useBandTasks.js";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

// const initialCards = new Array(20).fill(null).map((_, i) => ({ id: i + 1 }));
//
const Employees = [
    { id: 1, name: 'Иван Иванов' },
    { id: 2, name: 'Мария Петрова' },
    { id: 3, name: 'Алексей Смирнов' },
    { id: 4, name: 'Елена Кузнецова' },
    { id: 5, name: 'Дмитрий Орлов' },
    { id: 6, name: 'Дмитрий Орлов' },
    { id: 7, name: 'X' },
    { id: 8, name: 'Y' },
    { id: 9, name: 'Z' },
    { id: 10, name: 'W' },
    { id: 11, name: 'A' },
    { id: 12, name: 'B' },
    { id: 13, name: 'C' },
    { id: 14, name: 'D' },
    { id: 15, name: 'E' },
    { id: 16, name: 'F' },
    { id: 17, name: 'G' },
    { id: 18, name: 'H' },
    { id: 19, name: 'I' },

];

function OrdersTabPanel({
                            taskInfos,
                            CardComponent,
                            onReject,
                            onMoreInfo,
                            onSetPrice,
                            onAssignEmployee,
                            onViewReport,
                            onPageChange,
                        }) {
    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Stack spacing={2} sx={{ alignItems: 'center', height: '100%' }}>
                <Box
                    sx={{
                        width: '100%',
                        height: '650px',
                        overflowY: 'auto',
                    }}
                >
                    <Grid
                        container
                        spacing={2}
                        padding={2}
                        columns={12}

                        alignItems="stretch"
                    >
                        {taskInfos.map((taskInfo) => {
                            console.log('taskInfo нихуя не ясно:', taskInfo);
                            return (
                                <Grid key={taskInfo.taskId} size={3}>
                                    <CardComponent
                                        taskInfo={taskInfo}
                                        onReject={() => onReject && onReject(taskInfo.taskId)}
                                        onMoreInfo={() => onMoreInfo && onMoreInfo(taskInfo)}
                                        onSetPrice={() => onSetPrice && onSetPrice(taskInfo)}
                                        onAssignEmployee={() => onAssignEmployee && onAssignEmployee(taskInfo)}
                                        onViewReport={() => onViewReport && onViewReport(taskInfo)}
                                    />
                                </Grid>
                            );
                        })}

                    </Grid>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                    <Pagination count={3} variant="outlined" onChange={onPageChange} shape="rounded" />
                </Box>
            </Stack>
        </Box>
    );
}

OrdersTabPanel.propTypes = {
    cards: PropTypes.array.isRequired,
    CardComponent: PropTypes.elementType.isRequired,
    onReject: PropTypes.func,
    onMoreInfo: PropTypes.func,
    onAssignEmployee: PropTypes.func,
    onPageChange: PropTypes.func.isRequired,
};

export default function OrdersComponent() {

    const {
        waitingForAccept,
        waitingForPayment,
        waitingForEmployee,
        inProgress,
        finished
    } = useBandTasks();

    const taskArrays = [
        waitingForAccept.tasks || [],
        waitingForPayment.tasks || [],
        waitingForEmployee.tasks || [],
        inProgress.tasks || [],
        finished.tasks || [],
    ];
    // console.log('Получили вот такоэ',
    //     taskArrays
    // );
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [page, setPage] = useState(1);
    const taskInfosPerPage = 12;

    const handleChangePage = (_, value) => {
        setPage(value);
    };

    const currentTaskInfos = taskArrays[value] || [];

    console.log('currentTaskInfos, page', page,
        currentTaskInfos
    );

    const paginatedTaskInfos = currentTaskInfos.slice(
        (page - 1) * taskInfosPerPage,
        page * taskInfosPerPage
    );

    console.log('Всего задач:', currentTaskInfos.length);
    console.log('Текущая страница:', page);
    console.log('Срез с', (page - 1) * taskInfosPerPage, 'по', page * taskInfosPerPage);
    console.log('Итоговый массив:', paginatedTaskInfos);


    console.log('paginatedTaskInfos, page', page,
        currentTaskInfos
    );
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderDetailsDialogState, setOrderDetailsDialogState] = useState(false);
    const [assignExecutorsDialogState, setAssignExecutorsDialogState] = useState(false);

    const openOrderDetailsDialog = (order) => {
        setSelectedOrder(order);
        setOrderDetailsDialogState(true);
    };
    const closeOrderDetailsDialog = () => {
        setOrderDetailsDialogState(false);
        setSelectedOrder(null);
    };
    const openAssignExecutorsDialog = (order) => {
        setSelectedOrder(order);
        setAssignExecutorsDialogState(true);
    };
    const closeAssignExecutorsDialog = () => {
        setAssignExecutorsDialogState(false);
        setSelectedOrder(null);
    };
    const saveAssignExecutorsDialog = () => {
        console.log('Нажата кнопка assign executors');

    };


    const tabsConfig = useMemo(() => [
        {
            index: 0,
            CardComponent: PendingApplyOrderCard,
            onReject: (id) => {
                console.log('Reject order', id);
            },
            onMoreInfo: (card) => {
                console.log('Open order details', card);
                openOrderDetailsDialog(card);
            },
            taskInfos: paginatedTaskInfos,
        },
        // {
        //     index: 1,
        //     CardComponent: PendingPaymentOrderCard,
        //     onReject: (id) => {
        //         console.log('Cancel deal', id);
        //     },
        //     onMoreInfo: (card) => {
        //         console.log('Open order details', card);
        //         openOrderDetailsDialog(card);
        //     },
        //     onSetPrice: (card) => {
        //         console.log('Open setting price', card);
        //     },
        //     cards: paginatedCards,
        // },
        // {
        //     index: 2,
        //     CardComponent: PendingEmployeesOrderCard,
        //     onMoreInfo: (card) => {
        //         console.log('Open order details', card);
        //         openOrderDetailsDialog(card);
        //     },
        //     onAssignEmployee: (card) => {
        //         console.log('Assign employee', card);
        //         openAssignExecutorsDialog(card);
        //     },
        //     cards: paginatedCards,
        // },
        // {
        //     index: 3,
        //     CardComponent: InProgressOrderCard,
        //     onMoreInfo: (card) => {
        //         console.log('Open order details', card);
        //         openOrderDetailsDialog(card);
        //     },
        //     onAssignEmployee: (card) => {
        //         console.log('Assign employee', card);
        //     },
        //     cards: paginatedCards,
        // },
        // {
        //     index: 4,
        //     CardComponent: DoneOrderCard,
        //     onMoreInfo: (id) => {
        //         console.log('Open order details', id);
        //         openOrderDetailsDialog(id);
        //     },
        //     onViewReport: (id) => {
        //         console.log('View report', id);
        //     },
        //     cards: paginatedCards,
        // },
    ], [paginatedTaskInfos]);

    return (
        <Box sx={{ height: '100%', width:'100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    TabIndicatorProps={{ style: { display: 'none' } }}
                    value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Ожидающие подтверждения" {...a11yProps(0)} />
                    <Tab label="Ожидающие оплаты" {...a11yProps(1)} />
                    <Tab label="Ожидающие назначения" {...a11yProps(2)} />
                    <Tab label="В работе" {...a11yProps(3)} />
                    <Tab label="Завершенные" {...a11yProps(4)} />
                </Tabs>
            </Box>
            {tabsConfig.map(({ index, CardComponent, onReject, onMoreInfo, onSetPrice, onAssignEmployee, onViewReport, taskInfos }) => (
                <CustomTabPanel key={index} value={value} index={index}>
                    <OrdersTabPanel
                        taskInfos={taskInfos}
                        CardComponent={CardComponent}
                        onReject={onReject}
                        onMoreInfo={onMoreInfo}
                        onSetPrice={onSetPrice}
                        onAssignEmployee={onAssignEmployee}
                        onViewReport={onViewReport}
                        onPageChange={handleChangePage}
                    />
                </CustomTabPanel>
            ))}
            <AssignEmployeesDialog employees={Employees}
                                   open={assignExecutorsDialogState}
                                   onSave={saveAssignExecutorsDialog}
                                   onClose={closeAssignExecutorsDialog}
                                   order={selectedOrder}
            ></AssignEmployeesDialog>
            <OrderDetailsDialog
                open={orderDetailsDialogState}
                onClose={closeOrderDetailsDialog}
                order={selectedOrder} />
        </Box>
    );
}