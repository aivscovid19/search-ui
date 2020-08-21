import React from 'react';
import './styles.css';

// The keyword component takes a list as an argument

export const JournalDateDisplay = ({ journal, date }) => {
    return (
        <div className="description-container">
            <span className="journal-styles">
                {journal}
            </span>
            <span className="date-styles">
                02/04/2020
            </span>
        </div>
    );
}

export default JournalDateDisplay;