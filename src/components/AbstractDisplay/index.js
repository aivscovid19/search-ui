import React, { useState } from 'react';
import ReactHtmlParser from 'react-html-parser'; 

import { Typography, Button, withStyles } from '@material-ui/core';

import './styles.css';

const StyledButton = withStyles({
    root: {
        padding: '5px',
    },
    label: {
      textTransform: 'none',
      textAlign: 'left',
    },
  })(Button);

export const AbstractDisplay = ({ abstract, highlight }) => {
    const [isFullTextToggled, setFullTextToggled] = useState(false);
    
    const previewAbstract = highlight && highlight.abstract
     ? `...${highlight.abstract[0]}...` : abstract;

    const displayFullAbstract = highlight && highlight.abstract
     ? highlight.abstract.join(' ') : abstract;

    function handleToggleText(){
        setFullTextToggled(isFullTextToggled === false ? true : false)
    }

    return (
        <StyledButton>
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
                    ? ReactHtmlParser(displayFullAbstract)
                    : ReactHtmlParser(previewAbstract)
                }
            </Typography>
        </StyledButton>
    );
}

export default AbstractDisplay;
