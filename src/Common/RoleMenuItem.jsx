import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import * as React from "react";
import MailIcon from '@mui/icons-material/Mail';

import {pageComponentsByRole} from './RolePageComponents.jsx';

import {getIconByPage} from './iconUtils.jsx'

export function RoleMenuList({ role, activePage, setActivePage }) {
    const rolePages = pageComponentsByRole[role];
    const items = rolePages
        ? Object.keys(rolePages).map((text) => ({
            text,
            icon: getIconByPage(text) || <MailIcon />,
        }))
        : [{ text: 'Гостевой доступ', icon: getIconByPage('Гостевой доступ') }];

    return (
        <List>
            {items.map(({ text, icon }, index) => {
                const isActive = activePage === text;
                return (
                    <ListItem
                        key={`${text}-${index}`}
                        disablePadding
                        selected={isActive}
                        sx={{
                            '&:hover .MuiListItemText-primary': { color: '#F2E6C4' },
                            '&:hover .MuiListItemIcon-root': { color: '#F2E6C4' },
                        }}
                        onClick={() => {
                            console.log('new active page set: ' + text);
                            setActivePage(text);
                        }}
                    >
                        <ListItemButton>
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
}
