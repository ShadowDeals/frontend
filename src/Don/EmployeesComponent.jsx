import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import EmployeesStatusView from "../Common/EmployeesStatusView.jsx";
import {a11yProps, CustomTabPanel} from "../Common/OrdersComponent.jsx";

export default function EmployeeTabs({role}) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    console.log("Действующая роль в EmployeeTabs: ", role)
    return (
        <Box sx={{ height: '100%', alignItems:'center', width:'100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    TabIndicatorProps={{ style: { display: 'none' } }}
                    value={value} onChange={handleChange} aria-label="basic tabs example">
                    {<Tab label="Входящие запросы" {...a11yProps(0)} />}
                    <Tab label="Действующие сотрудники" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <EmployeesStatusView role={role} status={'pending'}></EmployeesStatusView>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <EmployeesStatusView role={role} status={'active'}></EmployeesStatusView>
            </CustomTabPanel>
        </Box>
    );
}