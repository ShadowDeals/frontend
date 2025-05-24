export const getRegisterPaperSx = () => ({
    width: '20%',
    height: '55%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    p: 5,
    backgroundColor: '#990000',
    color: 'black',
    justifyContent: 'flex-start'
});

export const registerSelectSx = {
    backgroundColor: '#990000',
    color: 'black',
    width: '100%',
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'black',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'black',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'black',
    },
    '&.MuiSelect-iconOpen': {
        borderColor: 'black',
    },
}

export const registerSelectMenuItemSx = {
    backgroundColor: '#990000',
    color: 'black',

    '&:hover': {
        backgroundColor: 'black',
        color: '#990000',
    },

    '&.Mui-focusVisible': {
        backgroundColor: 'black',
        color: '#990000',
    },

    '&.Mui-selected': {
        backgroundColor: '#990000',
        color: 'black',
    },
    '&.Mui-selected.Mui-focusVisible': {
        backgroundColor: 'black',
        color: '#990000',
    },
    '&.Mui-selected:hover': {
        backgroundColor: 'black',
        color: '#990000',
    },
};
