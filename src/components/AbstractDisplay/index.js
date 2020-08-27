import React, { useState } from 'react';
import ReactHtmlParser from 'react-html-parser'; 

import { Typography } from '@material-ui/core';

import './styles.css';

export const AbstractDisplay = ({ abstract, highlight }) => {
    const [isFullTextToggled, setFullTextToggled] = useState(false);

    const displayAbstract = highlight && highlight.abstract
      ? ReactHtmlParser(highlight.abstract[0]) : abstract;

    function handleToggleText(){
        setFullTextToggled(isFullTextToggled === false ? true : false)
    }

    return (
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
                {displayAbstract}
            </Typography>
    );
}

export default AbstractDisplay;
