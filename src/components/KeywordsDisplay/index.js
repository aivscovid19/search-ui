import React from 'react';
import './styles.css';
import { Tooltip } from '@material-ui/core';
import shuffleArray from '../helpers/shuffleArray'

export const KeywordsDisplay = ({ keywords }) => {
    console.log(keywords)
    const keywordsToMap = shuffleArray(keywords).slice(0,6)

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
