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
import {useState} from "react";
import OrderDetailsDialog from "./OrderDetailsDialog.jsx";
import {PendingEmployeesOrderCard} from "./PendingEmployeesOrderCard.jsx";
import AssignEmployeesDialog from "./AssignEmployeesDialog.jsx";

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


export default function OrdersComponent() {
    const [cards, setCards] = useState(initialCards);
    const handleReject = (id) => {
        console.log(`rejected`);
        setCards((prevCards) => prevCards.filter((card) => card.id !== id));
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

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderDetailsDialogOpen, setOrderDetailsDialogOpen] = useState(false);

    const handleOpenOrderDetailsDialog = (order) => {
        setSelectedOrder(order);
        setOrderDetailsDialogOpen(true);
    };
    const handleCloseOrderDetailsDialog = () => {
        setOrderDetailsDialogOpen(false);
        setSelectedOrder(null);
    };

    const [assignExecutorsDialogOpen, setAssignExecutorsDialogOpen] = useState(false);
    const handleOpeAssignExecutorsDialog = (order) => {
        setSelectedOrder(order);
        setAssignExecutorsDialogOpen(true);
    };
    const handleCloseAssignExecutorsDialog = () => {
        setAssignExecutorsDialogOpen(false);
        setSelectedOrder(null);
    };
    const handleSaveAssignExecutorsDialog = () => {
        console.log('Нажата кнопка assign executors');
    };

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
            <CustomTabPanel value={value} index={0}>
                <Box sx={{width: '100%', height:'100%'}}>
                    <Stack spacing={2} sx={{alignItems:'center'}}>
                        <Grid
                            container
                            spacing={2}
                            columns={4}
                            sx={{ width: '100%', height: '100%'}}
                        >
                            {paginatedCards.map((card) => (
                                <Grid size={1} key={card.id}>
                                    <PendingApplyOrderCard id={card.id} card={card}
                                                           onReject={() => handleReject(card.id)}
                                                           onMoreInfo={() => handleOpenOrderDetailsDialog(card)}/>
                                </Grid>
                            ))}
                        </Grid>

                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                            <Pagination count={3} variant="outlined" onChange={handleChangePage} shape="rounded" />
                        </Box>
                    </Stack>
                </Box>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <Box sx={{width: '100%', height:'100%'}}>
                    <Stack spacing={2} sx={{alignItems:'center'}}>
                        <Grid
                            container
                            spacing={2}
                            columns={4}
                            sx={{ width: '100%', height: '100%' }}
                        >
                            {paginatedCards.map((card) => (
                                <Grid size={1} key={card.id}>
                                    <PendingEmployeesOrderCard id={card.id} card={card}
                                                           onReject={() => handleReject(card.id)}
                                                           onAssignEmployee={() => handleOpeAssignExecutorsDialog(card)}/>
                                </Grid>
                            ))}
                        </Grid>

                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                            <Pagination count={3} variant="outlined" onChange={handleChangePage} shape="rounded" />
                        </Box>
                    </Stack>
                </Box>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
                <Typography>zxc</Typography>
            </CustomTabPanel>
            <AssignEmployeesDialog employees={Employees}
                                   open={assignExecutorsDialogOpen}
                                   onSave={handleSaveAssignExecutorsDialog}
                                   onClose={handleCloseAssignExecutorsDialog}
                                   order={selectedOrder}
            ></AssignEmployeesDialog>
            <OrderDetailsDialog
                open={orderDetailsDialogOpen}
                onClose={handleCloseOrderDetailsDialog}
                order={selectedOrder} />
        </Box>
    );
}