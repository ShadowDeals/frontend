import ExploreIcon from '@mui/icons-material/Explore';
import BarChartIcon from '@mui/icons-material/BarChart';
import StorageIcon from '@mui/icons-material/Storage';
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TaskIcon from '@mui/icons-material/Task';
import MailIcon from '@mui/icons-material/Mail';

export function getIconByPage(text) {
    const icons = {
        'Сведения о банде': <ExploreIcon />,
        'Статистика': <BarChartIcon />,
        'Доступ к БД': <StorageIcon />,
        'Сотрудники': <PeopleIcon />,
        'Заказы': <DashboardIcon />,
        'Задания': <TaskIcon />,
        'Гостевой доступ': <MailIcon />,
    };
    return icons[text] || null;
}
