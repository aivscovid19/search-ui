import React, { useState, useEffect } from 'react';

import SearchBox from './SearchBox';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import QuestionSuggestions from './QuestionSuggestions';
import FoamTree from './FoamTree';
import Slider from '@material-ui/core/Slider';

import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { Grid, CardActionArea, CardContent, CardActions, Card, Avatar, ListItemAvatar, Divider, List, ListItem, ListItemText, Button } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@material-ui/icons/CheckBox';
import SearchIcon from '@material-ui/icons/Search';

import { useParams } from 'react-router-dom';
import { fetchData, findDocs } from '../../controllers/dataFetch';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
  },
  root: {
    width: '100%',
    //maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const Results = ({ name, data, docs, setDocs }) => {

  const classes = useStyles();

  if (docs.length === 0) {
    return (
      <Paper
        display="flex"
        height="85%"
        justifyContent="center"
        alignItems="center"
      >
        <Typography component="h4" variant="h3">
          NO RESULTS FOR QUERY
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.searchResults}>
      <List className={classes.root}>
        {docs.map((doc, i) => (
          <div key={i}>
            <Abstract key={`${name}-${i}`}  {...doc} idx={i} classes={classes} ></Abstract>
            <Divider key={`${name}-div-${i}`} variant="inset" component="li" ></Divider>
          </div>
          // <ListItem dense>
          //   <Box p={2}>
          //     <Box className={classes.searchResultsHeader}>
          //       <a
          //         href={`https://pubmed.ncbi.nlm.nih.gov/${d.pmid}`}
          //         target="_blank"
          //         rel="noopener noreferrer"
          //         className={classes.searchResultsLink}
          //       >
          //         <Typography component="h4" variant="h5" color="textPrimary">
          //           {d.title}
          //         </Typography>
          //       </a>
          //     </Box>

          //     <Box mt={1}>
          //       <Typography component="p" variant="subtitle1" color="primary">
          //         {d.journal}
          //       </Typography>

          //       <Typography component="p" variant="subtitle1" color="textPrimary">
          //       </Typography>
          //     </Box>
          //   </Box>
          // </ListItem>
        ))}
      </List>
    </Paper>
  );
};

const MAX_ABSTRACT = 512;

function truncate(text) {
  var text = text === undefined ? "?" : text
  return (text.length >= MAX_ABSTRACT) ? text.slice(0, MAX_ABSTRACT).trim() + `...` : text
}

function getlink(doc) {
  const href = ((doc.link ? doc.link : '').split(';')[0])
  return href
}

function LinkTitle(doc) {
  const classes = useStyles();
  //href={`https://pubmed.ncbi.nlm.nih.gov/${doc.pmid}`}
  let href = getlink(doc)
  return (<a
    target="_blank"
    href={href ? href : undefined}
    rel="noopener noreferrer"
    className={classes.searchResultsLink}
  >{doc.title}</a>)
}

function ChangeIndicator(props) {
  if (props.newpos < props.prevpos) {
    return (<><KeyboardArrowUpIcon
      style={{ color: green[500] }} />
      <Typography type="subheading"
        style={{ color: green[500] }}
      >
        +{props.prevpos - props.newpos}
      </Typography></>)
  }
  if (props.newpos === props.prevpos) {
    return (<Typography type="subheading">
    {props.children}
      +0
    </Typography>)
  } else {
    return (<>
    <KeyboardArrowDownIcon
      style={{ color: red[500] }} />
      <Typography type="subheading">
        {props.children}
        -{props.newpos - props.prevpos}
      </Typography></>)
  }
}

function hexToRGB(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    red: parseInt(result[1], 16),
    green: parseInt(result[2], 16),
    blue: parseInt(result[3], 16)
  } : null;
}

const THRESHOLD = 0.02
function formatScore(score) {
  var relevant = true
  if (score < THRESHOLD) {
    relevant = false
  }
  const color = colorGradient(score, hexToRGB(red[500]), hexToRGB(green[500]))
  const fmtscore = String(score).slice(0, 5)
  return (<Typography variant="caption" style={{ color : color }} >{fmtscore}</Typography>)
}

function colorGradient(fadeFraction, rgbColor1, rgbColor2, rgbColor3) {
  var color1 = rgbColor1;
  var color2 = rgbColor2;
  var fade = fadeFraction;

  // Do we have 3 colors for the gradient? Need to adjust the params.
  if (rgbColor3) {
    fade = fade * 2;

    // Find which interval to use and adjust the fade percentage
    if (fade >= 1) {
      fade -= 1;
      color1 = rgbColor2;
      color2 = rgbColor3;
    }
  }

  var diffRed = color2.red - color1.red;
  var diffGreen = color2.green - color1.green;
  var diffBlue = color2.blue - color1.blue;

  var gradient = {
    red: parseInt(Math.floor(color1.red + (diffRed * fade)), 10),
    green: parseInt(Math.floor(color1.green + (diffGreen * fade)), 10),
    blue: parseInt(Math.floor(color1.blue + (diffBlue * fade)), 10),
  };

  return 'rgb(' + gradient.red + ',' + gradient.green + ',' + gradient.blue + ')';
}

function formatIdx(idx) {
  let fmtidx = ('0000' + String(idx + 1))
  return fmtidx.slice( fmtidx.length - 4, fmtidx.length)
}

function Abstract(props, classes) {
  const doc = props.doc;
 return <Box >
  <ListItem alignItems="flex-start" width="100%" >
    <ListItemAvatar>
        <ChangeIndicator {...props}/>
        {formatScore(props.score)}
        <Typography 
            variant="caption"
            style= {{color:'grey'}}
            display="block" >{formatIdx(props.idx)}</Typography>
    </ListItemAvatar>
    <ListItemText
      primary={LinkTitle(doc)}
      secondary={
        <React.Fragment>
          <Typography
            component="span"
            className={classes.inline}
            color="textPrimary"
          >
            {doc.authors}
          </Typography>
          <br />
          {truncate(doc.abstract)}
        </React.Fragment>}
    />
  </ListItem>
  </Box>
}

const FoamTreeSearchPage = () => {
  const params = useParams();

  const [data, setData] = useState({});
  const [reranked, setReRanked] = useState([]);

  const [search, setSearch] = useState(params.search);
  const [loading, setLoading] = useState(true);
  const [searchSize, setSearchSize] = useState(20);

  function createIndex(name, disabled = false, selected = false, description = `selects the ${name} index`) {
    return {
      display_name: name,
      selected: selected,
      description: description,
      index: name,
      disabled: disabled
    }
  }

  const [indexes, setIndexes] = useState({
    bioasq: createIndex('bioasq', false, false),
    ncbi: createIndex('ncbi', true, false),
    springer: createIndex('springer'),
    jama: createIndex('jama'),
    cord19: createIndex('cord19', false, true),
    bioarxiv: createIndex('bioarxiv', true, false),
    nature: createIndex('nature'),
    medrxiv: createIndex('medrxiv'),
    arxiv: createIndex('arxiv'),
    bmj: createIndex('bmj'),
  });

  const handleChange = (event) => {
    setIndexes({ ...indexes, [event.target.name]: { ...indexes[event.target.name], selected: event.target.checked } });
  }

  const fetch = async () => {
    setLoading(true);
    const idx = Object.entries(indexes).filter(([name, obj]) => obj.selected).map(([name, obj]) => obj.index)

    const data = await fetchData(search, idx, searchSize);
    const reranked = data['reranked'];

    setData(data);
    setReRanked(reranked);
    setLoading(false);
  };

  useEffect(() => { fetch() }, [search]);

  const marks = [
    {
      value: 10,
      label: 'Top 10',
    },
    {
      value: 20,
      label: 'Top 20',
    },
    {
      value: 50,
      label: 'Top 50',
    },
    {
      value: 100,
      label: 'Top 100',
    },
    {
      value: 500,
      label: 'Top 500',
    },
    {
      value: 1000,
      label: 'Top 1000',
    },
  ];

  function valuetext(value) {
    return `${value}`;
  }

  function valueLabelFormat(value) {
    return marks.findIndex((mark) => mark.value === value) + 1;
  }

  function selectAll(event) {
    const updated = Object.entries(indexes).reduce((o, [name, doc]) => {
      Object.assign(o, doc.disabled ? { [name]: doc } : { [name]: { ...doc, selected: event.target.checked } })
      return o
    }, {})
    setIndexes(updated);
  }

  return (
    <>
      <Paper variant="outlined" elevation={3}>
        <CssBaseline />
        <Card variant="outlined">
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                BREATHE
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            {/* <Button size="small" color="primary">
            Share
        </Button>
          <Button size="small" color="primary">
            Learn More
        </Button> */}
            <FormGroup row>
              <SearchBox initialValue={params.search} onSearch={setSearch} />
              <FormControlLabel
                control={<Checkbox onChange={selectAll} />}
                label="Select All"
              />

              {Object.entries(indexes).map(([name, doc], ix) => {
                //console.log(name, doc, ix);
                return (<FormControlLabel
                  key={ix}
                  control={<Checkbox checked={doc.selected} onChange={handleChange} name={name} disabled={doc.disabled} />}
                  label={doc.display_name}
                />)
              })}
              {/* <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedB}
                    onChange={handleChange}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Primary"
              />
              <FormControlLabel control={<Checkbox name="checkedC" />} label="Uncontrolled" />
              <FormControlLabel disabled control={<Checkbox name="NCBI" />} label="Disabled" />
              <FormControlLabel disabled control={<Checkbox name="BIOASQ" />} label="Disabled" />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedF}
                    onChange={handleChange}
                    name="checkedF"
                    indeterminate
                  />
                }
                label="Indeterminate"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    name="checkedI"
                  />
                }
                label="Custom size"
              /> */}
              <Divider />
              <Typography id="discrete-slider-custom" gutterBottom>
                {`Number of results to re-rank: ${searchSize}`}
              </Typography>
              <Slider
                //valueLabelFormat={valueLabelFormat}
                //getAriaValueText={valuetext}
                onChange={(e, value) => { console.log(value, e); setSearchSize(value) }}
                onDragStop={(e, value) => { console.log(value, e); setSearchSize(value) }}
                value={searchSize}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={10}
                min={10}
                max={100}
              />
              <Button
                onClick={fetch}
                variant="outlined"
                color="primary"
                //className={classes.button}
                startIcon={<SearchIcon />} >
                Search
              </Button>
            </FormGroup>

          </CardActions>
          {loading ? <LinearProgress color="secondary" /> : null}
        </Card>

        {/* <QuestionSuggestions filter={inputValue} onClick={(q) => { setInputValue(q); setSearch(q); }} /> */}
        {!loading ? <Results name="reranked" data={data} docs={reranked} setDocs={setReRanked} /> : null}
        <Grid container>
          {/* <Grid item xs={6}>
            {!loading ? <Results name="original" data={data} docs={original} setDocs={setOriginal} /> : null}
          </Grid> */}
          <Grid item xs={8}>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default FoamTreeSearchPage;
