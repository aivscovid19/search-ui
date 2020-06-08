import React, { useState, useEffect } from 'react';

import SearchBox from './SearchBox';
import QuestionSuggestions from './QuestionSuggestions';
import FoamTree from './FoamTree';
import Divider from '@material-ui/core/Divider';

import { useParams } from 'react-router-dom';
import { fetchData, findDocs } from '../../controllers/dataFetch';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  divider: {
    marginBottom: '1.5rem',
    boxShadow: '0px 1px 3px 1px rgba(0,0,0,0.025)'
  },
  searchResults: {
    backgroundColor: '#424242',
    flex: '1',
    padding: '1rem',
    height: '650px',
    overflow: 'scroll'
  },
  searchResultsHeader: {
    display: 'flex',
    alignItems: 'center'
  },
  searchResultsIndex: {
    minHeight: '1rem',
    minWidth: '1rem',
    border: '1px solid #fff',
    borderRadius: '0.25rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '0.5rem',
    color: '#fff'
  },
  searchResultsTitle: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: '0.75rem',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#fff'
  },
  searchResultsText: {
    color: 'rgba(255, 255, 255, 0.5)'
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
    const fetch = async () => {
      const data = await fetchData(search);
      const docs = findDocs({ groups: data });
      
      setData(data);
      setDocs(docs);
    };

    fetch();
  }, [search]);

  return (
    <div style={{ width: '100%', padding: '1rem' }}>
      <SearchBox value={inputValue} onChange={setInputValue} onSearch={setSearch} />
      <QuestionSuggestions filter={inputValue} onClick={(q) => { setInputValue(q); setSearch(q); }} />

      <Divider className={classes.divider} variant="fullWidth" />

      <div style={{ display: 'flex' }}>
        <FoamTree
          style={{ flex: '1' }}
          groups={data}
          setDocs={setDocs}
        />

        <div className={classes.searchResults}>
          {docs.map((d, i) => (
            <React.Fragment key={i}>
              <div className={classes.searchResultsHeader}>
                <div className={classes.searchResultsIndex}>
                  {i + 1}
                </div>
                
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
              
              <p className={classes.searchResultsText}>{d.abstract}</p>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoamTreeSearchPage;
