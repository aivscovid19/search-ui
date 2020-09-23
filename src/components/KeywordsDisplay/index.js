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
                        const isKeywordTruncated = keyword.length > 20;
                        if (isKeywordTruncated){
                            return (
                                <Tooltip key={index} title={keyword}>
                                    <span className="individual-keywords">
                                        { keyword.slice(0, 20).trim() + "..." }
                                    </span>
                                </Tooltip>
                        )
                        } else {
                            return (
                                <span key={index} className="individual-keywords">
                                    { keyword }
                                </span>
                            )
                        }
                    })}
                </div>
            )}
        </div>
    );
}, (prevProps, nextProps) => {return prevProps.keywords === nextProps.keywords})

export default KeywordsDisplay;
