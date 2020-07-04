import React, { useState, useEffect } from 'react';

import SearchBox from './SearchBox';
import QuestionSuggestions from './QuestionSuggestions';
import FoamTree from './FoamTree';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';

import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { Grid, CardActionArea, CardContent, CardActions, Card, Avatar, ListItemAvatar, Divider, List, ListItem, ListItemText } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';


import { useParams } from 'react-router-dom';
import { fetchData, findDocs } from '../../controllers/dataFetch';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  divider: {
    marginBottom: '1.5rem',
    boxShadow: '0px 1px 3px 1px rgba(0,0,0,0.025)'
  },
  searchResults: {
    height: '100%',
    overflow: 'scroll'
  },
  searchResultsHeader: {
    display: 'flex',
    alignItems: 'center'
  },
  searchResultsLink: {
    textDecorationColor: '#000'
  },
  searchResultsTitle: {
    marginTop: 0,
    marginBottom: 0,
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  root: {
    width: '100%',
    //maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const Results = ({ name, data, docs, setDocs }) => {

  const classes = useStyles();

  if (docs.length === 0) {
    return (
      <Paper
        display="flex"
        height="85%"
        justifyContent="center"
        alignItems="center"
      >
        <Typography component="h4" variant="h3">
          NO RESULTS FOR QUERY
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.searchResults}>
      <List className={classes.root}>
        {docs.map((doc, i) => (
          <div key={i}>
            <Abstract key={`${name}-${i}`} {...doc} ></Abstract>
            <Divider key={`${name}-div-${i}`} variant="inset" component="li" ></Divider>
          </div>
          // <ListItem dense>
          //   <Box p={2}>
          //     <Box className={classes.searchResultsHeader}>
          //       <a
          //         href={`https://pubmed.ncbi.nlm.nih.gov/${d.pmid}`}
          //         target="_blank"
          //         rel="noopener noreferrer"
          //         className={classes.searchResultsLink}
          //       >
          //         <Typography component="h4" variant="h5" color="textPrimary">
          //           {d.title}
          //         </Typography>
          //       </a>
          //     </Box>

          //     <Box mt={1}>
          //       <Typography component="p" variant="subtitle1" color="primary">
          //         {d.journal}
          //       </Typography>

          //       <Typography component="p" variant="subtitle1" color="textPrimary">
          //       </Typography>
          //     </Box>
          //   </Box>
          // </ListItem>
        ))}
      </List>
    </Paper>
  );
};

const MAX_ABSTRACT = 512;

function truncate(text) {
  var text = text === undefined ? "?" : text
  return (text.length >= MAX_ABSTRACT) ? text.slice(0, MAX_ABSTRACT).trim() + `...` : text
}

function LinkTitle(props) {
  const classes = useStyles();
  return (<a
    href={`https://pubmed.ncbi.nlm.nih.gov/${props.pmid}`}
    target="_blank"
    rel="noopener noreferrer"
    className={classes.searchResultsLink}
  >{props.title}</a>)
}

function ChangeIndicator(props) {
  if (props.newpos < props.prevpos) {
    return (<><KeyboardArrowUpIcon
      style={{ color: green[500] }} />
      <Typography type="subheading"
        style={{ color: green[500] }}
      >
        +{props.prevpos - props.newpos}
      </Typography></>)
  }
  if (props.newpos === props.prevpos) {
    return (<Typography type="subheading">
      +0
    </Typography>)
  } else {
    return (<><KeyboardArrowDownIcon
      style={{ color: red[500] }} />
      <Typography type="subheading">
        -{props.newpos - props.prevpos}
      </Typography></>)
  }
}

function Abstract(props) {
  const classes = useStyles();
  const doc = props.doc;
  return <ListItem alignItems="flex-start">
    <ListItemAvatar>
      <Typography variant="caption" display="block" gutterBottom>
        <ChangeIndicator {...props}>
        </ChangeIndicator>
        {String(props.score).slice(0, 5)}
      </Typography>
    </ListItemAvatar>
    <ListItemText
      primary={parseInt(doc.pmid) !== 0 ? LinkTitle(doc) : doc.title}
      secondary={
        <React.Fragment>
          <Typography
            component="span"
            variant="body2"
            className={classes.inline}
            color="textPrimary"
          >
            {doc.authors}
          </Typography>
          <br />
          {truncate(doc.abstract)}
        </React.Fragment>}
    />
  </ListItem>
}

const FoamTreeSearchPage = () => {
  const params = useParams();

  const [data, setData] = useState({});
  const [reranked, setReRanked] = useState([]);
  const [original, setOriginal] = useState([]);

  const [search, setSearch] = useState(params.search);
  const [loading, setLoading] = useState(true);
  // const [inputValue, setInputValue] = useState(params.search);

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchData(search);
      // console.log(data);
      const reranked = data['reranked'];
      const original = data['original'];

      setData(data);
      setOriginal(original);
      setReRanked(reranked);
      setLoading(false);
    };

    setLoading(true);
    fetch();
  }, [search]);

  return (
    <>

      <Paper variant="outlined" elevation={3}>
        <CssBaseline />
        <Card variant="outlined">
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                BREATHE/CORD19
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <SearchBox initialValue={params.search} onSearch={setSearch} />
            {/* <Button size="small" color="primary">
            Share
        </Button>
          <Button size="small" color="primary">
            Learn More
        </Button> */}
          </CardActions>
          {loading ? <LinearProgress color="secondary" /> : null}
        </Card>

        {/* <QuestionSuggestions filter={inputValue} onClick={(q) => { setInputValue(q); setSearch(q); }} /> */}
        {!loading ? <Results name="reranked" data={data} docs={reranked} setDocs={setReRanked} /> : null}
        <Grid container>
          {/* <Grid item xs={6}>
            {!loading ? <Results name="original" data={data} docs={original} setDocs={setOriginal} /> : null}
          </Grid> */}
          <Grid item xs={8}>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default FoamTreeSearchPage;
