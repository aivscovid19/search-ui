import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import {Box, Typography } from '@material-ui/core';

import Results from './results';
import SearchArea from './SearchArea';
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
  const setFoamTree = () => {
    setSwitch(!switchTree);
  }
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
        <Box style={{display: "flex", flexDirection: "row"}}>
        <Box style={{width: "155px"}}>
          <Typography component="h1" onClick={() => {window.location = '/search-ui'}} style={{fontSize: "2rem", fontWeight: "380"}}>
            BREATHE
          </Typography>
        </Box>
        <SearchArea
          onSubmit={quickSearch}
          search={params.search}
          suggestion={suggestion}
          loading={loading}
          setSwitch={setFoamTree}/>
          </Box>
        {loading ? (serverError ? <ServerError mt="150px" height="70px" width="70px" color="lightgrey" message={"Looks like server is not responding"}/> :
          <Spinner mt="150px" height="100px" width="auto" color="lightgrey" type="BallTriangle" />) :
            <Results switched={switchTree} count={resultCount} data={foamTreeData} docs={docs} setDocs={setDocs} setResultCount={setResultCount} /> }
      </Box>
    </>
  );
};

export default FoamTreeSearchPage;
