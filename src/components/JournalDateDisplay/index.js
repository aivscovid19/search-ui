import React from 'react';
import './styles.css';

export const JournalDateDisplay = ({ journal, journalTitle, date }) => {
    const hasJournalTitle = journal || journalTitle;
    return (
        <div className="description-container">
            {hasJournalTitle && (
                <span className="journal-styles">
                    {journal ? journal.split(':')[0] : journalTitle.split(':')[0]}
                </span>
            )}
            {date && (
                <span
                 className={hasJournalTitle
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
