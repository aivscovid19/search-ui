import React, { useState, useEffect } from 'react';

import SearchBox from './SearchBox';
import QuestionSuggestions from './QuestionSuggestions';
import FoamTree from './FoamTree';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { useParams } from 'react-router-dom';
import { fetchData, findDocs } from '../../controllers/dataFetch';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  divider: {
    marginBottom: '1.5rem',
    boxShadow: '0px 1px 3px 1px rgba(0,0,0,0.025)'
  },
  searchResults: {
    flex: '1',
    height: '100%',
    padding: '1rem',
    overflow: 'scroll'
  },
  searchResultsHeader: {
    display: 'flex',
    alignItems: 'center'
  },
  searchResultsTitle: {
    marginTop: 0,
    marginBottom: 0,
    fontSize: '1.5rem',
    fontWeight: 'bold',
  }
}));

const FoamTreeSearchPage = () => {
  const params = useParams();
  const classes = useStyles();

  const [data, setData] = useState({});
  const [docs, setDocs] = useState([]);

  const [search, setSearch] = useState(params.search);
  const [inputValue, setInputValue] = useState(params.search);

  useEffect(() => {
    console.log('fecth');
    const fetch = async () => {
      const data = await fetchData(search);
      const docs = findDocs({ groups: data });
      
      setData(data);
      setDocs(docs);
    };

    fetch();
  }, [search]);

  return (
    <Box p={3} height="100vh">
      <CssBaseline />
      <Box my={2}>
        <Typography component="h1" variant="h4">
          BREATHE
        </Typography>
      </Box>

      <SearchBox value={inputValue} onChange={setInputValue} onSearch={setSearch} />
      <QuestionSuggestions filter={inputValue} onClick={(q) => { setInputValue(q); setSearch(q); }} />

      <Box mt={2} display="flex" minHeight="85%" maxHeight="85%">
        <FoamTree
          style={{ flex: '50%' }}
          groups={data}
          setDocs={setDocs}
        />

        <Box flex="50%" display="flex" flexDirection="column">
          <Box mb={1}>
            <Paper square variant="outlined">
              <Box p={3}>
                <Typography component="h4" variant="h5">
                  {search}
                </Typography>
              </Box>
            </Paper>
          </Box>

          <div className={classes.searchResults}>
            {docs.map((d, i) => (
              <Box key={i} mb={2}>
                <Card variant="outlined">
                  <CardContent>
                    <div className={classes.searchResultsHeader}>
                      <a
                        href={`https://pubmed.ncbi.nlm.nih.gov/${d.pmid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <h4 className={classes.searchResultsTitle}>
                          {d.title}
                        </h4>
                      </a>
                    </div>
                    
                    <Box mt={1}>
                      <Typography component="p" variant="subtitle1" color="textSecondary">
                        {d.journal}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default FoamTreeSearchPage;
