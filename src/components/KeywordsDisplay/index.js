import React from 'react';
import './styles.css';
import { Tooltip } from '@material-ui/core';
import shuffleArray from '../helpers/shuffleArray'
// The keyword component takes a list as an argument
// anchor tag was used in case we decide that clicking
// the keyword would produce a search specific to that word

// 

// Currently I am getting phrases in the keyword container
// This breaks the UI if the string is too long, so I truncate
// and provide a tooltip on hover

// It is currently truncating the keyword list due to longer lists
// not fitting in the card.
// Next step would be to add a slider that allows us to view all keys

export const KeywordsDisplay = ({ keywords }) => {
    const keywordsArray = keywords[0] ? keywords[0].split(', ') : null;
    const keywordsToMap = shuffleArray(keywordsArray).slice(0,5)

    return (
        <div className="keywords-container">
            {keywordsToMap && (
                <div className="keywords">
                    {keywordsToMap.map((keyword, index) => {
                        return (
                            <Tooltip title={keyword}>
                                <span key={index} className="individual-keywords">
                                    {
                                        keyword.length > 20
                                            ? keyword.slice(0, 20).trim() + "..."
                                            : keyword
                                    }
                                </span>
                            </Tooltip>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default KeywordsDisplay;