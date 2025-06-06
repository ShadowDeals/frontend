import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import PlotsDashboard from "../Don/PlotsDashboard.jsx";
import {RoleTitle, RoleMenuList} from "./RoleSpecifiedComponents.jsx";
import {LockDatabaseComponent} from "../Don/LockDbComponent.jsx";
import EmployeeTabs from "../Don/EmployeesComponent.jsx";
import OrdersComponent from "../Admin/OrdersComponent.jsx";
import {useNavigate} from "react-router-dom";
import ColorSwitchableButton from "../CommonComponents/Buttons.jsx";

import { useDispatch } from 'react-redux';
import { clearCredentials } from '../Redux/store.js';
import GangInfo from "../Soldier/GangInfo.jsx";
import {jwtDecode} from "jwt-decode";
import FindGang from "../Soldier/FindGang.jsx";
import TasksComponent from "../Soldier/TasksComponent.jsx";
import Cookies from "js-cookie";
import {Typography} from "@mui/material";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    transition: theme.transitions.create('margin', {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    marginLeft: 0,
                },
            },
        ],
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: `${drawerWidth}px`,
                transition: theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

function useDecodedToken() {
    const token = Cookies.get('accessToken');
    console.log("token decoded: ", token);
    return token ? jwtDecode(token) : null;
}

export default function HomeComponent() {
    const decodedToken = useDecodedToken();
    console.log('Токен из куки на home component:', decodedToken);
    const currentRole = decodedToken?.roles?.[0] || null;


    const bandId = decodedToken?.bandId || null;
    console.log('Роль текущая: ', currentRole);
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [activePage, setActivePage] = React.useState(null);
    const dispatch = useDispatch();

    const toggleDrawer = (state) => () => setOpen(state);

    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(clearCredentials());
        Cookies.remove('accessToken');
        navigate('/welcome');
    };


    return (
        <Box sx={{ width:'100vw', height:'100vh', backgroundColor:'black', display: 'flex', overflow: 'hidden'}}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer(true)}
                        edge="start"
                        sx={[
                            {
                                mr: 2,
                            },
                            open && { display: 'none' },
                        ]}
                    >
                        <MenuIcon />
                    </IconButton>
                    <RoleTitle role={currentRole}/>
                    <Box sx={{ ml: 'auto' }}>
                        <ColorSwitchableButton onClick={handleLogout}
                                               sx={{ backgroundColor: '#990000',
                                                       color: 'black',
                                                       '&:hover': {
                                                   backgroundColor: 'black',
                                                           color: '#990000',
                                                       }
                        }}>
                            Выйти
                        </ColorSwitchableButton>
                    </Box>

                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader sx = {{
                    backgroundColor:'black',
                    color: 'black',
                }}>
                    <IconButton onClick={toggleDrawer(false)}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <RoleMenuList role={currentRole}
                              activePage={activePage}
                              setActivePage={setActivePage}/>
            </Drawer>
            <Main open={open}>
                <DrawerHeader sx={{ overflow:'hidden' }}/>
                <Box sx={{width:'100%', height:'100%', backgroundColor:'black', display: 'flex', justifyContent:'center', alignItems: 'center', overflow: 'hidden'}}>
                    {activePage === 'Сведения о банде'  && ((
                        bandId ? <GangInfo role={currentRole} /> : <FindGang />
                    ))}
                    {activePage === 'Статистика' && <PlotsDashboard />}
                    {activePage === 'Доступ к БД' && <LockDatabaseComponent></LockDatabaseComponent>}

                    {['Сотрудники', 'Заказы', 'Задания'].includes(activePage) && bandId === null && (
                        <Typography color="white" variant="h4" sx={{ textAlign: 'center', width: '100%',color:'#990000'}}>
                            Дождитесь вступления в банду
                        </Typography>
                    )}
                    {bandId !== null && activePage === 'Сотрудники' && <EmployeeTabs role={currentRole}></EmployeeTabs>}
                    {bandId !== null && activePage === 'Заказы' && <OrdersComponent></OrdersComponent>}
                    {bandId !== null && activePage === 'Задания' && <TasksComponent></TasksComponent>}
                </Box>
            </Main>
        </Box>
    );
}