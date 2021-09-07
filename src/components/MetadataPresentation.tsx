import React, { FC } from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { MetaData } from '../types/app.types';

const StyledRow = styled.div`
  display: flex;
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
    <MetadataLine label={'Title'} value={metaData.title} />
    {metaData.creators && <MetadataLine label={'Creator'} value={metaData.creators.join(', ')} />}
    {metaData.isbn && <MetadataLine label={'Standard number'} value={metaData.isbn} />}
    {metaData.source && <MetadataLine label={'Source'} value={metaData.source} />}
    {metaData.volume && <MetadataLine label={'Volume'} value={metaData.volume} />}
    {metaData.year && <MetadataLine label={'Year'} value={metaData.year} />}
    {metaData.publicationPlace && <MetadataLine label={'Place of publication'} value={metaData.publicationPlace} />}
  </StyledMetadataHolder>
);

export default MetadataHolder;
