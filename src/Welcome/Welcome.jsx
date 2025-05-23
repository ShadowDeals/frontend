import React from 'react';
import { Box, Typography, Grid, Button, Stack, List, ListItem, ListItemText} from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function TheShadowDealsRoleChoosingCall() {
    return (
        <Typography
            variant="h4"
            component="h3"
            sx={{ textAlign: 'center', color: 'black' }}
        >
         Выбери свою роль
        </Typography>
    );
}

function TheShadowDealsHeading() {
    return (
        <Typography
            variant="h2"
            component="h1"
            sx={{ textAlign: 'center', color: 'black' }}
        >
            The Shadow Deals
        </Typography>
    );
}

function TheShadowDealsSlogan() {
    return (
        <Typography
            variant="h4"
            sx={{ textAlign: 'center', color: 'black' }}
        >
            Услуги мафии — народу!
        </Typography>
    );
}

function LogoGridItem({ src, alt = 'default-logo' }) {
    return (
        <Grid
            sx={{ bgcolor: 'black' }}
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
            sx={{ bgcolor: 'blue' }}
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
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            sx={{ bgcolor: 'pink' }}
        >
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="60%"
                height="100vh"
                sx={{ bgcolor: 'black' }}
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
                height="100vh"
                sx={{ bgcolor: '#990000' }}
            >
                <Stack
                    spacing={2}
                    sx={{marginTop: '30%'}}
                >
                    <TheShadowDealsHeading></TheShadowDealsHeading>
                    <TheShadowDealsSlogan></TheShadowDealsSlogan>
                    <TheShadowDealsRoleChoosingCall></TheShadowDealsRoleChoosingCall>
                    <Box
                        display="flex"
                        alignItems="right"
                        gap={1}
                        justifyContent="center"
                        width="100%"
                        sx={{ bgcolor: '#000000' }}
                    >
                        <Stack spacing={0}>
                            <Accordion
                            >
                                <AccordionSummary
                                    sx={{ borderRadius: 0, bgcolor: '#990000', color: 'white' }}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography component="span">Дон</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <List dense>
                                        <ListItem>
                                            <ListItemText primary="Зарегистрируй свою группировку" />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary="Подели зоны влияния с другими бандами" />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary="Просматривай отчёты и аналитику" />
                                        </ListItem>
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                    sx={{ borderRadius: 0, bgcolor: '#990000', color: 'white' }}
                                >
                                    <Typography component="span">Администратор</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>

                            <Accordion>
                                <AccordionSummary
                                    sx={{ borderRadius: 0, bgcolor: '#990000', color: 'white' }}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography component="span">Рядовой исполнитель</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>

                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                    sx={{ borderRadius: 0, bgcolor: '#990000', color: 'white' }}
                                >
                                    <Typography component="span">Пользователь</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>
                        </Stack>
                        {/*<Accordion>*/}
                        {/*    <AccordionSummary*/}
                        {/*        expandIcon={<ExpandMoreIcon />}*/}
                        {/*        aria-controls="panel2-content"*/}
                        {/*        id="panel2-header"*/}
                        {/*    >*/}
                        {/*        <Typography component="span">Accordion 2</Typography>*/}
                        {/*    </AccordionSummary>*/}
                        {/*    <AccordionDetails>*/}
                        {/*        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse*/}
                        {/*        malesuada lacus ex, sit amet blandit leo lobortis eget.*/}
                        {/*    </AccordionDetails>*/}
                        {/*</Accordion>*/}
                    </Box>



                    {/*<Typography*/}
                    {/*    variant="body1"*/}
                    {/*    sx={{ mt: 2, color: 'black' }}*/}
                    {/*>*/}
                    {/*    Зарегистрируйся как Дон и получи возможность: просматривать учёт работы группировки.*/}
                    {/*</Typography>*/}
                    {/*<Typography*/}
                    {/*    variant="body1">*/}
                    {/*    Зарегистрируйся как Пользователь и получи возможность заказывать у группировок услуги.*/}
                    {/*</Typography>*/}
                    {/*<Typography*/}
                    {/*    variant="body1">*/}
                    {/*    Зарегистрируйся как Администратор и получи возможность управлять делами Дона.*/}
                    {/*</Typography>*/}
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained">Войти</Button>
                        <Button variant="contained">Зарегистрироваться</Button>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    );
}

export default WelcomeCentralComponent;
