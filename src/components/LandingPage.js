import React, { useState } from 'react';

import { Typography, Container, TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Autocomplete } from '@material-ui/lab';
import QUESTIONS from '../config/questions.js'

import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    justifyContent: 'center'
  }
}));


const Landing = () => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState('');
  const [checkBox1, setCheckBox1] = useState(true);
  const [checkBox2, setCheckBox2] = useState(false);
  const history = useHistory();

  const search = () => {
    if (!searchValue) return;
    if (checkBox2)
      history.push(encodeURI('/deepsearch/'+ searchValue))
    else if (checkBox1)
      history.push(encodeURI(searchValue));
  };
  const handleCheckBox = () => {
      setCheckBox1(!checkBox1);
      setCheckBox2(!checkBox2);
  }
  return (
    <div>
    <Container style={{minHeight: '70vh', flexDirection: 'column'}} className={classes.main} component="main" maxWidth="xl">
      <Typography align="center" component="h1" variant="h3" className="lp-header">
        BREATHE
      </Typography>

      <Typography align="center" component="h2" variant="h6" className="description">
        Biomedical Research Extensive Archive To Help Everyone
      </Typography>
      <Container maxWidth="sm" className="lp-search-input">
          <form onSubmit={search}>
          <Autocomplete
            freeSolo
            fullWidth
            style={{margin: "10px"}}
            placeholder="search"
            variant="outlined"
              size="small"
              disableClearable
            options={QUESTIONS.map((qeust)=> qeust)}
              value={searchValue}
              inputValue={searchValue}
              onInputChange={(_, newInputValue) => setSearchValue(newInputValue)}
              onChange={(_, newValue) => {
                setSearchValue(newValue);
                if (newValue) search(newValue);
              }}
            renderInput={params => {
              params.InputProps.startAdornment = (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              );
              return <TextField {...params} placeholder="search" InputProps={{ ...params.InputProps, type: 'search' }}
                variant="outlined" />
            }}
            />
            </form>
        </Container>
        <Container style={{marginTop: "20px", maxWidth: "800px", display: 'flex',justifyContent: 'center'}} className="lp-main">
          <div style={{display:"flex", width: "50%", justifyContent: "flex-end", paddingRight: "20px"}} className="lp-checkbox">
          <input checked={checkBox1} onChange={handleCheckBox} name="checkbox-1" type="checkbox"></input>
            <label htmlFor="checkbox-1">Quick Search</label>
          </div>
          <div style={{ display:"flex", width: "50%"}} className="lp-checkbox" id="deepsearch"> 
            <input checked={checkBox2}  onChange={handleCheckBox} style={{ borderRadius: "50%" }} name="checkbox-2"  type="checkbox"></input>
            <label htmlFor="checkbox-2">Deep Literature Search</label>
            </div>
        </Container>
        <Container style={{ maxWidth: "800px", marginTop: "20px" }}  className="lp-container">
          <div style={{float: "left", maxWidth:"50%"}} >
            <Typography className="text">commodo <span style={{fontWeight: "bold"}}>odio</span> aenean sed adiTypographyiscing diam donec adipiscing tristique risus nec</Typography>
          </div>
          <div style={{maxWidth:"50%", float: "right"}} >
            <Typography className="text">commodo <span style={{fontWeight: "bold"}}>odio</span> aenean sed adiTypographyiscing diam donec adipiscing tristique risus nec</Typography>
            </div>
        </Container>
        <Container style={{ maxWidth: "800px", marginTop: "20px" }}  className="lp-container">
          <div style={{float: "left", maxWidth:"50%"}} className="text">
            <Typography>commodo <span style={{fontWeight: "bold"}}>odio</span> aenean sed adiTypographyiscing diam donec adipiscing tristique risus nec</Typography>
          </div>
          <div style={{maxWidth:"50%", float: "right"}} className="text">
            <Typography>commodo <span style={{fontWeight: "bold"}}>odio</span> aenean sed adiTypographyiscing diam donec adipiscing tristique risus nec</Typography>
            </div>
        </Container>
      </Container>
      </div>
  );
};

export default Landing;
