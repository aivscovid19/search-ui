import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, Link } from '@material-ui/core';


const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfHbGe0lsPH5FMBGIb_nQabdrS2NEEu-tQ7rvQoZ9xdM0sybg/viewform?embedded=true";


const FormError = () => {
  const redirectForm = (e) => {
    e.preventDefault();
    const win = window.open(GOOGLE_FORM_URL, '_blank');
        if (win !== null) win.focus();
  }
  return (<Box>
    <Typography variant="h5" gutterBottom>
    Oops, something is wrong.
    </Typography>
    <Typography variant="subtitle1">
      We are sorry but this email is not valid.
    </Typography>
    <Link style={{cursor: "pointer", fontSize: "1.3rem", fontWeight: "450"}} onClick={redirectForm}>Click here to get access</Link>
  </Box>)
}

export default FormError;
