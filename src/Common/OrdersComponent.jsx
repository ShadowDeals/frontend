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
import { getAdminTabsConfig, getSoldierTabsConfig } from './OrgderTabsConfigs.jsx';


import { useMemo, useState } from "react";
import OrderDetailsDialog from "../Admin/OrderDetailsDialog.jsx";
import AssignEmployeesDialog from "../Admin/AssignEmployeesDialog.jsx"
import {useBandTasks} from "../Admin/useBandTasks.js";

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
                        }) {


    console.log('a сюда что дошло', taskInfos);

    const [page, setPage] = useState(1);
    const taskInfosPerPage = 12;

    const pageCount = Math.ceil(taskInfos.length / taskInfosPerPage);


    const paginatedTaskInfos = taskInfos.slice(
        (page - 1) * taskInfosPerPage,
        page * taskInfosPerPage
    );
    console.log('Количество страниц:', pageCount, taskInfos.length);
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
                        {paginatedTaskInfos.map((taskInfo) => {
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
                    <Pagination count={pageCount} variant="outlined" onChange={(_, value) => {
                        setPage(value);
                    }} shape="rounded" />
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

export default function OrdersComponent({role}) {

    const {
        waitingForAccept,
        waitingForPayment,
        waitingForEmployee,
        inProgress,
        finished,
        assignedToMe,
        finishedByMe
    } = useBandTasks();

    const taskArrays = React.useMemo(() => [
        waitingForAccept.tasks || [],
        waitingForPayment.tasks || [],
        waitingForEmployee.tasks || [],
        inProgress.tasks || [],
        finished.tasks || [],
        assignedToMe.tasks || [],
        finishedByMe.tasks || []
    ], [waitingForAccept.tasks,
        waitingForPayment.tasks,
        waitingForEmployee.tasks,
        inProgress.tasks,
        finished.tasks,
        assignedToMe.tasks,
        finishedByMe.tasks]);

    console.log('Роль в компоненте: ', role);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [page, setPage] = useState(1);
    const taskInfosPerPage = 12;


    const currentTaskInfos = React.useMemo(() => {
        return taskArrays[value] || [];
    }, [taskArrays, value]);

    console.log('currentTaskInfos, page', page,
        currentTaskInfos
    );


    console.log('Всего задач:', currentTaskInfos.length);
    console.log('Текущая страница:', page);
    console.log('Срез с', (page - 1) * taskInfosPerPage, 'по', page * taskInfosPerPage);
    console.log('Итоговый массив:', currentTaskInfos);


    console.log('currentTaskInfos, page', page,
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


    const tabsConfig = useMemo(() => {
        return role === 'Солдат'
            ? getSoldierTabsConfig(currentTaskInfos, openOrderDetailsDialog)
            : getAdminTabsConfig(currentTaskInfos, openOrderDetailsDialog, openAssignExecutorsDialog);
    }, [role, currentTaskInfos]);


    console.log('wtf', currentTaskInfos);
    console.log('wtf2', tabsConfig);
    return (
        <Box sx={{ height: '100%', width:'100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    TabIndicatorProps={{ style: { display: 'none' } }}
                    value={value}
                    onChange={handleChange}
                    aria-label="tabs by role"
                >
                    {tabsConfig.map(({ index, label }) => (
                        <Tab key={index} label={label} {...a11yProps(index)} />
                    ))}
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
                    />
                </CustomTabPanel>
            ))}
            <AssignEmployeesDialog employees={Employees}
                                   open={assignExecutorsDialogState}
                                   onSave={saveAssignExecutorsDialog}
                                   onClose={closeAssignExecutorsDialog}
                                   taskInfo={selectedOrder}
            ></AssignEmployeesDialog>
            <OrderDetailsDialog
                open={orderDetailsDialogState}
                onClose={closeOrderDetailsDialog}
                taskInfo={selectedOrder} />
        </Box>
    );
}