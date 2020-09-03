import React, { useState } from 'react';
import ReactHtmlParser from 'react-html-parser'; 

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Typography } from '@material-ui/core';

import FoamTree from '../foamTree';
import KeywordsDisplay from '../../KeywordsDisplay';
import AbstractDisplay from '../../AbstractDisplay';
import SeacrhScore from '../../helpers/SearchScore';
import { PopUpMessage } from '../../helpers/PopUpMessage';
import {preventRerender} from '../../helpers/preventRerender';
import JournalDateDisplay from '../../JournalDateDisplay';
import { PagesBar } from '../pagination/pagesBar.js';

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
    overflow: 'scroll',
    width: "100%",
    padding: "0px",
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

const Result = ({ d, setReport, setArticleReference }) => {
  const classes = useStyles();
  return (
    <Paper variant="outlined" square>
      <Grid container >
        <Grid container item xs alignContent="center" className="hidden p-0">
         {(d.score && d.placement) ? <SeacrhScore score={d.score} placement={d.placement} /> : null}
        </Grid>
        <Grid item xs={11}>
          <Box p={2} style={{paddingBottom: "10px", width: "100%"}} className="p-1">
            <JournalDateDisplay journal={d.journal} journalTitle={d.journal_title} date={d.date} />
            <Box style={{display: 'flex', alignItems: 'center'}} className="result-title">
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

            <Box mt={1} className="result-abstract">
              <AbstractDisplay abstract={d.abstract} highlight={d.highlight} />
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
  )
};

const Results = React.memo(({ count, data, docs, setDocs, setResultCount, switched, fetchPage, pageNumber,search }) => {
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
      <Box mt={0} display="flex" height="90%" paddingLeft="138px" className="qs-result-container">
        <PopUpMessage visibility={reportArticle} onClose={closeMessage} title="You are about to report article"
          footer="By clicking on information above,it will be saved in your clipboard and you will be redirected to google forms."
          href={GOOGLE_FORMS_URL} copy={true} article={articleReference} />
        <Box px={2} display="flex" flexDirection="column" zIndex="1" width="835px" className="qs-result-container" >
          <Box className={classes.searchResultsTop} width="100%">
            <Paper variant="outlined" square style={{borderTopLeftRadius: "5px", borderTopRightRadius: "5px"}}>
              <Box p={1}>
                <Typography component="p">
                  Articles from {currentCount * (pageNumber - 1)} to {currentCount * pageNumber} of {data.total ? data.total : "10000"}
              </Typography>
            </Box>
          </Paper>
          <PagesBar pageNumber={pageNumber} fetchPage={fetchPage} search={search}/>
          </Box>
        <Box className={classes.searchResults} >
            {docs.map((d, i) => (
              <Box key={i} mb={2}>
                <Result d={d} setReport={setReport} setArticleReference={setArticleReference} />
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
