import React, { useState, useEffect } from 'react';

import SearchBox from './SearchBox';
import FoamTree from './FoamTree';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';

import { useParams } from 'react-router-dom';
import { fetchData, findDocs } from '../../controllers/dataFetch';
import { makeStyles } from '@material-ui/core/styles';

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

const Results = ({ count, data, docs, setDocs, setResultCount }) => {
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
      <FoamTree
        style={{ flex: '50%' }}
        groups={data}
        setDocs={setDocs}
        setResultCount={setResultCount}
        resultCount={count}
      />

      <Box px={2} flex="50%" display="flex" flexDirection="column">
        <Box mb={1}>
          <Paper variant="outlined" square>
            <Box p={1}>
              <Typography component="p">
                Top {currentCount} of {totalCount} papers
              </Typography>
            </Box>
          </Paper>
        </Box>

        <Box flex="50%" className={classes.searchResults}>
          {docs.map((d, i) => (
            <Box key={i} mb={2}>
              <Paper variant="outlined" square>
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
              </Paper>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const FoamTreeSearchPage = () => {
  const params = useParams();

  const [resultCount, setResultCount] = useState([0,0]);
  const [data, setData] = useState({});
  const [docs, setDocs] = useState([]);

  const [search, setSearch] = useState(params.search);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchData(search);
      const docs = findDocs({ groups: data });
      
      setResultCount([docs.length, docs.length]);
      setData(data);
      setDocs(docs);
      setLoading(false);
    };

    setLoading(true);
    fetch();
  }, [search]);

  return (
    <>
      {loading ? <LinearProgress /> : null}
      <Box p={3} height="100vh">
        <CssBaseline />
        <Box my={2}>
          <Typography component="h1" variant="h4">
            BREATHE
          </Typography>
        </Box>

        <SearchBox initialValue={params.search} onSearch={setSearch} />
        {!loading ? <Results count={resultCount} data={data} docs={docs} setDocs={setDocs} setResultCount={setResultCount} /> : null}
      </Box>
    </>
  );
};

export default FoamTreeSearchPage;
