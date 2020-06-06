import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > .search-bar': {
      marginRight: '1rem'
    }
  },
}));

const SearchBox = ({ initialValue, onSearch }) => {
  const classes = useStyles();
  const [search, setSearch] = useState(initialValue)

  return (
    <div className={classes.root}>
      <TextField
        className="search-bar"
        label="Search Bar UI"
        variant="outlined"
        fullWidth
        InputLabelProps={{ shrink: true }}
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={() => onSearch(search)}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBox;
