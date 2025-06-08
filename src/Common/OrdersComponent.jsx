import * as React from 'react';
import PropTypes from 'prop-types';
import {
    Tabs,
    Tab,
    Box,
    Pagination,
    Stack,
    Grid
} from "@mui/material";
import {getAdminTabsConfig, getSoldierTabsConfig, getUserTabsConfig} from './OrgderTabsConfigs.js';


import {useMemo, useState} from "react";
import OrderDetailsDialog from "../Admin/OrderDetailsDialog.jsx";
import AssignEmployeesDialog from "../Admin/AssignEmployeesDialog.jsx"
import {useTasks} from "./useTasks.js";

function CustomTabPanel(props) {
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

function a11yProps(index) {
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
                       onAssignEmployee,
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

export default function OrdersComponent({role}) {
    const {
        waitingForAccept,
        waitingForPayment,
        waitingForEmployee,
        inProgress,
        finished,
    } = useTasks(role);

    console.log('role:', role);
    console.log('waitingForAccept:', waitingForAccept?.tasks);
    console.log('waitingForPayment:', waitingForPayment?.tasks);
    console.log('waitingForEmployee:', waitingForEmployee?.tasks);
    console.log('inProgress:', inProgress?.tasks);
    console.log('finished:', finished?.tasks);

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

    console.log('roleTabsMap:', roleTabsMap);
    console.log('Tabs for current role:', roleTabsMap[role]);

    const [tabNum, setTabNum] = React.useState(0);

    const currentTaskInfos = React.useMemo(() => {
        return roleTabsMap[role]?.[tabNum] || [];
    }, [roleTabsMap, role, tabNum]);

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderDetailsDialogState, setOrderDetailsDialogState] = useState(false);
    const [assignExecutorsDialogState, setAssignExecutorsDialogState] = useState(false);

    const openOrderDetailsDialog = (order) => {
        setSelectedOrder(order);
        setOrderDetailsDialogState(true);
    };

    const openAssignExecutorsDialog = (order) => {
        setSelectedOrder(order);
        setAssignExecutorsDialogState(true);
    };


    const tabsConfig = useMemo(() => {
        if (role === 'Солдат') {
            return getSoldierTabsConfig(currentTaskInfos, openOrderDetailsDialog);
        } else if (role === 'Пользователь') {
            return getUserTabsConfig(currentTaskInfos, openOrderDetailsDialog);
        } else if (role === 'Администратор') {
            return getAdminTabsConfig(currentTaskInfos, openOrderDetailsDialog, openAssignExecutorsDialog);
        }
    }, [role, currentTaskInfos]);


    console.log('wtf', currentTaskInfos);
    console.log('wtf2', tabsConfig);
    return (
        <Box sx={{height: '100%', width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
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

            </Box>
            {tabsConfig.map(({
                                 index,
                                 CardComponent,
                                 onReject,
                                 onMoreInfo,
                                 onSetPrice,
                                 onAssignEmployee,
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
                        onAssignEmployee={onAssignEmployee}
                        onViewReport={onViewReport}
                    />
                </CustomTabPanel>
            ))}
            <AssignEmployeesDialog open={assignExecutorsDialogState}
                                   onSave={() => {
                                       console.log('Нажата кнопка assign executors');
                                   }}
                                   onClose={() => {
                                       setAssignExecutorsDialogState(false);
                                       setSelectedOrder(null);
                                   }}
                                   taskInfo={selectedOrder}
            ></AssignEmployeesDialog>
            <OrderDetailsDialog
                open={orderDetailsDialogState}
                onClose={() => {
                    setOrderDetailsDialogState(false);
                    setSelectedOrder(null);
                }}
                taskInfo={selectedOrder}/>
        </Box>
    );
}