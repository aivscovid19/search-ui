import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Typography, Box, Link } from '@material-ui/core'

import './index.css';

/**
 * Search input component
 * @author[Ivan Kozlov](https://github.com/ivankozlovcodes)
 */

/**
 * @param search text query
 * @param suggestion a text suggestion for search query
 * @param loading boolean representing whenever page is loading or not
 * @param onSubmit callback to be called when new query is submitted
 */
const SearchInput = ({ search, suggestion, loading, onSubmit }) => {
  const originalQuery = search;
  const [query, setQuery] = useState(search);

  const noSuggestionSearch = (e) => {
    e.preventDefault();
    onSubmit(originalQuery, false);
  }
  return (
    <Box px={2} className="search-input-container">
      <form onSubmit={() => onSubmit(query, true)} style={{width: "50%"}}>
        <TextField
          placeholder="search"
          variant="outlined"
          size="small"
          style={{ width: "100%" }}
          onChange={(e) => setQuery(e.target.value)}
          value={query} />
      </form>
      {
        suggestion && !loading ? (
          <Box pt={1} pb={1}>
            <Typography component="h2">
              Showing results for: <em>{suggestion}</em>
            </Typography>
            <Typography component="h5">
              Search instead for: <Link href="#" onClick={noSuggestionSearch}>{originalQuery}</Link>
            </Typography>
          </Box>
        ) : null
      }
    </Box>
  )
}

SearchInput.propTypes = {
  search: PropTypes.string,
  suggestion: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default SearchInput;
