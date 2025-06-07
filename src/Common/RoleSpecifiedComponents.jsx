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
import TaskIcon from '@mui/icons-material/Task';
import List from '@mui/material/List';
import { Typography } from "@mui/material";

const roleDescriptions = {
    'Дон': 'Дона',
    'Администратор': 'Администратора',
    'Солдат': 'Солдата',
    'Пользователь': 'Пользователя',
};

export const RoleTitle = ({ role }) => {
    const roleDescription = roleDescriptions[role] || 'гостя';

    return (
        <Typography variant="h6" noWrap component="div">
            {`Личный кабинет ${roleDescription}`}
        </Typography>
    );
};

export const menuItemsByRole = {
    'Дон': [
        { text: 'Сведения о банде', icon: <ExploreIcon /> },
        { text: 'Статистика', icon: <BarChartIcon /> },
        { text: 'Доступ к БД', icon: <StorageIcon /> },
        { text: 'Сотрудники', icon: <PeopleIcon /> },
    ],
    'Администратор': [
        { text: 'Сведения о банде', icon: <ExploreIcon /> },
        { text: 'Заказы', icon: <DashboardIcon /> },
        { text: 'Сотрудники', icon: <PeopleIcon /> },
    ],
    'Солдат': [
        { text: 'Сведения о банде', icon: <ExploreIcon /> },
        { text: 'Задания', icon: <TaskIcon /> },
    ],
    'Пользователь': [
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
                                color: '#F2E6C4',
                            },
                            '&:hover .MuiListItemIcon-root': {
                                color: '#F2E6C4',
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
