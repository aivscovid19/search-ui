import React, { useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import ReactCSSTransitionGroup from 'react-transition-group';

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

function FirstChild(props) {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
}

export const AbstractDisplay = ({ abstract, highlight }) => {
    const [isFullTextToggled, setFullTextToggled] = useState(false);
    
    const previewAbstract = highlight && highlight.abstract
     ? `...${highlight.abstract[0]}...` : abstract;

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
                    ? abstract
                    : ReactHtmlParser(previewAbstract)
                }
            </Typography>
        </StyledButton>
    );
}

export default AbstractDisplay;
