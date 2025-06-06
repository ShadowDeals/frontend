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
                        backgroundColor: 'black',
                        color: '#5C3A0E',
                        borderColor: '#5C3A0E',
                        '&:hover': {
                            backgroundColor: '#5C3A0E',
                            color: 'black',
                        },
                    },
                    '& .Mui-selected': {
                        backgroundColor: '#990000 !important',
                        color: 'black !important',
                        borderColor: '#5C3A0E',
                    },
                },
            },
        },
    }
});

export default TheShadowDealsTheme;