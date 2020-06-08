import React from 'react';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import MicIcon from '@material-ui/icons/Mic';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
}));

const SearchBox = ({ value, onChange, onSearch }) => {
  const classes = useStyles();

  const onSubmit = (e) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form
      className={classes.root}
      onSubmit={onSubmit}
    >
      <TextField
        fullWidth
        label="Search Bar UI"
        variant="outlined"
        size="small"
        InputLabelProps={{ shrink: true }}
        value={value}
        onChange={e => onChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <MicIcon />
            </InputAdornment>
          )
        }}
      />
    </form>
  );
};

export default SearchBox;
