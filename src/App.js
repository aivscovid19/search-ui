import React, { useState } from 'react';

import {
  ErrorBoundary,
  Facet,
  Paging,
  PagingInfo,
  Result,
  Results,
  ResultsPerPage,
  SearchProvider,
  WithSearch
} from '@elastic/react-search-ui';

import SearchBox from './components/SearchBox';
import FoamTree from './components/FoamTree';

import buildRequest from './buildRequest';
import runRequest from './runRequest';
import applyDisjunctiveFaceting from './applyDisjunctiveFaceting';
import buildState from './buildState';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles'
import { blue, indigo } from '@material-ui/core/colors'
import '@elastic/react-search-ui-views/lib/styles/styles.css';

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

const config = {
  debug: false,
  hasA11yNotifications: true,
  onResultClick: () => {
    /* Not implemented */
  },
  onAutocompleteResultClick: () => {
    /* Not implemented */
  },
  onAutocomplete: async ({ searchTerm }) => {
    const requestBody = buildRequest({ searchTerm });
    const json = await runRequest(requestBody);
    const state = buildState(json);
    return {
      autocompletedResults: state.results
    };
  },
  onSearch: async state => {
    const { resultsPerPage } = state;
    const requestBody = buildRequest(state);
    // Note that this could be optimized by running all of these requests
    // at the same time. Kept simple here for clarity.
    const responseJson = await runRequest(requestBody);
    const responseJsonWithDisjunctiveFacetCounts = await applyDisjunctiveFaceting(
      responseJson,
      state,
      []
    );
    return buildState(responseJsonWithDisjunctiveFacetCounts, resultsPerPage);
  }
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SearchProvider config={config}>
        <WithSearch mapContextToProps={(ctx) => {console.log(); return ctx}}>
          {({ wasSearched, searchTerm, resultSearchTerm }) => {
            return (
              <ErrorBoundary>
                <div style={{ width: '100%', padding: '1rem' }}>
                  <SearchBox />

                  <div style={{ display: 'flex' }}>
                    <FoamTree searchTerm={resultSearchTerm} style={{ flex: '1' }} />

                    <div style={{ display: 'flex', flex: '1', flexDirection: 'column' }}>
                      <Paging />
                      <Results
                        resultView={
                          ({ result }) => {
                            const linkField = result.link && result.link.raw ? 'link' : 'pdf_link';
                            return <Result
                              titleField="title"
                              urlField={linkField}
                              result={result}
                            />
                          }
                        }
                      />
                    </div>
                  </div>
                </div>
              </ErrorBoundary>
            )
          }}
        </WithSearch>
      </SearchProvider>
    </ThemeProvider>
  );
};

export default App;
