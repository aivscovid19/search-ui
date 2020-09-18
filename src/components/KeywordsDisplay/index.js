import React from 'react';
import './styles.css';
import { Tooltip } from '@material-ui/core';
import shuffleArray from '../helpers/shuffleArray'

export const KeywordsDisplay = React.memo(({ keywords }) => {
    const keywordsToMap = shuffleArray(keywords).slice(0, 6);
    return (
        <div className="keywords-container hidden">
            {keywordsToMap && (
                <div className="keywords">
                    {keywordsToMap.map((keyword, index) => {
                        return (
                            <Tooltip key={index} title={keyword}>
                                <a className="individual-keywords">
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
}, (prevProps, nextProps) => {return prevProps.keywords === nextProps.keywords})

export default KeywordsDisplay;
