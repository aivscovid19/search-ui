import React from 'react';
import './styles.css';

export const JournalDateDisplay = ({ journal, journalTitle, date }) => {
    return (
        <div className="description-container">
            {(journal || journalTitle) && (
                <span className="journal-styles">
                    {journal ? journal : journalTitle}
                </span>
            )}
            {date && (
                <span
                 className={journal || journalTitle
                  ? "date-styles"
                  : "date-styles-no-journal"}
                >
                    {date}
                </span>
            )}
        </div>
    );
}

export default JournalDateDisplay;
