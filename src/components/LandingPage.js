import React, { useState } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import MicIcon from '@material-ui/icons/Mic';
import TextField from '@material-ui/core/TextField';

import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    flexDirection: 'column'
  }
}));

const Landing = () => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState('');
  const history = useHistory();

  const search = (e) => {
    e.preventDefault();
    history.push(searchValue);
  };

  return (
    <Container className={classes.main} component="main" maxWidth="xl">
      <CssBaseline />
      <Typography align="center" component="h1" variant="h3">
        BREATHE
      </Typography>

      <Typography align="center" component="h2" variant="h6">
        Biomedical Research Extensive Archive To Help Everyone
      </Typography>
      
      <Container maxWidth="xs">
        <form onSubmit={search}>
          <TextField
            autoFocus
            fullWidth
            variant="outlined"
            margin="normal"
            label="search"
            size="small"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
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
      </Container>
    </Container>
  );
};

export default Landing;
