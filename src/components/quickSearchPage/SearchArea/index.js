import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Typography, Box, Link, Container,FormControlLabel, Switch } from '@material-ui/core'

import './index.css';

/**
 * Search input component
 * @author[Ivan Kozlov](https://github.com/ivankozlovcodes)
 * @author[Danila Kurgan](https://github.com/dkurgan)
 */

/**
 * @param search text query
 * @param suggestion a text suggestion for search query
 * @param loading boolean representing whenever page is loading or not
 * @param onSubmit callback to be called when new query is submitted
 * @param setSwitch callback to show foamtree
 */
const SearchArea = ({ search, suggestion, loading, onSubmit, setSwitch}) => {
  const originalQuery = search;
  const [query, setQuery] = useState(search);

  const noSuggestionSearch = (e) => {
    e.preventDefault();
    onSubmit(originalQuery, false);
  }
  return (
    <Box className="search-input-container">
      <form onSubmit={() => onSubmit(query, true)} style={{width: "800px"}}>
        <TextField
          placeholder="search"
          variant="outlined"
          size="small"
          style={{ width: "100%" }}
          onChange={(e) => setQuery(e.target.value)}
          value={query} />
      </form>
          <Box>
            <Box pt={1} pb={1} className="qs-under-search">
          <Box style={{ display: "flex", flexDirection: "row" }} className="qs-deep-link">
            <Box style={{width: "550px"}} className="hidden">
            {suggestion && !loading ? (<Typography component="h2">
              Showing results for: <em>{suggestion}</em>
            </Typography>) : (!loading ? <FormControlLabel className="hidden" control={
                  <Switch onChange={setSwitch}
                inputProps={{ 'aria-label': 'primary checkbox',}}/>}
            label="FoamTree" labelPlacement="start"
            style={{margin: "0px", padding: "0px", marginTop: "-10px", color: "grey"}}
              />
              : null) }
            </Box>
                <Box style={{display:"flex", justifyContent: "flex-end", width: "250px"}}>
              <a style={{ textDecoration: "none", color: "grey", fontSize: "16px" }}
                href={'/search-ui/#/deepsearch/' + query}>Switch to Deep Literature Search</a>
            </Box>
          </Box>
          <Box display="flex" flexDirection="row">
            <Box width="300px" className="hidden">
          {suggestion && !loading ? (<Typography component="h5">
            Search instead for: <Link href="#" onClick={noSuggestionSearch}>{originalQuery}</Link>
              </Typography>) : null}
            </Box>
            <Box style={{ display: "flex", justifyContent: "flex-end", width: "550px" }} className="hidden">
              {suggestion && !loading ? <FormControlLabel className="hidden" control={
                  <Switch onChange={setSwitch}
                inputProps={{ 'aria-label': 'primary checkbox',}}/>}
            label="FoamTree" labelPlacement="start"
            style={{margin: "0px", padding: "0px", marginTop: "-10px", color: "grey", marginRight: "-10px"}}
              />
              : null}
            </Box>
            </Box>
          </Box>
            </Box>
    </Box>
  )
}

SearchArea.propTypes = {
  search: PropTypes.string,
  suggestion: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setSwitch: PropTypes.func.isRequired
};

export default SearchArea;
