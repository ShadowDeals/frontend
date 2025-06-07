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

function OrdersTabPanel({
                            cards,
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
                {/* Обёртка для фиксированной высоты */}
                <Box
                    sx={{
                        width: '100%',
                        height: '650px', // фиксированная высота
                        overflowY: 'auto',
                    }}
                >
                    <Grid
                        container
                        spacing={2}
                        columns={4}
                        alignItems="stretch"
                    >
                        {cards.map((card) => (
                            <Grid item xs={1} key={card.id}>
                                <CardComponent
                                    id={card.id}
                                    card={card}
                                    onReject={() => onReject && onReject(card.id)}
                                    onMoreInfo={() => onMoreInfo && onMoreInfo(card)}
                                    onSetPrice={() => onSetPrice && onSetPrice(card)}
                                    onAssignEmployee={() => onAssignEmployee && onAssignEmployee(card)}
                                    onViewReport={() => onViewReport && onViewReport(card)}
                                />
                            </Grid>
                        ))}
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
    const [cards, setCards] = useState(initialCards);
    // const handleReject = (id) => {
    //     console.log(`rejected`);
    //     setCards((prevCards) => prevCards.filter((card) => card.id !== id));
    // };
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
            cards: paginatedCards,
        },
        {
            index: 1,
            CardComponent: PendingPaymentOrderCard,
            onReject: (id) => {
                console.log('Cancel deal', id);
            },
            onMoreInfo: (card) => {
                console.log('Open order details', card);
                openOrderDetailsDialog(card);
            },
            onSetPrice: (card) => {
                console.log('Open setting price', card);
            },
            cards: paginatedCards,
        },
        {
            index: 2,
            CardComponent: PendingEmployeesOrderCard,
            onMoreInfo: (card) => {
                console.log('Open order details', card);
                openOrderDetailsDialog(card);
            },
            onAssignEmployee: (card) => {
                console.log('Assign employee', card);
                openAssignExecutorsDialog(card);
            },
            cards: paginatedCards,
        },
        {
            index: 3,
            CardComponent: InProgressOrderCard,
            onMoreInfo: (card) => {
                console.log('Open order details', card);
                openOrderDetailsDialog(card);
            },
            onAssignEmployee: (card) => {
                console.log('Assign employee', card);
            },
            cards: paginatedCards,
        },
        {
            index: 4,
            CardComponent: DoneOrderCard,
            onMoreInfo: (card) => {
                console.log('Open order details', card);
                openOrderDetailsDialog(card);
            },
            onViewReport: (card) => {
                console.log('View report', card);
            },
            cards: paginatedCards,
        },
    ], [paginatedCards]);

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
            {tabsConfig.map(({ index, CardComponent, onReject, onMoreInfo, onSetPrice, onAssignEmployee, onViewReport, cards }) => (
                <CustomTabPanel key={index} value={value} index={index}>
                    <OrdersTabPanel
                        cards={cards}
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