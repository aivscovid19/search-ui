import React, { useState } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import MicIcon from '@material-ui/icons/Mic';
import TextField from '@material-ui/core/TextField';

import QUESTIONS from '../questionSuggestions.json';

import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    flexDirection: 'column',
    marginTop: '15%'
  }
}));

const Landing = () => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState('');
  const history = useHistory();

  const search = (e, overrideSearch) => {
    if (e)
      e.preventDefault();
    if (overrideSearch)
      history.push(encodeURI(overrideSearch));
    else
      history.push(encodeURI(searchValue));
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
      
      <Container maxWidth="sm">
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

        <Typography component="p" color="textSecondary" variant="overline">
          Question you can try
        </Typography>

        <Box>
        {QUESTIONS.map((q, i) => (
          <Box key={i} mb={2}>
            <Card style={{ cursor: 'pointer' }} onClick={() => search(null, q)}>
              <CardContent>
                <Typography variant="body2" component="p">
                  {q}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
        </Box>
      </Container>
    </Container>
  );
};

export default Landing;
