import React, { FC } from 'react';
import { MetaData } from '../types/app.types';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core';
import { Form, Formik, Field, FieldProps, ErrorMessage } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';
import ErrorBanner from './ErrorBanner';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Colors } from '../themes/mainTheme';

const StyledGridContainer = styled(Grid)`
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #f2f2f2;
`;

const StyledFormLabelTypography = styled(Typography)`
  font-weight: 600;
`;

const StyledErrorMessage = styled(Typography)`
  color: ${Colors.Warning};
  margin-left: 1rem;
`;

interface OrderSchemaProps {
  metaData: MetaData;
}

const OrderSchema: FC<OrderSchemaProps> = ({ metaData }) => {
  // const [selectedLibrary, setSelectedLibrary] = useState('');
  // const [patron, setPatron] = useState('');

  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setSelectedLibrary((event.target as HTMLInputElement).value);
  // };

  const handleSubmit = () => {
    //todo: call NCIP-service
  };

  const ValidationSchema = Yup.object().shape({
    patronId: Yup.string().min(2, 'The value is too short').required('Recipient is a required value'),
    library: Yup.string().required('A library is required to be selected'),
  });

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{ patronId: '', selectedLibrary: '' }}
      validationSchema={ValidationSchema}>
      {({ isValid, dirty, errors, values }) => (
        <Form>
          <StyledGridContainer container spacing={2}>
            <Grid item xs={12}>
              <Typography>Mandatory fields are marked with *</Typography>
            </Grid>
            <Grid item xs={12}>
              {/*<FormControl required component="fieldset">*/}
              {/*  <FormLabel component="legend">*/}
              {/*    <StyledFormLabelTypography display="inline" gutterBottom variant="body1">*/}
              {/*      Choose Library:*/}
              {/*    </StyledFormLabelTypography>*/}
              {/*  </FormLabel>*/}
              {/*  <RadioGroup aria-label="utlånsted" name="utlånsted" value={patron} onChange={handleChange}>*/}
              {/*    {metaData.libraries.map((library) => (*/}
              {/*      <FormControlLabel*/}
              {/*        key={library.library_code}*/}
              {/*        disabled={!library.available_for_loan}*/}
              {/*        value={library.library_code}*/}
              {/*        control={<Radio />}*/}
              {/*        label={`${library.library_name}${*/}
              {/*          !library.available_for_loan ? ' (Closed for inter-library loan)' : ''*/}
              {/*        }`}*/}
              {/*      />*/}
              {/*    ))}*/}
              {/*  </RadioGroup>*/}
              {/*</FormControl>*/}
            </Grid>
            <Grid item xs={12}>
              <Field name="patronId">
                {({ field, meta: { error, touched } }: FieldProps) => (
                  <div style={{ display: 'flex', alignItems: 'baseline' }}>
                    <TextField
                      required
                      data-testid="patron-field"
                      variant="outlined"
                      label="Recipient"
                      {...field}
                      error={!!error && touched}
                      helperText="Patron ID for the patron you request on behalf of."
                    />
                    <StyledErrorMessage>
                      <ErrorMessage name={field.name} />
                    </StyledErrorMessage>
                  </div>
                )}
              </Field>
            </Grid>
            <Grid item xs={12}>
              <Button disabled={!isValid || !dirty} variant="contained" type="submit" color="primary">
                Request
              </Button>
            </Grid>
          </StyledGridContainer>
        </Form>
      )}
    </Formik>
  );
};

export default OrderSchema;
