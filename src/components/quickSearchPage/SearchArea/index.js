import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, Typography, Box, Link, FormControlLabel, Switch } from '@material-ui/core'

import QUESTIONS from '../../../config/questions.js';
import { Autocomplete } from '@material-ui/lab';

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
const SearchArea = ({ search, suggestion, loading, onSubmit, setSwitch, successLoad }) => {
  const originalQuery = search;
  const [query, setQuery] = useState(search);
  useEffect(() => {
    if (suggestion) {
      setQuery(search);
    }
  }, [search])
  const noSuggestionSearch = (e) => {
    e.preventDefault();
    onSubmit(originalQuery, false);
  }
  return (
    <Box className="search-input-container">
      <form onSubmit={() => onSubmit(query, true)} style={{width: "800px"}}>
        <Autocomplete
            freeSolo
          fullWidth
          placeholder="search"
            style={{width: "100%"}}
            variant="outlined"
          size="small"
          disableClearable
          inputValue={query}
          onInputChange={(_, newQuery) => setQuery(newQuery)}
            options={QUESTIONS.map((qeust)=> qeust)}
            value={query}
              onChange={(_, newValue) => {
                setQuery(newValue);
                if (newValue) onSubmit(newValue);
              }}
            renderInput={params => {
              return <TextField {...params} placeholder="search"
                InputProps={{ ...params.InputProps, type: 'search' }} variant="outlined" />
            }}
            />
      </form>
          <Box>
            <Box pt={1} pb={1} className="qs-under-search">
          <Box style={{ display: "flex", flexDirection: "row" }} className="qs-deep-link">
            <Box style={{width: "550px"}} className="hidden">
            {suggestion && !loading ? (<Typography component="h2">
              Showing results for: <em>{suggestion}</em>
            </Typography>) : ((!loading && !successLoad)? <FormControlLabel className="hidden" control={
                  <Switch onChange={setSwitch}
                inputProps={{ 'aria-label': 'primary checkbox',}}/>}
            label="FoamTree" labelPlacement="start"
            style={{margin: "0px", padding: "0px", marginTop: "-10px", color: "grey"}}
              />
              : null) }
            </Box>
                <Box style={{display:"flex", justifyContent: "flex-end", width: "250px"}}>
              <a style={{ textDecoration: "none", color: "grey", fontSize: "16px" }}
                href={'/#/deepsearch/search/' + query}>Switch to Deep Literature Search</a>
            </Box>
          </Box>
          <Box display="flex" flexDirection="row">
            <Box width="300px" className="hidden">
          {suggestion && !loading ? (<Typography component="h5">
            Search instead for: <Link href="#" onClick={noSuggestionSearch}>{originalQuery}</Link>
              </Typography>) : null}
            </Box>
            <Box style={{ display: "flex", justifyContent: "flex-end", width: "550px" }} className="hidden">
              {(suggestion && !loading && !successLoad) ? <FormControlLabel className="hidden" control={
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
