import React, {useEffect, useState} from 'react';
import {Box, Typography, Grid, Link, Stack, List, ListItem, Button} from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, {
    accordionSummaryClasses,
} from '@mui/material/AccordionSummary';

import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ColorSwitchableButton from '../CommonComponents/Buttons.jsx';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AccordionPanel = {
    Don: 'panel1',
    Admin: 'panel2',
    Executor: 'panel3',
    Customer: 'panel4',
};

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props}/>
))(({ theme }) => ({
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    flexDirection: 'row-reverse',
    [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
        {
            transform: 'rotate(90deg)',
        },
    [`& .${accordionSummaryClasses.content}`]: {
        marginLeft: theme.spacing(1),
    },
    ...theme.applyStyles('dark', {
        backgroundColor: 'rgba(99, 0, 0, .05)',
    }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
}));

function RolesAccordionSet() {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <Box>
            <Accordion expanded={expanded === AccordionPanel.Don} onChange={handleChange(AccordionPanel.Don)}>
                <AccordionSummary
                    expandIcon={<ArrowForwardIosSharpIcon
                        sx={{
                            flexDirection: 'row-reverse',
                            fontSize: '0.9rem'
                        }}/>} aria-controls="panel1d-content" id="panel1d-header">
                    <Typography
                        component="span"
                    > Дон </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    Стань лидером группировки. Выкупи себе зону влияния.
                    <List sx={{ listStyleType: 'disc' }}>
                        <ListItem sx={{ marginLeft:'2%', display: 'list-item' }}>Получай отчёты о результатах работы своей группировки</ListItem>
                        <ListItem sx={{ marginLeft:'2%', display: 'list-item' }}>Заблокируй базу данных своей группировки, если что-то пойдёт не так</ListItem>
                    </List>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === AccordionPanel.Admin} onChange={handleChange(AccordionPanel.Admin)}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography component="span">Администратор</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    Управляй делами Дона. Получай % от выручки.
                    <List sx={{ listStyleType: 'disc' }}>
                        <ListItem sx={{ marginLeft:'2%', display: 'list-item' }}>Администрируй входящие заявки</ListItem>
                        <ListItem sx={{ marginLeft:'2%', display: 'list-item' }}>Координируй работу солдат</ListItem>
                    </List>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === AccordionPanel.Executor} onChange={handleChange(AccordionPanel.Executor)}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Typography component="span">Солдат</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    Выполняй заказы, назначенные Администратором. Получай % от выручки.
                    <List sx={{ listStyleType: 'disc' }}>
                        <ListItem sx={{ marginLeft:'2%', display: 'list-item' }}>Примени все свои умения и навыки</ListItem>
                        <ListItem sx={{ marginLeft:'2%', display: 'list-item' }}>Отправляй Администратору отчёт по результатам работы</ListItem>
                    </List>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === AccordionPanel.Customer} onChange={handleChange(AccordionPanel.Customer)}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Typography component="span">Пользователь</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    Регистрируйся, если имеешь проблемы, в которых полиция и государство тебе не помощник.
                    <List sx={{ listStyleType: 'disc' }}>
                        <ListItem sx={{ marginLeft:'2%', display: 'list-item' }}>
                            Готовься хорошо заплатить
                        </ListItem>
                    </List>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}


function LogoGridItem({ src, alt = 'default-logo' }) {
    return (
        <Grid
            width="50%"
            height="50%"
        >
            <img
                src={src}
                alt={alt}
                width="100%"
                height="100%"
                style={{ maxHeight: '100%', maxWidth: '100%', display: 'block' }}
            />
        </Grid>
    );
}

function GridLogos() {
    return (
        <Grid
            container
            spacing={0}
            columns={2}
            width="60%"
            height="60%"
        >
            <LogoGridItem
                src={"/robbery-welcome.svg"}
                alt="robbery-welcome"
            > </LogoGridItem>
            <LogoGridItem
                src={"/dollar-welcome.svg"}
                alt="dollar-welcome"
            > </LogoGridItem>
            <LogoGridItem
                src={"/judicial-welcome.svg"}
                alt="judicial-welcome"
            > </LogoGridItem>
            <LogoGridItem
                src={"/baseball-bat-welcome.svg"}
                alt="baseball-bat-welcome"
            > </LogoGridItem>
        </Grid>
    );
}
function WelcomeCentralComponent() {
    const navigate = useNavigate();
    const theme = useTheme();
    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width='100vw'
            height='100vh'
        >
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="60%"
                height="100%"
            >
                <GridLogos>
                </GridLogos>
            </Box>
            <Box
                display="flex"
                alignItems="right"
                gap={1}
                justifyContent="center"
                width="40%"
                height="100%"
            >
                <Stack
                    spacing={3}
                    sx={{marginTop: '30%'}}
                >
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{textAlign: 'center'}}
                    >
                        The Shadow Deals
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{textAlign: 'center'}}
                    >
                        Услуги мафии — народу!
                    </Typography>
                    <Typography
                        variant="h4"
                        component="h3"
                        sx={{ textAlign: 'center'}}
                    >
                        Выбери свою роль
                    </Typography>
                    <RolesAccordionSet></RolesAccordionSet>

                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Button variant='outlined' onClick={handleLoginClick}>
                            Войти
                        </Button>
                            <Button variant='outlined' onClick={handleRegisterClick}>
                                Зарегистрироваться
                            </Button>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    );
}

export default WelcomeCentralComponent;
