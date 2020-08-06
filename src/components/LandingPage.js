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
  }
}));

const Landing = () => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState('');
  const [checkBox1, setCheckBox1] = useState(true);
  const [checkBox2, setCheckBox2] = useState(false);
  const history = useHistory();

  const search = (e) => {
    e.preventDefault();
    if (checkBox2)
      history.push(encodeURI('/deepsearch/'+searchValue))
    else
      history.push(encodeURI(searchValue));
  };
  const handleCheckBox = () => {
      setCheckBox1(!checkBox1);
      setCheckBox2(!checkBox2);
  }
  return (
    <div>
    <Container style={{minHeight: '70vh', flexDirection: 'column'}} className={classes.main} component="main" maxWidth="xl">
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
            placeholder="search"
            variant="outlined"
            margin="normal"
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
        <Container style={{marginTop: "20px", maxWidth: "800px"}} className={classes.main}>
          <div style={{display:"flex", width: "50%", justifyContent: "flex-end", paddingRight: "20px"}}>
          <input checked={checkBox1} onChange={handleCheckBox} name="checkbox-1" type="checkbox"></input>
            <label htmlFor="checkbox-1">Shallow Search</label>
          </div>
          <div style={{ display:"flex", width: "50%"}}> 
            <input checked={checkBox2}  onChange={handleCheckBox} style={{ borderRadius: "50%" }} name="checkbox-2" type="checkbox"></input>
            <label htmlFor="checkbox-2">Deep Search</label>
            </div>
        </Container>
        <Container style={{ maxWidth: "800px", marginTop: "20px" }}  >
          <div style={{float: "left", maxWidth:"50%"}}>
            <Typography>commodo <span style={{fontWeight: "bold"}}>odio</span> aenean sed adiTypographyiscing diam donec adipiscing tristique risus nec</Typography>
          </div>
          <div style={{maxWidth:"50%", float: "right"}} >
            <Typography>commodo <span style={{fontWeight: "bold"}}>odio</span> aenean sed adiTypographyiscing diam donec adipiscing tristique risus nec</Typography>
            </div>
        </Container>
        <Container style={{ maxWidth: "800px", marginTop: "20px" }}  >
          <div style={{float: "left", maxWidth:"50%"}}>
            <Typography>commodo <span style={{fontWeight: "bold"}}>odio</span> aenean sed adiTypographyiscing diam donec adipiscing tristique risus nec</Typography>
          </div>
          <div style={{maxWidth:"50%", float: "right"}} >
            <Typography>commodo <span style={{fontWeight: "bold"}}>odio</span> aenean sed adiTypographyiscing diam donec adipiscing tristique risus nec</Typography>
            </div>
        </Container>
      </Container>
      </div>
  );
};

export default Landing;
