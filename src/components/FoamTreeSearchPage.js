import React, { useState } from 'react';

import SearchBox from './SearchBox';
import FoamTree from './FoamTree';
import Divider from '@material-ui/core/Divider';

import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  divider: {
    marginTop: '1.5rem',
    marginBottom: '1.5rem',
    boxShadow: '0px 1px 3px 1px rgba(0,0,0,0.025)'
  },
}));

const FoamTreeSearchPage = () => {
  const params = useParams();
  const classes = useStyles();
  const [search, setSearch] = useState(params.search);
  const [docs, setDocs] = useState([]);

  console.log(search);
  console.log(docs);

  return (
    <div style={{ width: '100%', padding: '1rem' }}>
      <SearchBox initialValue={search} onSearch={setSearch} />

      <Divider className={classes.divider} variant="fullWidth" />

      <div style={{ display: 'flex' }}>
        <FoamTree
          style={{ flex: '1' }}
          searchTerm={search}
          setDocs={setDocs}
        />

        <div style={{
          backgroundColor: '#424242',
          flex: '1',
          padding: '1rem',
          height: '650px',
          overflow: 'scroll'
        }}>
          {docs.map((d, i) => (
            <React.Fragment key={i}>
              <div style={{
                display: 'flex',
                alignItems: 'center'
              }}>
                <div style={{
                  minHeight: '1rem',
                  minWidth: '1rem',
                  border: '1px solid #fff',
                  borderRadius: '0.25rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '0.5rem',
                  color: '#fff'
                }}>
                  {i + 1}
                </div>
                
                <a
                  href={`https://pubmed.ncbi.nlm.nih.gov/${d.pmid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h4 style={{
                    marginTop: 0,
                    marginBottom: 0,
                    marginLeft: '0.75rem',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#fff'
                  }}>
                    {d.title}
                  </h4>
                </a>
              </div>
              
              <p style={{
                color: 'rgba(255, 255, 255, 0.5)'
              }}>{d.abstract}</p>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoamTreeSearchPage;
