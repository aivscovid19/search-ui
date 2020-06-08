import React, { useState, useEffect } from 'react';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import QUESTIONS from '../../questionSuggestions.json';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  questionContainer: {
    display: 'flex',
    width: '100%',
    overflow: 'scroll',
  },
  questionContent: {
    padding: '0.5rem !important',
  },
  question: {
    display: 'flex',
    minWidth: '35%',
    margin: '1rem',
    marginBottom: '0',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    '&:first-of-type': {
      marginLeft: '0'
    },
    '&:hover': {
      borderColor: 'rgb(66, 66, 66)'
    }
  },
});

const QuestionSuggestions = ({ filter, onClick }) => {
  const classes = useStyles();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const regex = new RegExp(filter, 'gi');
    
    setQuestions(
      QUESTIONS.filter(q => q.match(regex) && q !== filter)
    );
  }, [filter]);

  return (
    <Box className={classes.questionContainer} component="aside">
      {questions.map((q, i) => {
        return (
          <Card
            key={i}
            className={classes.question}
            variant="outlined"
            onClick={() => onClick(q)}
          >
            <CardContent className={classes.questionContent}>
              <Typography color="textSecondary">{q}</Typography>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default QuestionSuggestions;
