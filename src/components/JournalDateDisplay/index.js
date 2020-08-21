import React from 'react';
import './styles.css';

// The keyword component takes a list as an argument

export const JournalDateDisplay = ({ journal, date }) => {
    journal = journal.length > 130
    ? journal.slice(0, 130).trim() + "..."
    : journal
    return (
        <div className="description-container">
            <span className="journal-styles">
                {journal}
            </span>
            {date && (
                <span className="date-styles">
                    {date}
                </span>
            )}
        </div>
    );
}

export default JournalDateDisplay;
