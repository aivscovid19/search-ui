import React, { useState } from 'react';
import ReactHtmlParser from 'react-html-parser'; 

import { Typography, Button, createMuiTheme } from '@material-ui/core';

import './styles.css';

export const AbstractDisplay = ({ abstract, highlight }) => {
    const theme = createMuiTheme({
            button: {
              textTransform: 'none'
            }
        });

    const [isFullTextToggled, setFullTextToggled] = useState(false);
    
    const displayAbstract = highlight && highlight.abstract
      ? `...${ReactHtmlParser(highlight.abstract[0])}...` : abstract;

    function handleToggleText(){
        setFullTextToggled(isFullTextToggled === false ? true : false)
    }

    return (
        <Button theme={theme}>
            <Typography
             onClick={() => { handleToggleText() }}
             className={
              isFullTextToggled
              ? "abstract-text-toggled"
              : "abstract-text"
             }
             component="p"
             variant="subtitle1"
             color="textPrimary"
             >
                { isFullTextToggled
                    ? abstract
                    : displayAbstract
                }
            </Typography>
            </Button>
    );
}

export default AbstractDisplay;
