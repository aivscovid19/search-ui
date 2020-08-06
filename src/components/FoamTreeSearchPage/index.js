import React, { useState, useEffect } from 'react';

import SearchBox from './SearchBox';
import FoamTree from './FoamTree';
import SeacrhScore from '../SearchScore';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import {Grid, Container, Switch} from '@material-ui/core'

import { useParams } from 'react-router-dom';
import { fetchData, findDocs } from '../../controllers/dataFetch';
import { makeStyles } from '@material-ui/core/styles';

import { pretifyT5Score } from '../../helpers/score';
import Spinner from '../helpers/LoadingSpiner';
import ServerError from '../helpers/SereverError';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { render } from 'react-dom';

const useStyles = makeStyles(() => ({
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
  }
}));

class Results extends React.Component{
  render(){
    const { count, data, docs, setDocs, setResultCount, switched } = this.props
    console.log(this.props)
    console.log(switched)
    const MAX_ABSTRACT = 250;

    const [currentCount, totalCount] = count;
    const classes = useStyles();
    //Delete below 2 fake after top score chart will be ready
    let fakeRating = data.length - 1;
    // Two above
    if (data.length === 0) {
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
      <Box mt={2} display="flex" minHeight="85%" maxHeight="85%" >
        {switched ? <FoamTree
          style={{ flex: '50%' }}
          groups={data}
          setDocs={setDocs}
          setResultCount={setResultCount}
          resultCount={count}
        /> : null}

        <Box px={2} flex="100%" display="flex" flexDirection="column">
          <Box mb={1}>
            <Paper variant="outlined" square>
              <Box p={1}>
                <Typography component="p">
                  Top {currentCount} of {totalCount} papers
              </Typography>
              </Box>
            </Paper>
          </Box>
          <Box flex="100%" className={classes.searchResults} style={{ margin: "auto" }} maxWidth="80%">
            {data.map((d, i) => (
              <Box key={i} mb={2}>
                <Paper variant="outlined" square>
                  <Grid container >
                    <Grid container item xs alignContent="center">
                      <SeacrhScore placement={pretifyT5Score(d.score)} rating={"+" + fakeRating--} />
                    </Grid>
                    <Grid item xs={11}>
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
  }
};

const FoamTreeSearchPage = () => {
  const params = useParams();

  const [resultCount, setResultCount] = useState([0,0]);
  const [data, setData] = useState({});
  const [docs, setDocs] = useState([]);

  const [search, setSearch] = useState(params.search);
  const [loading, setLoading] = useState(true);
  const [serverError, setError] = useState(false);
  const [switchTree, setSwitch] = useState(false);
  
  useEffect(() => {
    const fetch = async () => {
      const data = await fetchData(search);
      if (data === "error") {
        setError(true);
        return;
      }
      const docs = findDocs({ groups: data });
      setResultCount([docs.length, data.length]);
      setData(data);
      setDocs(docs);
      setLoading(false);
    };

    setLoading(true);
    fetch();
  }, [search]);
  return (
    <>
      <Box p={3} height="100vh">
        <CssBaseline />
        <Box my={2}>
          <Typography component="h1" onClick={() => {window.location = '/search-ui'}} variant="h4">
            BREATHE
          </Typography>
        </Box>

        <SearchBox initialValue={params.search} onSearch={setSearch} />
        <Container style={{ display: "flex", flexDerection: "row", alignItems: "center", width: "100%", height: "20px" }}>
          
          <Container style={{display:"flex", justifyContent: "flex-start", marginTop: "10px", width: "50%" }}>
            {!loading ? <Switch onChange={() => { setSwitch(!switchTree) }} inputProps={{ 'aria-label': 'primary checkbox' }} /> :null}
          </Container>
            <Container style={{display:"flex", justifyContent: "flex-end", marginTop: "23px", width: "50%", paddingRight: "50px"}}>
                            <ArrowBackIosIcon style={{color: "grey"}}/>
            <a style={{ textDecoration: "none", color: "grey", fontSize: "16px" }} href={'/search-ui/#/deepsearch/' + params.search}>Switch to Deep Search</a>
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
