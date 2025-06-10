import GangInfo from "./GangInfo.jsx";
import { FindGang } from "./FindGang.jsx";
import OrdersComponent from "./OrdersComponent.jsx";
import EmployeeTabs from "../Don/EmployeesComponent.jsx";
import {Typography} from "@mui/material";
import {LockDatabaseComponent} from "../Don/LockDbComponent.jsx";
import PlotsDashboard from "../Don/PlotsDashboard.jsx";

export const pageComponentsByRole = {
    'Дон': {
        'Сведения о банде': ({bandId, role, onBandIdChange}) =>
            bandId ? <GangInfo role={role} onBandIdChange={onBandIdChange}/> : <FindGang/>,
        'Статистика': () => <PlotsDashboard/>,
        'Доступ к БД': () => <LockDatabaseComponent/>,
        'Сотрудники': ({bandId, role}) =>
            bandId ? <EmployeeTabs role={role}/> : (
                <Typography variant="h5" sx={{textAlign: 'center', width: '100%'}}>
                    Дождитесь вступления в банду
                </Typography>
            ),
    },
    'Администратор': {
        'Сведения о банде': ({bandId, role, onBandIdChange}) =>
            bandId ? <GangInfo role={role} onBandIdChange={onBandIdChange}/> : <FindGang/>,
        'Заказы': ({bandId, role}) =>
            bandId ? <OrdersComponent role={role}/> : (
                <Typography variant="h5" sx={{textAlign: 'center', width: '100%'}}>
                    Дождитесь вступления в банду
                </Typography>
            ),
        'Сотрудники': ({bandId, role}) =>
            bandId ? <EmployeeTabs role={role}/> : (
                <Typography variant="h5" sx={{textAlign: 'center', width: '100%'}}>
                    Дождитесь вступления в банду
                </Typography>
            ),
    },
    'Солдат': {
        'Сведения о банде': ({bandId, role}) =>
            bandId ? <GangInfo role={role}/> : <FindGang/>,
        'Задания': ({bandId, role}) =>
            bandId ? <OrdersComponent role={role}/> : (
                <Typography variant="h5" sx={{textAlign: 'center', width: '100%'}}>
                    Дождитесь вступления в банду
                </Typography>
            ),
    },
    'Пользователь': {
        'Заказы': ({role}) =>
            <OrdersComponent role={role}/>,
    },
};
