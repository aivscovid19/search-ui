import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const InformationReview = ({ fields }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Your Information
      </Typography>

      <List disablePadding>
        {Object.keys(fields).filter(field => field !== '$$title').map(field => (
          <ListItem style={{ paddingLeft: 0 }} key={field}>
            <ListItemText primary={fields[field]['$$title']} />
            <Typography variant="body2">{fields[field].value || 'N/A'}</Typography>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default InformationReview;
