import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/MoveToInbox';
import StorageIcon from '@mui/icons-material/Storage';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ExploreIcon from '@mui/icons-material/Explore';
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Message';
import List from '@mui/material/List';
import { Typography } from "@mui/material";

const roleDescriptions = {
    don: 'дона',
    admin: 'администратора',
    soldier: 'солдата',
    user: 'пользователя',
};

export const RoleTitle = ({ role }) => {
    const roleDescription = roleDescriptions[role] || 'Гость';

    return (
        <Typography variant="h6" noWrap component="div">
            {`Личный кабинет ${roleDescription}`}
        </Typography>
    );
};

export const menuItemsByRole = {
    don: [
        { text: 'Статистика', icon: <BarChartIcon /> },
        { text: 'Доступ к БД', icon: <StorageIcon /> },
        { text: 'Сотрудники', icon: <PeopleIcon /> },
    ],
    admin: [
        { text: 'Заказы', icon: <DashboardIcon /> }
    ],
    soldier: [
        { text: 'Сведения о банде', icon: <ExploreIcon /> },
    ],

    user: [
        { text: 'Профиль', icon: <PersonIcon /> },
        { text: 'Сообщения', icon: <MessageIcon /> },
    ],
};

export function RoleMenuList({ role, activePage, setActivePage }) {
    const items = menuItemsByRole[role] || [
        { text: 'Гостевой доступ', icon: <MailIcon /> },
    ];

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
                            '&:hover .MuiListItemText-primary': {
                                color: 'black',
                            },
                            '&:hover .MuiListItemIcon-root': {
                                color: 'black',
                            },
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

};
