import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Container, Switch, Box, Typography } from '@material-ui/core';

import Results from './results';
import SearchInput from './searchInput';
import Spinner from '../helpers/LoadingSpiner';
import ServerError from '../helpers/SereverError';
import { buildFoamtreeDataObject } from '../../helpers/sortFoamTree';
import { decodeUnicodeFields } from '../../helpers/htmlDecode';
import { splitDocumentKeywords } from '../../helpers/article';
import { fetchData } from '../../controllers/dataFetch';

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
