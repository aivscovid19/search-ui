import React, { useState, useEffect } from 'react';

import FoamTree from './foamTree';
import SeacrhScore from '../helpers/SearchScore';
import KeywordsDisplay from '../KeywordsDisplay';
import JournalDateDisplay from '../JournalDateDisplay';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import {Grid, Container, Switch, TextField} from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { useParams, useHistory } from 'react-router-dom';
import { fetchData } from '../../controllers/dataFetch';
import { makeStyles } from '@material-ui/core/styles';

import Spinner from '../helpers/LoadingSpiner';
import ServerError from '../helpers/SereverError';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { buildFoamtreeDataObject } from '../../helpers/sortFoamTree';
import { decodeUnicodeFields } from '../../helpers/htmlDecode';
import {preventRerender} from '../helpers/preventRerender.js'

const useStyles = makeStyles(() => ({
  divider: {
    marginBottom: '1.5rem',
    boxShadow: '0px 1px 3px 1px rgba(0,0,0,0.025)'
  },
  searchResultsTop: {
    margin: '0 auto 0.5em auto'
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
    textDecorationColor: '#000',
    textDecoration: 'none',
    "&:hover": {
      textDecoration: 'underline',
      textDecorationColor: '#000',
      opacity: '0.9',
    }
  },
  searchResultsTitle: {
    marginTop: 0,
    marginBottom: 0,
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
}));

const Results = React.memo(({ count, data, docs, setDocs, setResultCount, switched }) =>{
  const MAX_ABSTRACT = 250;
    const [currentCount, totalCount] = count;
    const classes = useStyles();
    if (docs.length === 0) {
      return (
        <Box
          display="flex"
          height="85%"
          justifyContent="center"
          alignItems="center"
        >
          <Typography component="h4" variant="h3">
            NO RESULTS FOR QUERY
        </Typography>
        </Box>
      );
    }

    return (
      <Box mt={2} display="flex" minHeight="85%" maxHeight="85%">
        {switched ? <FoamTree
          style={{ flex: '90%', zIndex: "1" }}
          groups={data}
          setDocs={setDocs}
          setResultCount={setResultCount}
          resultCount={count}
        /> : null}

        <Box px={2} flex="100%" display="flex" flexDirection="column" zIndex="1">
          <Box className={classes.searchResultsTop} width="80%">
            <Paper variant="outlined" square>
              <Box p={1}>
                <Typography component="p">
                  Top {currentCount} papers
              </Typography>
              </Box>
            </Paper>
          </Box>
          <Box flex="100%" className={classes.searchResults} style={{ margin: "auto" }} maxWidth="80%">
            {docs.map((d, i) => (
              <Box key={i} mb={2}>
                <Paper variant="outlined" square>
                  <Grid container >
                    <Grid container item xs alignContent="center">
                      <SeacrhScore score={d.score} placement={d.placement} />
                    </Grid>
                    <Grid item xs={11}>
                      <JournalDateDisplay journal={d.journal} date={d.date} />
                      <Box p={2}>
                        <Box className={classes.searchResultsHeader}>
                          <a
                            href={`https://pubmed.ncbi.nlm.nih.gov/${d.pmid}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={classes.searchResultsLink}
                          >
                            <Typography component="h4" variant="h5" color="textPrimary">
                              {d.title}
                            </Typography>
                          </a>
                        </Box>

                        <Box>
                          <KeywordsDisplay keywords={d.keywords}></KeywordsDisplay>
                        </Box>

                        <Box mt={1}>
                          <Typography component="p" variant="subtitle1" color="primary">
                            {d.journal}
                          </Typography>

                          <Typography component="p" variant="subtitle1" color="textPrimary">
                            {(d.abstract.length >= MAX_ABSTRACT) ? `${d.abstract.slice(0, MAX_ABSTRACT).trim()}...` : d.abstract}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    );
}, preventRerender("docs", "data"));

const FoamTreeSearchPage = () => {
  const params = useParams();
  const history = useHistory();

  const [resultCount, setResultCount] = useState([0,0]);
  const [data, setData] = useState({});
  const [docs, setDocs] = useState([]);

  const [query, setQuery] = useState(params.search);
  const [loading, setLoading] = useState(true);
  const [serverError, setError] = useState(false);
  const [switchTree, setSwitch] = useState(false);

  const fetch = async (search) => {
    setLoading(true);
    let data;
    try {
      data = await fetchData(search);
    } catch {
      setError(true);
      return;
    }
    const docs = data.map((doc) => {
      const newDoc = Object.assign({}, doc);
      // verifying if keywords exist and returning an empty array if not
      newDoc.keywords = newDoc.keywords
        ? doc.keywords.toLowerCase().split(';').map(keyword =>
        keyword.split(',')).reduce((currnetItem, aggrregation) => [...currnetItem, ...aggrregation], [])
        : [];
      return newDoc;
    });
    data = buildFoamtreeDataObject(decodeUnicodeFields(docs));
    setResultCount([docs.length, data.length]);
    setData(data);
    setDocs(docs);
    setLoading(false);
  };

  useEffect(() => {
    fetch(query);
  }, []);
  const quickSearch = () => {
    fetch(query);
    setSwitch(!switchTree);
    history.push(decodeURI(query));
  }
  return (
    <>
      <Box p={3} height="100vh">
        <Box my={2}>
          <Typography component="h1" onClick={() => {window.location = '/search-ui'}} variant="h4">
            BREATHE
          </Typography>
        </Box>
        <form onSubmit={quickSearch} style={{display: "flex", justifyContent: "center"}}>
          <TextField placeholder="search" variant="outlined" size="small" style={{ width: "100%" }} onChange={(e) => setQuery(e.target.value)} value={query} />
        </form>
        <Container style={{ display: "flex", flexDerection: "row", alignItems: "center", width: "100%", height: "20px" }}>
          
          <Container style={{display:"flex", justifyContent: "flex-start", marginTop: "10px", width: "50%" }}>
            {!loading ?
              <FormControlLabel
                control={
                  <Switch
                    onChange={() => { setSwitch(!switchTree) }}
                    inputProps={{ 'aria-label': 'primary checkbox' }
                  }/>
                }
                label="Toggle FoamTree"
              />
              : null }
          </Container>
            <Container style={{display:"flex", justifyContent: "flex-end", marginTop: "23px", width: "50%", paddingRight: "50px"}}>
                            <ArrowBackIosIcon style={{color: "grey"}}/>
            <a style={{ textDecoration: "none", color: "grey", fontSize: "16px" }} href={'/search-ui/#/deepsearch/' + params.search}>Switch to Deep Literature Search</a>
          </Container>
        </Container>
        {loading ? (serverError ? <ServerError mt="150px" height="70px" width="70px" color="lightgrey" message={"Looks like server is not responding"}/> :
          <Spinner mt="150px" height="100px" width="auto" color="lightgrey" type="BallTriangle" />) :
            <Results switched={switchTree} count={resultCount} data={data} docs={docs} setDocs={setDocs} setResultCount={setResultCount} />}
      </Box>
    </>
  );
};

export default FoamTreeSearchPage;
