import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';

const InformationForm = ({
  initialValues,
  setField
}) => {
  return (
    <Container style={{margin: "0px !important"}}>
      <Typography variant="h6" gutterBottom>
        Your Information
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label={initialValues['email']['$$title']}
            value={initialValues['email'].value}
            onChange={({ target: { value } }) => setField('email', value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            label={initialValues['firstName']['$$title']}
            value={initialValues['firstName'].value}
            onChange={({ target: { value } }) => setField('firstName', value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            label={initialValues['lastName']['$$title']}
            value={initialValues['lastName'].value}
            onChange={({ target: { value } }) => setField('lastName', value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth required>
            <InputLabel>Data Size</InputLabel>
            <Select
              value={initialValues['size'].value}
              onChange={({ target: { value } }) => setField('size', value)}
            >
              <MenuItem value="small">Small</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="large">Large</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            label={initialValues['query']['$$title']}
            value={initialValues['query'].value}
            onChange={({ target: { value } }) => setField('query', value)}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default InformationForm;
