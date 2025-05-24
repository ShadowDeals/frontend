import { createTheme } from '@mui/material/styles';

const TheShadowDealsTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#000000',
            paper: '#000000',
        },
        text: {
            primary: '#990000',
            secondary: '#990000',
        },
        action: {
            active: '#990000',
            hover: '#990000',
            selected: '#990000',
            disabled: '#990000',
            disabledBackground: '#990000',
            focus: '#990000',
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#000000',
                    color: '#990000',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#000000',
                    color: '#990000',
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: '#990000',
                },
            },
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    color: '#990000',
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#990000',
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: '#990000',
                },
            },
        },
    },
});

export default TheShadowDealsTheme;