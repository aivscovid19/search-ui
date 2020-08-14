import React from 'react';
import './styles.css';
import { Tooltip } from '@material-ui/core'

// The keyword component takes a list as an argument
// anchor tag was used in case we decide that clicking
// the keyword would produce a search specific to that word

// Currently I am getting phrases in the keyword container
// This breaks the UI if the string is too long, so I truncate
// and provide a tooltip on hover

// It is currently truncating the keyword list due to longer lists
// not fitting in the card.
// Next step would be to add a slider that allows us to view all keys

export const KeywordsDisplay = ({ keywords }) => {
    return (
        <span className="keywords-container">
            <span className="keywords">{keywords.slice(0, 5).map((keyword, index) => {
                return (
                    <Tooltip title={keyword}>
                        <a key={keyword} className="individual-keywords">
                            {
                                keyword.length > 20
                                    ? keyword.slice(0, 20).trim() + "..."
                                    : keyword
                            }
                        </a>
                    </Tooltip>
                );
            })}</span>
        </span>
    );
}