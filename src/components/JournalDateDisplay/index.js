import React from 'react';
import './styles.css';

export const JournalDateDisplay = ({ journal, date }) => {
    return (
        <div className="description-container">
            {journal && (
                <span className="journal-styles">
                    {journal}
                </span>
            )}
            {date && (
                <span className="date-styles">
                    {date}
                </span>
            )}
        </div>
    );
}

export default JournalDateDisplay;
