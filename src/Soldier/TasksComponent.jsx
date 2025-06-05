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
import {useState} from "react";

import OrderDetailsDialog from "../Admin/OrderDetailsDialog.jsx";
import {ActiveTaskCard} from "./ActiveTaskCard.jsx";
import ReportDialog from "./ReportComponent.jsx";

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

const initialCards = new Array(20).fill(null).map((_, i) => ({ id: i + 1 }));
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

export default function TasksComponent() {
    const [cards, setCards] = useState(initialCards);
    const [taskDetailsDialogOpen, setTaskDetailsDialogOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleMoreInfo = (task) => {
        setSelectedOrder(task);
        setTaskDetailsDialogOpen(true);
    };

    const handleCloseOrderDetailsDialog = () => {
        setTaskDetailsDialogOpen(false);
        setSelectedOrder(null);
    };
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [page, setPage] = useState(1);
    const cardsPerPage = 12;

    const handleChangePage = (_, value) => {
        setPage(value);
    };

    const paginatedCards = cards.slice(
        (page - 1) * cardsPerPage,
        page * cardsPerPage
    );

    const [selectedTask, setSelectedTask] = useState(null);
    const [taskReportDialogOpen, setTaskReportDialogOpen] = useState(false);

    const handleOpenTaskReportDialog = (task) => {
        console.log('handleOpenTaskReportDialog')
        setSelectedTask(task);
        setTaskReportDialogOpen(true);
        console.log('is taskReport dialog opened?:  ', taskReportDialogOpen);
    };

    const handleCloseTaskReportDialog = () => {
        console.log('handleCloseTaskReportDialog');
        setTaskReportDialogOpen(false);
        setSelectedTask(null);
    };

    const handleReportSubmit = ({ status, description }) => {
        console.log('Отчёт:', status, description, 'для задачи:', selectedTask);
        handleCloseTaskReportDialog();
    };

    return (
        <Box sx={{ height: '100%', width:'100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="В работе" {...a11yProps(0)} />
                    <Tab label="Завершенные" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <Box sx={{width: '100%', height:'100%' , bgcolor:'black'}}>
                    <Stack spacing={2} sx={{alignItems:'center'}}>
                        <Grid
                            container
                            spacing={2}
                            columns={4}
                            sx={{ width: '100%', height: '100%', bgcolor: 'black' }}
                        >
                            {paginatedCards.map((card) => (
                                <Grid size={1} key={card.id}>
                                    <ActiveTaskCard
                                        id={card.id}
                                        card={card}
                                        onMoreInfo={() => handleMoreInfo(card)}
                                        onCreateReport={() => handleOpenTaskReportDialog(card)}
                                    />

                                </Grid>
                            ))}
                        </Grid>

                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                            <Pagination count={10} variant="outlined" onChange={handleChangePage} shape="rounded" />
                        </Box>
                    </Stack>
                </Box>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Box sx={{width: '100%', height:'100%' , bgcolor:'black'}}>
                    <Stack spacing={2} sx={{alignItems:'center'}}>
                        <Grid
                            container
                            spacing={2}
                            columns={4}
                            sx={{ width: '100%', height: '100%', bgcolor: 'black' }}
                        >
                            {paginatedCards.map((card) => (
                                <Grid size={1} key={card.id}>
                                    <ActiveTaskCard
                                        id={card.id}
                                        card={card}
                                        onMoreInfo={() => handleMoreInfo(card)}
                                        onCreateReport={() => handleOpenTaskReportDialog(card)}
                                    />
                                </Grid>
                            ))}
                        </Grid>

                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                            <Pagination count={10} variant="outlined" onChange={handleChangePage} shape="rounded" />
                        </Box>
                    </Stack>
                </Box>
            </CustomTabPanel>
            <ReportDialog
                open={taskReportDialogOpen}
                onClose={handleCloseTaskReportDialog}
                onSubmit={handleReportSubmit}
            />
            <OrderDetailsDialog
                open={taskDetailsDialogOpen}
                onClose={handleCloseOrderDetailsDialog}
                order={selectedOrder}
            />
        </Box>
    );
}