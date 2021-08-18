import styled from 'styled-components';

export const CollapseContainer = styled.div`
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-bottom: 0.5rem;
  border-radius: 5px;
  border: solid rgb(40, 75, 99);
  &.oria {
  }
`;

export const CollapseButton = styled.button`
  && {
    width: 100%;
    display: inline-block;
    background-color: white;
    color: rgb(40, 75, 99);
    text-align: left;
    font-family: Barlow, sans-serif;
    font-size: 20px;
    font-weight: Bold;
    margin-top: 0.5rem;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    outline: none;
    border-radius: 5px;
    border-width: 0.25rem;
    border-color: rgb(40, 75, 99);
    cursor: pointer;
    &:focus {
      border-color: orange;
    }
  }
`;

export const CollapsedSummary = styled.p`
  background-color: white;
  font-family: Barlow, sans-serif;
  font-size: 15px;
  margin-top: 0.5rem;
  margin-bottom: 0;
  padding: 1rem;
  border-radius: 5px;
`;

export const CollapsedContents = styled.ul`
  background-color: white;
  font-family: Barlow, sans-serif;
  font-size: 15px;
  margin-top: 0.5rem;
  margin-bottom: 0;
  padding: 1rem;
  border-radius: 5px;
`;

export const TitleLabel = styled.h1`
  font-family: Barlow, sans-serif;
  font-size: 30px;
  font-weight: Bold;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  &.oria {
  }
`;

export const ISBNLabel = styled.h2`
  font-family: Barlow, sans-serif;
  font-size: 20px;
  font-weight: 200;
  margin-left: 1rem;
  margin-top: 0;
  margin-bottom: 1rem;
  &.oria {
  }
`;

export const ImageContainer = styled.img`
  margin-right: 1rem;
  margin-left: 1rem;
  height: 100%;
  width: fit-content;
`;

export const ErrorTextField = styled.div`
  white-space: pre-line;
  font-weight: Bold;
`;

export const CollapsedAudio = styled.div`
  background-color: white;
  font-family: Barlow, sans-serif;
  font-size: 15px;
  margin-top: 0.5rem;
  margin-bottom: 0;
  padding: 1rem;
  border-radius: 5px;
`;
