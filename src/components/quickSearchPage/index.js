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
import { fetchData, fetchPage } from '../../controllers/dataFetch';

const FoamTreeSearchPage = () => {
  const params = useParams();
  const history = useHistory();

  const [resultCount, setResultCount] = useState([0,0]);
  const [foamTreeData, setFoamTreeData] = useState({});
  const [docs, setDocs] = useState([]);

  const [querySearch, setQuerySearch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serverError, setError] = useState(false);
  const [switchTree, setSwitch] = useState(false);
  const [suggestion, setSuggestion] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const fetch = async (search, shouldSuggest = true, page) => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      let response;
      if (page) {
        setPageNumber(page);
        response = await fetchPage(search, page, { suggestion: true });
      } else {
        response = await fetchData(search, { suggestion: shouldSuggest });
        setPageNumber(1);
      }
      const { data } = response;
      const docs = data.docs.map(splitDocumentKeywords);
      const foamTreeData = buildFoamtreeDataObject(decodeUnicodeFields(docs));
      setResultCount([docs.length, data.length]);
      setFoamTreeData(foamTreeData);
      setDocs(docs);
      setSuggestion(data.suggestion);
    } catch (e) {
      console.log(e);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  const setFoamTree = () => {
    setSwitch(!switchTree);
  }
  useEffect(() => {
    setQuerySearch(params.search);
    fetch(params.search);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const quickSearch = (query, shouldSuggest, page) => {
    setQuerySearch(query);
    if (page) { fetch(query, shouldSuggest, page); }
    else {fetch(query, shouldSuggest);}
    setSwitch(false);
    history.push(decodeURI(query));
  }
  return (
    <>
      <Box p={3} height="100vh" className="qs-container">
        <Box style={{display: "flex", flexDirection: "row"}} className="qs-search-area">
        <Box style={{width: "155px"}} className="brand-title">
          <Typography component="h1" onClick={() => {window.location = '/search-ui'}} style={{fontSize: "2rem", fontWeight: "380"}} className="title">
            BREATHE
          </Typography>
        </Box>
        <SearchArea
          onSubmit={quickSearch}
          search={querySearch ? querySearch : params.search}
          suggestion={suggestion}
          loading={loading}
          setSwitch={setFoamTree}/>
          </Box>
        {loading ? (serverError ? <ServerError mt="150px" height="70px" width="70px" color="lightgrey" message={"Looks like server is not responding"}/> :
          <Spinner mt="150px" height="100px" width="auto" color="lightgrey" type="BallTriangle" />) :
          <Results switched={switchTree} count={resultCount} data={foamTreeData} docs={docs} setDocs={setDocs} fetchPage={quickSearch}
            setResultCount={setResultCount} pageNumber={pageNumber} search={suggestion ? suggestion : querySearch}/>}
      </Box>
    </>
  );
};

export default FoamTreeSearchPage;
