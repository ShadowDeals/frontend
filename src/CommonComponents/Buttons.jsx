import {Button} from "@mui/material";
import React from "react";

function ColorSwitchableButton({ children, sx, ...props }) {
    return (
        <Button
            variant="contained"
            sx={{
                backgroundColor: 'black',
                color: '#990000',
                transition: 'all 0.01s ease-in',
                '&:hover': {
                    backgroundColor: '#990000',
                    color: 'black',
                },
                ...sx
            }}
            {...props}
        >
            {children}
        </Button>
    );
}
export default ColorSwitchableButton;