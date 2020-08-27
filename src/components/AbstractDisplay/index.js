import React, { useState } from 'react';
import ReactHtmlParser from 'react-html-parser'; 

import VisibilityIcon from '@material-ui/icons/Visibility';

import { Typography, IconButton } from '@material-ui/core';

import * as icons from '../../icons';
import './styles.css';

export const AbstractDisplay = ({ abstract, highlight }) => {
    const [isFullTextToggled, setFullTextToggled] = useState(false);

    const displayAbstract = highlight && highlight.abstract
      ? ReactHtmlParser(highlight.abstract[0]) : abstract;

    function handleToggleText(){
        setFullTextToggled(isFullTextToggled === false ? true : false)
    }

    return (
        <>
            <Typography
             className={
              isFullTextToggled
              ? "abstract-text-toggled"
              : "abstract-text"
             }
             component="p"
             variant="subtitle1"
             color="textPrimary"
             >
                {displayAbstract}
            </Typography>
            <IconButton
                 onClick={() => { handleToggleText() }}
                 size="small"
            >
                <VisibilityIcon />
            </IconButton>
        </>
    );
}

export default AbstractDisplay;
