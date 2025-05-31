import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';


const BlackBoxRoot = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.default || '#000000',
    color: theme.palette.text.primary,
}));

export function BlackBox(props) {
    return <BlackBoxRoot {...props} bgcolor={props.bgcolor || undefined} />;
}

const RedBoxRoot = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.optional || '#990000',
    color: theme.palette.text.primary,
}));

export function RedBox(props) {
    return <RedBoxRoot {...props} bgcolor={props.bgcolor || undefined} />;
}