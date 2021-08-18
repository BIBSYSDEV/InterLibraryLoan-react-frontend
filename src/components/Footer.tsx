import React, { FC } from 'react';
import styled from 'styled-components';

const StyledBar = styled.div`
  height: 2rem;
  width: 95%;
  align-items: center;
  color: rgba(80, 80, 80, 1);
  text-align: left;
  font-family: Barlow, sans-serif;
  font-size: 11px;
  font-style: italic;
  padding-left: 1rem;
`;

const StyledSourceText = styled.div`
  font-size: 11px;
`;

export function getSourceType(src: string) {
  switch (src) {
    case 'NIELSEN':
      return 'Nielsen BookData';
    case 'BOKBASEN':
      return 'Bokbasen';
    default:
      //ALMA, ADABAS, BIBSYS
      return 'Unit';
  }
}

interface FooterProps {
  source?: string;
}

const Footer: FC<FooterProps> = ({ source }) => {
  return (
    <StyledBar>
      <StyledSourceText>Kilde: {getSourceType(source ?? '')}</StyledSourceText>
      Det er <strong>IKKE</strong> tillatt å kopiere/laste ned innholdsinformasjon (bilde, beskrivelse,
      innholdsfortegnelse, lydfiler m.m.) og bruke det i andre sammenhenger/tjenester.
    </StyledBar>
  );
};

export default Footer;
