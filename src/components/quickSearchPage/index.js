import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Grid, Container, Switch, Box, Typography } from '@material-ui/core';

import FoamTree from './foamTree';
import SearchInput from './searchInput';
import KeywordsDisplay from '../KeywordsDisplay';
import SeacrhScore from '../helpers/SearchScore';
import Spinner from '../helpers/LoadingSpiner';
import ServerError from '../helpers/SereverError';
import { PopUpMessage } from '../helpers/PopUpMessage';
import {preventRerender} from '../helpers/preventRerender';
import { buildFoamtreeDataObject } from '../../helpers/sortFoamTree';
import { decodeUnicodeFields } from '../../helpers/htmlDecode';
import { splitDocumentKeywords } from '../../helpers/article';
import { fetchData } from '../../controllers/dataFetch';


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
  const GOOGLE_FORMS_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLScwHTMbE4oVDgyjPNNAA4D6YG0Y2TEMebZz2OvMq84F5Juezg/viewform?embedded=true";
  const [currentCount, totalCount] = count;
  const [reportArticle, setReport] = useState(false);
  const [articleReference, setArticleReference] = useState();
  const closeMessage = () => {
    setReport(!reportArticle);
    setArticleReference(null);
  }
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
        <PopUpMessage visibility={reportArticle} onClose={closeMessage} title="You are about to report article"
          footer="By clicking on information above,it will be saved in your clipboard and you will be redirected to google forms."
          href={GOOGLE_FORMS_URL} copy={true} article={articleReference} />
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
              <Box key={i} mb={2} >
                <Paper variant="outlined" square>
                  <Grid container >
                    <Grid container item xs alignContent="center">
                      <SeacrhScore score={d.score} placement={d.placement} />
                    </Grid>
                    <Grid item xs={11}>
                      <Box p={2} style={{paddingBottom: "10px"}}>
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
                          <Box style={{ display: "flex", color: "grey", fontSize: "1.3rem !important"}}>
                            <div style={{width: "50%"}}></div>
                            <div style={{display:"flex", width: "50%",justifyContent: "flex-end", cursor: "pointer"}}>
                              <Typography component="p" variant="subtitle1" onClick={() => {
                                setReport(true); setArticleReference(d);
                              }}>
                                Report Article
                          </Typography>
                          </div>
                          </Box>
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
  const [foamTreeData, setFoamTreeData] = useState({});
  const [docs, setDocs] = useState([]);

  const [loading, setLoading] = useState(false);
  const [serverError, setError] = useState(false);
  const [switchTree, setSwitch] = useState(false);
  const [suggestion, setSuggestion] = useState(null);

  const fetch = async (search, shouldSuggest = true) => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const { data } = await fetchData(search, { suggestion: shouldSuggest });
      const docs = data.docs.map(splitDocumentKeywords);
      const foamTreeData = buildFoamtreeDataObject(decodeUnicodeFields(docs));
      setResultCount([docs.length, data.length]);
      setFoamTreeData(foamTreeData);
      setDocs(docs);
      setSuggestion(data.suggestion);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch(params.search);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const quickSearch = (query, shouldSuggest) => {
    fetch(query, shouldSuggest);
    setSwitch(false);
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
        <SearchInput
          onSubmit={quickSearch}
          search={params.search}
          suggestion={suggestion}
          loading={loading} />
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
            <Results switched={switchTree} count={resultCount} data={foamTreeData} docs={docs} setDocs={setDocs} setResultCount={setResultCount} />}
      </Box>
    </>
  );
};

export default FoamTreeSearchPage;
