import * as React from 'react';
import PropTypes from 'prop-types';
import {
    Tabs,
    Tab,
    Box,
    Pagination,
    Stack,
    Grid, Button
} from "@mui/material";
import {getAdminTabsConfig, getSoldierTabsConfig, getUserTabsConfig} from './orderTabsConfigs.js';

import {useMemo, useState} from "react";
import OrderDetailsDialog from "./OrderDetailsDialog.jsx";
import AssignEmployeesDialog from "../Admin/AssignEmployeesDialog.jsx"
import {useTasks} from "./useTasks.js";
import ReportDialog from "../Soldier/ReportDialog.jsx";
import CreateOrderDialog from "../User/CreateOrderDialog.jsx";
import {useDialogSubmitConfig} from "./useDialogSubmitConfig.js";
import PriceSetDialog from "../Admin/SetPriceDialog.jsx";
import PaymentDialog from "../User/PaymentDialog.jsx";
import {useSnackbar} from "./useSnackbar.js";
import StatusSnackbar from "./StatusSnackbar.jsx";
import RejectDialog from "./RejectDialog.jsx";
import ReportViewDialog from "./ReportViewDialog.jsx";

export function CustomTabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{p: 3}}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function OrderTabs({
                       role,
                       taskInfos = [],
                       CardComponent,
                       onReject,
                       onMoreInfo,
                       onSetPrice,
                       onPay,
                       onAssignEmployee,
                       onReportCompletion,
                       onViewReport,
                   }
) {

    // console.log('[OrderTabs] onPay:', onPay, 'typeof:', typeof onPay);
    // console.log('a сюда что дошло', taskInfos, role);
    // console.log('Всего задач:', taskInfos.length);
    // console.log('Текущая страница:', page);
    // console.log('Срез с', (page - 1) * taskInfosPerPage, 'по', page * taskInfosPerPage);
    // console.log('Итоговый массив:', currentTaskInfos);

    const [page, setPage] = useState(1);
    const taskInfosPerPage = 12;

    const pageCount = Math.ceil((taskInfos?.length || 0) / taskInfosPerPage);


    // console.log('pageCount', taskInfos?.length, pageCount);

    const paginatedTaskInfos = taskInfos.slice(
        (page - 1) * taskInfosPerPage,
        page * taskInfosPerPage
    );
    // console.log('Количество страниц:', pageCount, taskInfos.length);
    return (
        <Box sx={{width: '100%', height: '100%'}}>
            <Stack spacing={2} sx={{alignItems: 'center', height: '100%'}}>
                <Box
                    sx={{
                        width: '100%',
                        height: '650px',
                        overflowY: 'auto',
                    }}
                >
                    <Grid
                        container
                        spacing={3}
                        padding={2}
                        columns={12}

                        alignItems="stretch"
                    >
                        {paginatedTaskInfos.map((taskInfo) => {
                            return (
                                <Grid key={taskInfo.taskId} size={4}>
                                    <CardComponent
                                        role={role}
                                        taskInfo={taskInfo}
                                        onReject={() => onReject?.(taskInfo)}
                                        onMoreInfo={() => onMoreInfo?.(taskInfo)}
                                        onSetPrice={() => onSetPrice?.(taskInfo)}
                                        onPay={() => onPay?.(taskInfo)}
                                        onReportCompletion={() => onReportCompletion?.(taskInfo)}
                                        onAssignEmployee={() => onAssignEmployee?.(taskInfo)}
                                        onViewReport={() => onViewReport?.(taskInfo)}
                                    />
                                </Grid>
                            );
                        })}

                    </Grid>
                </Box>

                <Box sx={{display: 'flex', justifyContent: 'center', py: 2}}>
                    {Number(pageCount) > 0 && (
                        <Pagination
                            count={Number(pageCount)}
                            variant="outlined"
                            onChange={(_, value) => setPage(value)}
                            shape="rounded"
                        />
                    )}
                </Box>
            </Stack>
        </Box>
    );
}

OrderTabs.propTypes = {
    role: PropTypes.string.isRequired,
    cards: PropTypes.array.isRequired,
    CardComponent: PropTypes.elementType.isRequired,
    onReject: PropTypes.func,
    onMoreInfo: PropTypes.func,
    onAssignEmployee: PropTypes.func,
    onPageChange: PropTypes.func.isRequired,
};

// console.log('role:', role);
// console.log('waitingForAccept:', waitingForAccept?.tasks);
// console.log('waitingForPayment:', waitingForPayment?.tasks);
// console.log('waitingForEmployee:', waitingForEmployee?.tasks);
// console.log('inProgress:', inProgress?.tasks);
// console.log('finished:', finished?.tasks);
// console.log('roleTabsMap:', roleTabsMap);
// console.log('Tabs for current role:', roleTabsMap[role]);

export default function OrdersComponent({role}) {
    const {
        open,
        snackbar,
        showSnackbar,
        hideSnackbar,
    } = useSnackbar();

    const {
        waitingForAccept,
        waitingForPayment,
        waitingForEmployee,
        inProgress,
        finished,
        failed,
        cancelledByAdmin,
        cancelledByUser,
        refetch
    } = useTasks({role, showSnackbar});

    const roleTabsMap = React.useMemo(() => {
        const finishedCombined = [
            ...(finished?.tasks || []),
            ...(cancelledByAdmin?.tasks || []),
            ...(cancelledByUser?.tasks || []),
            ...(failed?.tasks || []),
        ];

        console.log('finished: ', finished);
        console.log('cancelledByAdmin: ', cancelledByAdmin);
        console.log('cancelledByUser: ', cancelledByUser);
        console.log('failed: ', failed);

        // const finishedUnique = Array.from(
        //     new Map(finishedCombined.map(task => [task.id, task])).values()
        // );

        console.log('finishedCombined: ', finishedCombined);

        const commonTabs = [
            waitingForAccept?.tasks || [],
            waitingForPayment?.tasks || [],
            waitingForEmployee?.tasks || [],
            inProgress?.tasks || [],
            finishedCombined
        ];

        return {
            'Пользователь': commonTabs,
            'Администратор': commonTabs,
            'Солдат': [
                inProgress?.tasks || [],
                finishedCombined
            ]
        };
    }, [
        waitingForAccept,
        waitingForPayment,
        waitingForEmployee,
        inProgress,
        finished,
        failed,
        cancelledByAdmin,
        cancelledByUser,
    ]);

    const [tabNum, setTabNum] = React.useState(0);

    const currentTaskInfos = React.useMemo(() => {
        return roleTabsMap[role]?.[tabNum] || [];
    }, [roleTabsMap, role, tabNum]);

    const [selectedOrder, setSelectedOrder] = useState(null);

    const [dialogsState, setDialogsState] = useState({
        orderDetails: false,
        assignExecutors: false,
        report: false,
        createOrder: false,
        setPrice: false,
        payment: false,
        reject: false,
        reportView: false,
    });

    const openDialog = (dialogName, order) => {
        console.log('Открываем диалог ', dialogName, 'c order', order);
        setSelectedOrder(order);
        setDialogsState((prev) => ({...prev, [dialogName]: true}));
    };

    const closeDialog = (dialogName) => {
        console.log('closeDialog: ', dialogName);
        setDialogsState((prev) => ({...prev, [dialogName]: false}));
    };

    const dialogSubmitConfig = useDialogSubmitConfig();

    const submitDialog = async (dialogName, args = {}) => {
        const onSubmit = dialogSubmitConfig[dialogName];
        if (typeof onSubmit !== 'function') {
            showSnackbar({type: 'error', text: `onSubmit для диалога ${dialogName} не определён`});
            return;
        }

        const result = await onSubmit(args);

        if (result.success) {
            showSnackbar({type: 'success', text: result.message});
            refetch();
            closeDialog(dialogName);
        } else {
            showSnackbar({type: 'error', text: result.message});
            refetch();
        }
    };

    const tabsConfig = useMemo(() => {
        if (role === 'Солдат') {
            return getSoldierTabsConfig(currentTaskInfos,
                (order) => openDialog('orderDetails', order),
                (order) => openDialog('report', order),
                (order) => {
                    console.log('Эта хрень вызвалась: ');
                    openDialog('reportView', order)
                });
        } else if (role === 'Пользователь') {
            return getUserTabsConfig(currentTaskInfos,
                (order) =>
                    openDialog('orderDetails', order),
                (order) => openDialog('payment', order),
                (order) => openDialog('reject', order),
                (order) => openDialog('reportView', order));
        } else if (role === 'Администратор') {
            return getAdminTabsConfig(currentTaskInfos,
                (order) => openDialog('orderDetails', order),
                (order) => openDialog('assignExecutors', order),
                (order) => openDialog('setPrice', order),
                (order) => openDialog('reject', order),
                (order) => {
                    console.log('Эта хрень вызвалась: ');
                    openDialog('reportView', order)
                });
        }
    }, [role, currentTaskInfos]);

    // console.log('wtf', currentTaskInfos);
    // console.log('wtf2', tabsConfig);
    // console.log('selected order в orderComponent: ', selectedOrder);

    return (
        <Box sx={{height: '100%', width: '100%'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Tabs
                    TabIndicatorProps={{style: {display: 'none'}}}
                    value={tabNum}
                    onChange={(event, newValue) => {
                        setTabNum(newValue);
                        refetch();
                    }}
                    aria-label="tabs by role"
                >
                    {tabsConfig.map(({index, label}) => (
                        <Tab key={index} label={label} {...a11yProps(index)} />
                    ))}
                </Tabs>
                {role === 'Пользователь' && (
                    <Button
                        variant="contained"
                        onClick={() => {
                            openDialog('createOrder')
                        }}
                        sx={{whiteSpace: 'nowrap', ml: 2}}
                    >
                        Создать заказ
                    </Button>
                )}
            </Box>
            {tabsConfig.map(({
                                 index,
                                 CardComponent,
                                 onReject,
                                 onMoreInfo,
                                 onSetPrice,
                                 onPay,
                                 onAssignEmployee,
                                 onReportCompletion,
                                 onViewReport,
                                 taskInfos
                             }) => (
                <CustomTabPanel key={index} value={tabNum} index={index}>
                    <OrderTabs
                        role={role}
                        taskInfos={taskInfos}
                        CardComponent={CardComponent}
                        onReject={onReject}
                        onMoreInfo={onMoreInfo}
                        onSetPrice={onSetPrice}
                        onPay={onPay}
                        onAssignEmployee={onAssignEmployee}
                        onReportCompletion={onReportCompletion}
                        onViewReport={onViewReport}
                    />
                </CustomTabPanel>
            ))}
            {role === 'Администратор' && (
                <AssignEmployeesDialog open={dialogsState['assignExecutors']}
                                       onSubmit={
                                           ({selectedExecutorIds, mainExecutorId}) => submitDialog('assignExecutors',
                                               {
                                                   selectedOrder,
                                                   selectedExecutorIds, mainExecutorId
                                               })
                                       }
                                       onClose={() => closeDialog('assignExecutors')}
                                       taskInfo={selectedOrder}
                >
                </AssignEmployeesDialog>
            )}

            {(role === 'Пользователь' || role === 'Администратор' || role === 'Солдат') &&
                [
                    <ReportViewDialog
                        key="reportView"
                        open={dialogsState['reportView']}
                        onClose={() => closeDialog('reportView')}
                        taskInfo={selectedOrder}
                    />,
                    <OrderDetailsDialog
                        key="orderDetails"
                        open={dialogsState['orderDetails']}
                        onClose={() => closeDialog('orderDetails')}
                        taskInfo={selectedOrder}
                    />
                ]
            }

            {role === 'Солдат' && (
                <ReportDialog
                    open={dialogsState['report']}
                    onClose={() => closeDialog('report')}
                    onSubmit={({reportInfo}) => submitDialog('report', {selectedOrder, reportInfo})}
                    taskInfo={selectedOrder}
                />
            )}
            {role === 'Пользователь' &&
                <CreateOrderDialog
                    open={dialogsState['createOrder']}
                    onSubmit={(newTask) => submitDialog('createOrder', {newTask})}
                    onClose={() => closeDialog('createOrder')}
                />}
            {role === 'Администратор' &&
                <PriceSetDialog
                    open={dialogsState['setPrice']}
                    onSubmit={(price) => submitDialog('setPrice', {selectedOrder, price})}
                    onClose={() => closeDialog('setPrice')}
                    taskInfo={selectedOrder}
                />
            }
            {role === 'Пользователь' &&
                <PaymentDialog
                    open={dialogsState['payment']}
                    onSubmit={async () => await submitDialog('payment', {selectedOrder})}
                    onClose={() => closeDialog('payment')}
                    taskInfo={selectedOrder}
                />}

            {(role === 'Пользователь' || role === 'Администратор') &&
                <RejectDialog
                    open={dialogsState['reject']}
                    onSubmit={async (reason) => await submitDialog('reject', {selectedOrder, reason})}
                    onClose={() => closeDialog('reject')}
                    taskInfo={selectedOrder}
                />}
            <StatusSnackbar
                open={open}
                snackbar={snackbar}
                onClose={hideSnackbar}
            ></StatusSnackbar>
        </Box>
    );
}