import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import {pageComponentsByRole} from "./RolePageComponents.jsx";

import {useNavigate} from "react-router-dom";

import Cookies from "js-cookie";
import {Button, Stack, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useDecodedToken} from "./tokenHooks.js";
import {RoleMenuList} from "./RoleMenuItem.jsx";
import RoleTitle from "./RoleTitle.jsx";

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

export default function HomeComponent() {
    const { bandId = null, sub = '', roles= [] } = useDecodedToken() || {};

    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const toggleDrawer = (state) => () => setOpen(state);

    const navigate = useNavigate();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    const currentRole = roles[0] || '';
    const [activePage, setActivePage] = useState(currentRole !== 'Пользователь' ? 'Сведения о банде' : 'Заказы');
    console.log('Роль текущая: ', currentRole);
    useEffect(() => {
        if (!currentRole) {
            navigate('/login', { replace: true });
        } else {
            setIsCheckingAuth(false);
        }
    }, [currentRole, navigate]);

    if (isCheckingAuth) return null;

    const rolePages = pageComponentsByRole[currentRole] || {};
    const PageComponent = rolePages[activePage];


    return (
        <Box sx={{ width:'100vw', height:'100vh', display: 'flex', overflow:'hidden'}}>
            <CssBaseline />
            <AppBar elevation={0} position="fixed" open={open}>
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
                    <RoleTitle role={currentRole}></RoleTitle>
                    <Box sx={{ ml: 'auto' }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                            {sub && (
                                <Typography variant="body1" color="inherit">
                                    {sub}
                                </Typography>
                            )}
                            <Button
                                variant="contained"
                                onClick={() => {
                                    Cookies.remove('accessToken');
                                    navigate('/welcome');
                                }}
                            >
                                Выйти
                            </Button>
                        </Stack>
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
                <DrawerHeader>
                    <IconButton onClick={toggleDrawer(false)}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>

                <RoleMenuList role={currentRole}
                              activePage={activePage}
                              setActivePage={setActivePage}/>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                {PageComponent ? (
                        <PageComponent bandId={bandId} role={currentRole} />
                ) : (
                    <Typography variant="h5" sx={{ textAlign: 'center' }}>
                        Страница не найдена
                    </Typography>
                )}
            </Main>
        </Box>
    );
}