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
        MuiTab: {
            styleOverrides: {
                root: {
                    color: '#990000',
                    '&.Mui-selected': {
                        color: '#ff0000',
                    },
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    backgroundColor: '#ff0000',
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: '#990000',
                        color: 'black',
                    },
                    '&:hover .MuiTableCell-root': {
                        color: 'black',
                    },
                    '&:hover .MuiCheckbox-root': {
                        color: 'black',
                    },
                },
            },
        },
        MuiPagination: {
            styleOverrides: {
                root: {
                },
                ul: {
                    '& .MuiPaginationItem-root': {
                        backgroundColor: 'black',
                        color: '#990000',
                        borderColor: '#990000',
                        '&:hover': {
                            backgroundColor: '#990000',
                            color: 'black',
                        },
                    },
                    '& .Mui-selected': {
                        backgroundColor: '#990000 !important',
                        color: 'black !important',
                        borderColor: '#990000',
                    },
                },
            },
        },
        components: {
            MuiDialog: {
                styleOverrides: {
                    paper: {
                        backgroundColor: '#255000',
                    },
                },
            },
        },
    }
});

export default TheShadowDealsTheme;