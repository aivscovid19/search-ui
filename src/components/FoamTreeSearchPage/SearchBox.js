import React from 'react';
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
        className="search-bar"
        label="Search Bar UI"
        variant="outlined"
        fullWidth
        InputLabelProps={{ shrink: true }}
        value={value}
        onChange={e => onChange(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        type="submit"
      >
        Search
      </Button>
    </form>
  );
};

export default SearchBox;
