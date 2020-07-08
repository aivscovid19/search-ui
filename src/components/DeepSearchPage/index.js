import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';

import InformationForm from './InformationForm';
import InformationReview from './InformationReview';
import FormCompleted from './FormCompleted';
import { CustomStepIcon, CustomStepConnector } from './CustomFormStepper';

import { fetchDeepSearch } from '../../controllers/dataFetch';

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
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
  const [formFields, setFormFields] = useState([{
    $$title: 'Information',
    email: { $$title: 'Email', value: '' },
    firstName: { $$title: 'First Name', value: '' },
    lastName: { $$title: 'Last Name', value: '' },
    size: { $$title: 'Size', value: '' },
    query: { $$title: 'Query', value: '' }
  }]);

  const handleNext = () => setActiveStep(activeStep + 1);
  const handleBack = () => setActiveStep(activeStep - 1);
  const reset = () => setActiveStep(0);

  const handleSubmit = async () => {
    setLoading(true);

    const { email, firstName, lastName, size, query } = Object.keys(formFields[0]).reduce((fields, field) => ({
      ...fields, [field]: formFields[0][field].value 
    }), {});

    try {
      const name = `${firstName} ${lastName}`;

      const data = await fetchDeepSearch({
        query, email,
        name: name.trim(),
        type: size
      });
      
      console.log(data);
    } catch (err) {
      // HANDLE ERRORS correctly
      console.log(err.response);
      console.dir(err);
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
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Deep Search Query
        </Typography>

        <Stepper alternativeLabel activeStep={activeStep} className={classes.stepper} connector={<CustomStepConnector />}>
          {[ ...formFields.map(({ $$title }) => $$title), 'Review' ].map(title => (
            <Step key={title}>
              <StepLabel StepIconComponent={CustomStepIcon}>{title}</StepLabel>
            </Step>
          ))}
        </Stepper>
          <>
            {activeStep === 0 && <InformationForm initialValues={formFields[0]} setField={setField(0)} />}
            {activeStep === 1 && <InformationReview fields={formFields[0]} />}
            {activeStep > formFields.length && <FormCompleted />}

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
    </main>
  );
}

export default DeepSearchForm;
