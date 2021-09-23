import React, { FC } from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { MetaData } from '../types/app.types';

const StyledRow = styled.div`
  display: flex;
  margin-bottom: 0.2rem;
  @media (max-width: 25rem) {
    flex-direction: column;
  }
`;
const StyledMetadataHolder = styled.div`
  margin-top: 1.5rem;
`;

const StyledLabel = styled(Typography)`
  min-width: 12rem;
  max-width: 25%;
  box-sizing: border-box;
  font-weight: 600;
`;

const StyledValue = styled(Typography)`
  flex: 1;
`;

interface MetadataLineProps {
  label: string;
  value: string;
}

const MetadataLine: FC<MetadataLineProps> = ({ label, value }) => (
  <StyledRow>
    <StyledLabel variant="body1">{label}</StyledLabel>
    <StyledValue variant="body1">{value}</StyledValue>
  </StyledRow>
);

interface MetadataHolderProps {
  metaData: MetaData;
}

const MetadataHolder: FC<MetadataHolderProps> = ({ metaData }) => (
  <StyledMetadataHolder data-testid="metaData">
    <MetadataLine label={'Title'} value={metaData.display_title} />
    <MetadataLine label={'Creator'} value={metaData.creator} />
    <MetadataLine label={'Standard number'} value={metaData.isbn} />
    {metaData.source && <MetadataLine label={'Source'} value={metaData.source} />}
    {metaData.volume && <MetadataLine label={'Volume'} value={metaData.volume} />}
    {metaData.pages && <MetadataLine label={'Pages'} value={metaData.pages} />}
    {metaData.creation_year && <MetadataLine label={'Year'} value={metaData.creation_year} />}
    {metaData.publisher && <MetadataLine label={'Publisher'} value={metaData.publisher} />}
    {metaData.publication_place && <MetadataLine label={'Place of publication'} value={metaData.publication_place} />}
  </StyledMetadataHolder>
);

export default MetadataHolder;
