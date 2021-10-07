import React, { FC, useState } from 'react';
import {
  BibliographicRecordIdentifierCodes,
  Library,
  MediaTypes,
  MetaData,
  NCIPRequest,
  QueryParameters,
  RequestTypes,
} from '../types/app.types';
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
import { Colors } from '../themes/mainTheme';
import WarningBanner from './WarningBanner';
import { useHistory } from 'react-router';

const StyledGridContainer = styled(Grid)`
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: ${Colors.SchemaBackground};
`;

const StyledFormLabelTypography = styled(Typography)`
  font-weight: 600;
`;

const StyledHelperMessage = styled(Typography)`
  margin-left: 1rem;
`;

const StyledAlert = styled(Alert)`
  margin-bottom: 1rem;
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
  readonly: boolean;
  patronId: string;
}

const createSuccessMessage = (metaData: MetaData, selectedLibrary: Library, patronId: string) => {
  return `The request for '${metaData.display_title}' was sent successfully to ${selectedLibrary.display_name} for ${patronId} `;
};

const OrderSchema: FC<OrderSchemaProps> = ({ metaData, patronId, readonly = false }) => {
  const [isPostingRequest, setIsPostingRequest] = useState(false);
  const [postRequestError, setPostRequestError] = useState<Error>();
  const history = useHistory();

  const handleSubmit = async (values: SchemaValues) => {
    const selectedLibrary: Library = metaData.libraries.filter((lib) => lib.library_code === values.selectedLibrary)[0];
    const ncipRequest: NCIPRequest = {
      toAgencyId: patronId,
      fromAgencyId: selectedLibrary.library_code,
      isbnValue: metaData.isbn,
      userIdentifierValue: values.patronId,
      author: metaData.creator,
      title: metaData.display_title,
      publisher: metaData.publisher,
      publicationDate: metaData.creation_year,
      placeOfPublication: metaData.publication_place,
      bibliographicRecordIdentifier: selectedLibrary.mms_id,
      bibliographicRecordIdentifierCode: BibliographicRecordIdentifierCodes.OwnerLocalRecordID,
      type: MediaTypes.Book,
      requestType: RequestTypes.Physical,
      comment: '',
      ncipServerUrl: selectedLibrary.ncip_server_url,
    };
    try {
      setIsPostingRequest(true);
      setPostRequestError(undefined);
      await postNCIPRequest(ncipRequest);
      history.push(
        `/success?${QueryParameters.message}=${createSuccessMessage(metaData, selectedLibrary, values.patronId)}`
      );
    } catch (error) {
      error instanceof Error && setPostRequestError(error);
    } finally {
      setIsPostingRequest(false);
    }
  };

  const ValidationSchema = Yup.object().shape({
    patronId: Yup.string().required('Recipient is a required value'),
    selectedLibrary: Yup.string().required('A library is required to be selected'),
  });

  return (
    <Formik onSubmit={handleSubmit} initialValues={emptySchema} validationSchema={ValidationSchema}>
      {() => (
        <Form>
          <StyledGridContainer container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="caption" aria-hidden="true">
                Mandatory fields are marked with *
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Field name="selectedLibrary">
                {({ field, meta: { error } }: FieldProps) => (
                  <FormControl required component="fieldset" data-test>
                    <FormLabel component="legend" id="libraries-label">
                      <StyledFormLabelTypography display="inline" gutterBottom variant="body1">
                        Choose Library:
                      </StyledFormLabelTypography>
                    </FormLabel>
                    <FormHelperText error>{error}</FormHelperText>
                    <RadioGroup
                      {...field}
                      data-testid="library-list"
                      aria-labelledby="libraries-label"
                      name="selectedLibrary"
                      value={field.value}>
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
              {readonly ? (
                <WarningBanner message="Alma libraries cannot order ILL, but can only see how the order form is presented." />
              ) : (
                <>
                  {isPostingRequest ? (
                    <CircularProgress />
                  ) : (
                    postRequestError && (
                      <StyledAlert severity="error" data-testid="ncip-error-alert">
                        <AlertTitle>An error has occurred</AlertTitle>
                        <Typography variant="caption">( Error message: {postRequestError.message})</Typography>
                      </StyledAlert>
                    )
                  )}
                  <Button
                    data-testid="ncip-request-button"
                    disabled={isPostingRequest}
                    variant="contained"
                    type="submit"
                    color="primary">
                    Request
                  </Button>
                </>
              )}
            </Grid>
          </StyledGridContainer>
        </Form>
      )}
    </Formik>
  );
};

export default OrderSchema;
