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
import {getAdminTabsConfig, getSoldierTabsConfig, getUserTabsConfig} from './OrderTabsConfigs.js';


import {useMemo, useState} from "react";
import OrderDetailsDialog from "./OrderDetailsDialog.jsx";
import AssignEmployeesDialog from "../Admin/AssignEmployeesDialog.jsx"
import {useTasks} from "./useTasks.js";
import ReportDialog from "../Soldier/ReportDialog.jsx";
import CreateOrderDialog from "../User/CreateOrderDialog.jsx";
import {useDialogSubmitConfig} from "./useDialogSubmitConfig.js";
import PriceSetDialog from "../Admin/SetPriceDialog.jsx";

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


    console.log('a сюда что дошло', taskInfos, role);
    console.log('Всего задач:', taskInfos.length);
    // console.log('Текущая страница:', page);
    // console.log('Срез с', (page - 1) * taskInfosPerPage, 'по', page * taskInfosPerPage);
    // console.log('Итоговый массив:', currentTaskInfos);

    const [page, setPage] = useState(1);
    const taskInfosPerPage = 12;

    const pageCount = Math.ceil((taskInfos?.length || 0) / taskInfosPerPage);


    console.log('pageCount', taskInfos?.length, pageCount);

    const paginatedTaskInfos = taskInfos.slice(
        (page - 1) * taskInfosPerPage,
        page * taskInfosPerPage
    );
    console.log('Количество страниц:', pageCount, taskInfos.length);
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
                        spacing={2}
                        padding={2}
                        columns={12}

                        alignItems="stretch"
                    >
                        {paginatedTaskInfos.map((taskInfo) => {
                            return (
                                <Grid key={taskInfo.taskId} size={3}>
                                    <CardComponent
                                        role={role}
                                        taskInfo={taskInfo}
                                        onReject={() => onReject?.(taskInfo.taskId)}
                                        onMoreInfo={() => onMoreInfo?.(taskInfo)}
                                        onSetPrice={() => onSetPrice?.(taskInfo)}
                                        onPay={() => onPay?.(taskInfo.taskId)}
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
        waitingForAccept,
        waitingForPayment,
        waitingForEmployee,
        inProgress,
        finished,
    } = useTasks(role);

    const roleTabsMap = React.useMemo(() => {
        const commonTabs = [
            waitingForAccept?.tasks || [],
            waitingForPayment?.tasks || [],
            waitingForEmployee?.tasks || [],
            inProgress?.tasks || [],
            finished?.tasks || []
        ];

        return {
            'Пользователь': commonTabs,
            'Администратор': commonTabs,
            'Солдат': [
                inProgress?.tasks || [],
                finished?.tasks || []
            ]
        };
    }, [
        waitingForAccept?.tasks,
        waitingForPayment?.tasks,
        waitingForEmployee?.tasks,
        inProgress?.tasks,
        finished?.tasks
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
        setPrice: false
    });

    const openDialog = (dialogName, order) => {
        console.log('Открываем диалог: ', dialogName);
        setSelectedOrder(order);
        setDialogsState((prev) => ({...prev, [dialogName]: true}));
    };

    const closeDialog = (dialogName) => {
        console.log('closeDialog: ', dialogName);
        setDialogsState((prev) => ({...prev, [dialogName]: false}));
    };

    const dialogSubmitConfig = useDialogSubmitConfig();
    const submitDialog = (dialogName, data) => {
        const onSubmit = dialogSubmitConfig[dialogName];
        if (typeof onSubmit === 'function') {
            onSubmit(data);
        } else {
            console.warn(`onSubmit для диалога ${dialogName} не определён`);
        }
    };

    const tabsConfig = useMemo(() => {
        if (role === 'Солдат') {
            return getSoldierTabsConfig(currentTaskInfos,
                (order) => openDialog('orderDetails', order),
                (order) => openDialog('reportDialog', order));
        } else if (role === 'Пользователь') {
            return getUserTabsConfig(currentTaskInfos,
                (order) => openDialog('orderDetails', order));
        } else if (role === 'Администратор') {
            return getAdminTabsConfig(currentTaskInfos, (order) => openDialog('orderDetails', order),
                (order) => openDialog('assignExecutors', order),
                (order) => openDialog('setPrice', order));
        }
    }, [role, currentTaskInfos]);


    // console.log('wtf', currentTaskInfos);
    // console.log('wtf2', tabsConfig);

    return (
        <Box sx={{height: '100%', width: '100%'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Tabs
                    TabIndicatorProps={{style: {display: 'none'}}}
                    value={tabNum}
                    onChange={(event, newValue) => {
                        setTabNum(newValue);
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
            <AssignEmployeesDialog open={dialogsState['assignExecutors']}
                                   onSave={() => {
                                       console.log('Нажата кнопка assign executors');
                                   }}
                                   onClose={() => closeDialog('assignExecutors')}
                                   taskInfo={selectedOrder}
            >
            </AssignEmployeesDialog>
            <OrderDetailsDialog
                open={dialogsState['orderDetails']}
                onClose={() => closeDialog('orderDetails')}
                taskInfo={selectedOrder}/>
            <ReportDialog
                open={dialogsState['report']}
                onClose={() => closeDialog('report')}
                onSubmit={() => {
                    console.log('form submitted')
                    dialogsState['report'] = false;
                }}
                taskInfo={selectedOrder}
            />
            {role === 'Пользователь' &&
                <CreateOrderDialog
                    open={dialogsState['createOrder']}
                    onSubmit={(formData) => submitDialog('createOrder', formData)}
                    onClose={() => closeDialog('createOrder')}
                />}
            {role === 'Администратор' &&
            <PriceSetDialog
                open={dialogsState['setPrice']}
                onSubmit={(formData) => submitDialog('setPrice', formData)}
                onClose={() => closeDialog('setPrice')}
            />
            }
        </Box>
    );
}