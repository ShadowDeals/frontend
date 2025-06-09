import { createTheme } from '@mui/material/styles';

const TheShadowDealsTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#F2E6C4',
            contrastText: '#5C3A0E',
        },
        secondary: {
            main: '#5C3A0E',
            contrastText: '#F2E6C4',
        },
        background: {
            default: '#F2E6C4',
            paper: '#F2E6C4',
        },
        text: {
            primary: '#5C3A0E',
            secondary: '#5C3A0E',
        },
        action: {
            active: '#5C3A0E',
            hover: '#5C3A0E',
            selected: '#5C3A0E',
            disabled: '#5C3A0E',
            disabledBackground: '#5C3A0E',
            focus: '#5C3A0E',
        },
    },
    components: {
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    color: '#5C3A0E',
                    '&.Mui-focused': {
                        color: '#5C3A0E'
                    },
                    '&.Mui-error': {
                        color: '#d32f2f',
                    },
                },
            },
        },
        MuiRadio: {
            styleOverrides: {
                root: {
                    color: '#7a2e00',
                    '&.Mui-checked': {
                        color: '#d84315',
                    },
                },
            },
        },
        MuiTab: {
            defaultProps: {
                disableRipple: true,
            },
            styleOverrides: {
                root: {
                    borderBottom: 'none !important',
                    transition: 'none !important',
                    outline: 'none',
                    boxShadow: 'none',
                    '&:focus': {
                        outline: 'none',
                        boxShadow: 'none',
                    },
                    '&:active': {
                        backgroundColor: 'transparent',
                    },
                    '&.Mui-selected': {
                        color: '#d84315',
                        fontWeight: 'bold',
                        position: 'relative',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: 2,
                            backgroundColor: '#d84315',
                            transition: 'none !important',
                        },
                    },
                },
                indicator: {
                    display: 'none !important',
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: '#5C3A0E',
                        color: '#F2E6C4',
                    },
                    '&.Mui-selected': {
                        backgroundColor: '#F2E6C4',
                        '&:hover': {
                            backgroundColor: '#5C3A0E',
                        },
                    },
                    '&.Mui-focusVisible': {
                        backgroundColor: '#5C3A0E',
                        color: '#F2E6C4',
                    },
                    '&.Mui-selected.Mui-focusVisible': {
                        backgroundColor: '#5C3A0E',
                        color: '#F2E6C4',
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                select: ({ ownerState, theme }) => ({
                    color: ownerState.error ? '#D32F2F' : undefined,
                }),
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
                size: 'small',
            },
        },

        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    backgroundColor: '#F2E6C4',
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#5C3A0E',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#7a2e00',
                    },
                },
                notchedOutline: {
                    borderColor: '#5C3A0E',
                },
                input: {
                    color: '#5C3A0E',
                },
            },
        },

        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#5C3A0E',
                    '&.Mui-focused': {
                        color: '#5C3A0E',
                    },
                },
            },
        },

        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    color: '#5C3A0E',
                    marginTop: 4,
                    minHeight: '20px',
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#F2E6C4',
                },
                '*': {
                    boxSizing: 'border-box',
                },
                '#root': {
                    backgroundColor: '#F2E6C4',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 900,
                },
                MuiPaper: {
                    styleOverrides: {
                        root: {
                            backgroundColor: '#5C3A0E',
                        },
                    },
                },
                containedPrimary: {
                    backgroundColor: '#5C3A0E',
                    color: '#F2E6C4',
                    '&:hover': {
                        backgroundColor: '#7a2e00',
                    },
                    '&:active': {
                        backgroundColor: '#633000',
                    },
                    '&.Mui-disabled': {
                        backgroundColor: '#d7cbb9',
                        color: '#a18c7d',
                    },
                },
                outlinedPrimary: {
                    borderColor: '#5C3A0E',
                    color: '#5C3A0E',
                    '&:hover': {
                        backgroundColor: '#f2e6c4',
                        borderColor: '#7a2e00',
                    },
                    '&.Mui-disabled': {
                        borderColor: '#d7cbb9',
                        color: '#a18c7d',
                    },
                },
                textPrimary: {
                    color: '#5C3A0E',
                    '&:hover': {
                        backgroundColor: '#f2e6c4',
                    },
                    '&.Mui-disabled': {
                        color: '#a18c7d',
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    color: '#5C3A0E',
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: '#5C3A0E',
                },
            },
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    color: '#5C3A0E',
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#5C3A0E',
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: '#5C3A0E',
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: '#5C3A0E',
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
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: '#5C3A0E',
                    '&.Mui-checked': {
                        color: '#5C3A0E',
                    },
                    '& .MuiSvgIcon-root': {
                        fontSize: 28,
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
                        color: '#5C3A0E',
                        bgcolor: '#F2E6C4',
                        borderColor: '#F2E6C4',
                        '&:hover': {
                            backgroundColor: '#5C3A0E',
                            color: '#F2E6C4',
                        },
                    },
                    '& .Mui-selected': {
                        borderColor: '#5C3A0E',
                        color: '#F2E6C4',
                    },
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: '#5C3A0E',
                    color: '#F2E6C4',
                    fontSize: '0.70rem',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                },
                arrow: {
                    color: '#333333', // Цвет стрелки (тот же, что фон)
                },
            },
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    fontWeight: 500,
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid',
                    maxWidth: 400,
                    margin: '0 auto',
                },
                action: {
                    '& .MuiIconButton-root': {
                        color: '#F2E6C4',
                        '&:hover': {
                            color: '#0288d1',
                        },
                    },
                },
                filledError: {
                    backgroundColor: '#f44336',
                    color: '#F2E6C4',
                    borderColor: '#d32f2f',
                },
                filledSuccess: {
                    backgroundColor: '#2e7d32',
                    color: '#fff',
                    borderColor: '#1b5e20',
                },
                filledInfo: {
                    backgroundColor: '#0288d1',
                    color: '#F2E6C4',
                    borderColor: '#01579b',
                },
                filledWarning: {
                    backgroundColor: '#ed6c02',
                    color: '#F2E6C4',
                    borderColor: '#e65100',
                },
                icon: {
                    color: '#F2E6C4',
                },
            },
            defaultProps: {
                variant: 'filled',
            },
        },
    }
});

export default TheShadowDealsTheme;