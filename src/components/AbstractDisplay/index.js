import React from 'react';
import { Box, Typography } from '@material-ui/core';
import './styles.css';

export const AbstractDisplay = ({ abstract }) => {
    console.log(abstract)
    return (
        <Box className="abstract-container">
            <Typography className="abstract-text" component="p" variant="subtitle1" color="textPrimary">
                {abstract}
            </Typography>
        </Box>
    );
}

export default AbstractDisplay;
