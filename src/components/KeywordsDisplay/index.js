import React from 'react';
import './styles.css';
import { Tooltip } from '@material-ui/core';
import shuffleArray from '../helpers/shuffleArray'

// The keyword component takes a list as an argument

export const KeywordsDisplay = ({ keywords }) => {
    // currently receiving a single-item list and spliting
    // keyword area shortened by randomizing and then slicing list
    const keywordsArray = keywords[0] ? keywords[0].split(', ') : [];
    const keywordsToMap = shuffleArray(keywordsArray).slice(0,8)

    return (
        <div className="keywords-container">
            {keywordsToMap && (
                <div className="keywords">
                    {keywordsToMap.map((keyword, index) => {
                        return (
                            <Tooltip title={keyword}>
                                <a key={index} className="individual-keywords">
                                    {
                                        keyword.length > 20
                                            ? keyword.slice(0, 20).trim() + "..."
                                            : keyword
                                    }
                                </a>
                            </Tooltip>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default KeywordsDisplay;