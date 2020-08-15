import React from 'react';
import Typography from '@material-ui/core/Typography';

const FormError = () => (
  <>
    <Typography variant="h5" gutterBottom>
      Ops, something wrong
    </Typography>
    <Typography variant="subtitle1">
      We are sorry but this email is not valid.
    </Typography>
  </>
);

export default FormError;
