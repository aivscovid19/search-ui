import React from 'react';
import './styles.css';

// The keyword component takes a list as an argument

export const JournalDateDisplay = ({ journal, date }) => {
    // currently receiving a single-item list and spliting
    // keyword area shortened by randomizing and then slicing list

    return (
        <div className="description-container">
            <span className="journal-styles">
                {journal}
            </span>
            <span className="date-styles">
                11/02/2020
            </span>
        </div>
    );
}

export default JournalDateDisplay;