import React, { FC } from 'react';
import styled from 'styled-components';
import UnitLogo from '../resources/logoUnit.png';

const Bar = styled.div`
  height: 5rem;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  box-shadow: 0px 5px 5px grey;
`;

const Title = styled.h1`
  color: rgb(40, 75, 99);
  font-family: Crimson Text, serif;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 5rem;
  margin-left: 1rem;
`;

const Divider = styled.span`
  line-height: 5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-right: 1rem;
  border-right: 1px solid rgba(0, 0, 0, 0.3);
`;

const LogoImgWrapper = styled.img`
  margin-right: 1rem;
  height: auto;
  max-height: 50%;
`;

const Header: FC = () => {
  return (
    <Bar>
      <Title>
        Innholdsinformasjon <Divider />
      </Title>

      <LogoImgWrapper src={UnitLogo} alt="Unit logo" />
    </Bar>
  );
};

export default Header;
