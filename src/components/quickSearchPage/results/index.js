import React, { useState } from 'react';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Typography } from '@material-ui/core';

import FoamTree from '../foamTree';
import KeywordsDisplay from '../../KeywordsDisplay';
import SeacrhScore from '../../helpers/SearchScore';
import { PopUpMessage } from '../../helpers/PopUpMessage';
import {preventRerender} from '../../helpers/preventRerender';
import JournalDateDisplay from '../../JournalDateDisplay';

const useStyles = makeStyles(() => ({
  divider: {
    marginBottom: '1.5rem',
    boxShadow: '0px 1px 3px 1px rgba(0,0,0,0.025)'
  },
  searchResultsTop: {
    margin: '0 auto 0.5em auto',
    borderRadius: "10px"
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
      <Box mt={0} display="flex" height="90%" paddingLeft="138px">
        <PopUpMessage visibility={reportArticle} onClose={closeMessage} title="You are about to report article"
          footer="By clicking on information above,it will be saved in your clipboard and you will be redirected to google forms."
          href={GOOGLE_FORMS_URL} copy={true} article={articleReference} />
        <Box px={2} display="flex" flexDirection="column" zIndex="1" width="835px">
          <Box className={classes.searchResultsTop} width="100%">
            <Paper variant="outlined" square style={{borderTopLeftRadius: "5px", borderTopRightRadius: "5px"}}>
              <Box p={1}>
                <Typography component="p">
                  Top {currentCount} papers
              </Typography>
              </Box>
            </Paper>
          </Box>
          <Box className={classes.searchResults} style={{ margin: "auto" }}>
            {docs.map((d, i) => (
              <Box key={i} mb={2} >
                <Paper variant="outlined" square>
                  <Grid container >
                    <Grid container item xs alignContent="center">
                      <SeacrhScore score={d.score} placement={d.placement} />
                    </Grid>
                    <Grid item xs={11}>
                      <Box p={2} style={{paddingBottom: "10px"}}>
                        <JournalDateDisplay journal={d.journal} date={d.date}></JournalDateDisplay>
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
        {switched ? <FoamTree
          style={{ width: "48%"}}
          groups={data}
          setDocs={setDocs}
          setResultCount={setResultCount}
          resultCount={count}
        /> : null}
      </Box>
    );
}, preventRerender("docs", "data"));

export default Results;
