import React from 'react';
import { Typography } from '@mui/material';

const roleTitles = {
    'Дон': 'Личный кабинет Дона',
    'Администратор': 'Личный кабинет администратора',
    'Солдат': 'Личный кабинет солдата',
    'Пользователь': 'Личный кабинет пользователя',
    'Гость': 'Гостевой доступ',
};

const RoleTitle = ({ role }) => {
    const title = roleTitles[role] || 'Приложение';

    return (
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {title}
        </Typography>
    );
};

export default RoleTitle;
