import React, { ChangeEvent, FC, useState } from 'react';
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
import styled from 'styled-components';

const StyledGridContainer = styled(Grid)`
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #f2f2f2;
`;

const StyledFormLabelTypography = styled(Typography)`
  font-weight: 600;
`;

interface OrderSchemaProps {
  metaData: MetaData;
}

const OrderSchema: FC<OrderSchemaProps> = ({ metaData }) => {
  const [value, setValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <form noValidate autoComplete="off">
      <StyledGridContainer container spacing={2}>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              <StyledFormLabelTypography gutterBottom variant="body1">
                Choose Library:
              </StyledFormLabelTypography>
            </FormLabel>
            <RadioGroup aria-label="utlånsted" name="utlånsted" value={value} onChange={handleChange}>
              {metaData.libraries.map((library) => (
                <FormControlLabel
                  key={library.library_code}
                  disabled={!library.available_for_loan}
                  value={library.library_code}
                  control={<Radio />}
                  label={`${library.library_name}${
                    !library.available_for_loan ? ' (Closed for inter-library loan)' : ''
                  }`}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            label="Recipient"
            helperText="Patron-ID for the patron you request on behalf of."
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary">
            Request
          </Button>
        </Grid>
      </StyledGridContainer>
    </form>
  );
};

export default OrderSchema;
