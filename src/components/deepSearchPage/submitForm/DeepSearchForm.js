import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { useParams } from 'react-router-dom';
import Stepper from '@material-ui/core/Stepper';

import InformationForm from './InformationForm';
import InformationReview from './InformationReview';
import FormCompleted from './FormCompleted';
import FormError from './FormError';
import { CustomStepIcon, CustomStepConnector } from './CustomFormStepper';

import { fetchDeepSearch } from '../../../controllers/dataFetch';

const useStyles = makeStyles((theme) => ({
  layout: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: "100%",
    display: "flex",
    justifyContent: "flex-start"
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: 0,
      marginBottom: 0,
      padding: theme.spacing(3),
    },
    padding: "0px",
    margin: "0px",
    borderRadius: "5px",
    border: "1px solid lightgrey"
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  }
}));

const DeepSearchForm = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [serverError, setError] = useState(false);
  const params = useParams();
  const [formFields, setFormFields] = useState([{
    $$title: 'Information',
    firstName: { $$title: 'First Name', value: '' },
    lastName: { $$title: 'Last Name', value: '' },
    email: { $$title: 'Email', value: '' },
    dSize: { $$title: 'Data Size', value: '' },
    mSize: { $$title: 'Model Size', value: '' }
  }]);

  const handleNext = () => setActiveStep(activeStep + 1);
  const handleBack = () => setActiveStep(activeStep - 1);
  const reset = () => { setActiveStep(0); setError(false)}

  const handleSubmit = async () => {
    setLoading(true);

    const { email, firstName, lastName, dSize, mSize } = Object.keys(formFields[0]).reduce((fields, field) => ({
      ...fields, [field]: formFields[0][field].value 
    }), {});

    try {
      const name = `${firstName} ${lastName}`;

      const data = await fetchDeepSearch({
        mSize, email,
        name: name.trim(),
        type: dSize,
        query: params.search
      });
    } catch (err) {
      // HANDLE ERRORS correctly
      setError(true);
    }
    setLoading(false);
    handleNext();
  };

  const setField = (step) => (field, value) => {
    const newFormFields = [...formFields];
    newFormFields[step][field].value = value;
    setFormFields(newFormFields);
  };

  return (
    <div className={classes.layout} style={{margin: "0px"}}>
      <Paper className={`${classes.paper} p-1`}>
        <Typography component="h1" variant="h4" align="center">
          Deep Literature Search Query
        </Typography>

        <Stepper alternativeLabel activeStep={activeStep} className={classes.stepper} connector={<CustomStepConnector />}>
          {[ ...formFields.map(({ $$title }) => $$title), 'Review' ].map(title => (
            <Step key={title}>
              <StepLabel error={serverError} StepIconComponent={CustomStepIcon}>{title}</StepLabel>
            </Step>
          ))}
        </Stepper>
          <>
            {activeStep === 0 && <InformationForm initialValues={formFields[0]} setField={setField(0)} />}
            {activeStep === 1 && <InformationReview fields={formFields[0]} />}
            {activeStep > formFields.length && (serverError ? <FormError/>  : <FormCompleted />)}

            <div className={classes.buttons}>
              {activeStep <= formFields.length && activeStep !== 0 && (
                <Button
                  disabled={loading}
                  className={classes.button}
                  onClick={handleBack}
                >
                  Back
                </Button>
              )}

              {activeStep <= formFields.length && (
                <Button
                  disabled={loading}
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => {
                    if (activeStep === formFields.length)
                      return handleSubmit()
                    handleNext()
                  }}
                >
                  {activeStep === formFields.length ? 'Submit' : 'Next'}
                </Button>
              )}

              {(activeStep > formFields.length) && (
                <Button
                  disabled={loading}
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={reset}
                >
                  Reset
                </Button>
              )}
            </div>
          </>
      </Paper>
    </div>
  );
}

export default DeepSearchForm;
