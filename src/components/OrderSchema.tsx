import React, { FC, useState } from 'react';
import { MetaData, NCIPRequest, NCIPResponse } from '../types/app.types';
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core';
import { ErrorMessage, Field, FieldProps, Form, Formik } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';
import LibraryLine from './LibraryLine';
import { postNCIPRequest } from '../api/api';
import { Alert, AlertTitle } from '@material-ui/lab';

const StyledGridContainer = styled(Grid)`
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #f2f2f2;
`;

const StyledFormLabelTypography = styled(Typography)`
  font-weight: 600;
`;

const StyledHelperMessage = styled(Typography)`
  margin-left: 1rem;
`;
const StyledTextFieldWrapper = styled.div`
  display: flex;
  align-items: baseline;
`;

interface SchemaValues {
  patronId: string;
  selectedLibrary: string;
}

const emptySchema: SchemaValues = { patronId: '', selectedLibrary: '' };

interface OrderSchemaProps {
  metaData: MetaData;
}

const OrderSchema: FC<OrderSchemaProps> = ({ metaData }) => {
  const [isPostingRequest, setIsPostingRequest] = useState(false);
  const [postRequestError, setPostRequestError] = useState<Error>();
  const [ncipResponse, setNcipResponse] = useState<NCIPResponse>();

  const handleSubmit = async (values: SchemaValues) => {
    const ncipRequest: NCIPRequest = {
      toAgencyId: '',
      fromAgencyId: '',
      isbnValue: '',
      userIdentifierValue: '',
      author: metaData.creators,
      title: '',
      publisher: '',
      publicationDate: '',
      placeOfPublication: '',
      bibliographicRecordIdentifier: '',
      bibliographicRecordIdentifierCode: '',
      type: '',
      requestType: '',
      comment: '',
      ncipServerUrl: '',
    };
    try {
      console.log();
      setIsPostingRequest(true);
      setPostRequestError(undefined);
      const response: NCIPResponse = (await postNCIPRequest(ncipRequest)).data;
      setNcipResponse(response);
    } catch (error) {
      error instanceof Error && setPostRequestError(error);
    } finally {
      setIsPostingRequest(false);
    }
  };

  const ValidationSchema = Yup.object().shape({
    patronId: Yup.string()
      .min(3, 'Recipient (Patron ID) should be at least 3 characters long')
      .required('Recipient is a required value'),
    selectedLibrary: Yup.string().required('A library is required to be selected'),
  });

  return (
    <Formik onSubmit={handleSubmit} initialValues={emptySchema} validationSchema={ValidationSchema}>
      {() => (
        <Form>
          <StyledGridContainer container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="caption" aria-hidden="true">
                Mandatory fields are marked with *
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Field name="selectedLibrary">
                {({ field, meta: { error } }: FieldProps) => (
                  <FormControl required component="fieldset" data-test>
                    <FormLabel component="legend">
                      <StyledFormLabelTypography display="inline" gutterBottom variant="body1">
                        Choose Library:
                      </StyledFormLabelTypography>
                    </FormLabel>
                    <FormHelperText error>{error}</FormHelperText>
                    <RadioGroup {...field} aria-label="Library" name="selectedLibrary" value={field.value}>
                      {metaData.libraries.map((library) => (
                        <LibraryLine key={library.library_code} library={library} />
                      ))}
                    </RadioGroup>
                  </FormControl>
                )}
              </Field>
            </Grid>
            <Grid item xs={12}>
              <Field name="patronId">
                {({ field, meta: { error, touched } }: FieldProps) => (
                  <StyledTextFieldWrapper>
                    <TextField
                      required
                      data-testid="patron-field"
                      variant="outlined"
                      label="Recipient"
                      {...field}
                      error={!!error && touched}
                      helperText={<ErrorMessage name={field.name} />}
                    />
                    <StyledHelperMessage variant="caption">
                      Patron ID for the patron you request on behalf of.
                    </StyledHelperMessage>
                  </StyledTextFieldWrapper>
                )}
              </Field>
            </Grid>
            <Grid item xs={12}>
              <Button disabled={isPostingRequest} variant="contained" type="submit" color="primary">
                Request
              </Button>
            </Grid>
            <Grid item xs={12}>
              {isPostingRequest ? (
                <CircularProgress />
              ) : ncipResponse ? (
                <Alert severity="success" data-testid="request-success">
                  <AlertTitle>{ncipResponse.message}</AlertTitle>
                </Alert>
              ) : (
                postRequestError && (
                  <Alert severity="error" data-testid="request-error">
                    <AlertTitle>{postRequestError.message}</AlertTitle>
                  </Alert>
                )
              )}
            </Grid>
          </StyledGridContainer>
        </Form>
      )}
    </Formik>
  );
};

export default OrderSchema;
