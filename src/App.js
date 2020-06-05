import React, { useState } from 'react';

import SearchBox from './components/SearchBox';
import FoamTree from './components/FoamTree';

import Divider from '@material-ui/core/Divider';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles';
import { blue, indigo } from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: blue[900]
    },
    primary: {
      main: indigo[700]
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '"Lato"',
      'sans-serif'
    ].join(',')
  }
});

const useStyles = makeStyles(theme => ({
  divider: {
    marginTop: '1.5rem',
    marginBottom: '1.5rem',
    boxShadow: '0px 1px 3px 1px rgba(0,0,0,0.025)'
  },
}));

const App = () => {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [docs, setDocs] = useState([]);

  console.log(docs);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ width: '100%', padding: '1rem' }}>
        <SearchBox onSearch={setSearch} />

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
    </ThemeProvider>
  );
};

export default App;
