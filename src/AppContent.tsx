import React, { useEffect, useState } from 'react';
import { CircularProgress, Typography } from '@material-ui/core';
import { getLibraryAccess, getMetadata } from './api/api';
import ErrorBanner from './components/ErrorBanner';
import styled from 'styled-components';
import { Library, LibraryAccess, MetaData, QueryParameters } from './types/app.types';
import MetadataHolder from './components/MetadataPresentation';
import OrderSchema from './components/OrderSchema';
import WarningBanner from './components/WarningBanner';

export const StyledFullPageProgressWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  padding: 0;
  margin: 0;
  align-items: center;
  justify-content: center;
`;

export const PageWrapper = styled.div`
  padding: 0;
  margin: 1rem;
  word-break: break-word;
`;

export const StyledPageTitleTypography = styled(Typography)`
  width: 100%;
`;

//Bev = Bevaringssamling at NB. It is possible to order even when they don't have the book available.
const BEVLibrary = '0183334';

const AppContent = () => {
  const query = new URLSearchParams(window.location.search);
  const recordId = query.get(QueryParameters.recordid);
  const patronId = query.get(QueryParameters.patronid);
  const [metaData, setMetaData] = useState<MetaData>();
  const [libraryAccess, setLibraryAccess] = useState<LibraryAccess>();
  const [isLoadingAccess, setIsLoadingAccess] = useState(true);
  const [isLoadingMetaData, setIsLoadingMetaData] = useState(false);
  const [appError, setAppError] = useState<Error>();
  const [fetchMetaDataError, setFetchMetaDataError] = useState<Error>();

  const cleanUpCreators = (creators: string) => {
    return creators.split('$$Q')[0].trim();
  };

  const cleanUpLibraries = (libraries: Library[]) => {
    return libraries.filter((library) => library.library_code !== BEVLibrary);
  };

  useEffect(() => {
    const fetchLibraryAccess = async () => {
      try {
        setIsLoadingAccess(true);
        setAppError(undefined);
        patronId && setLibraryAccess((await getLibraryAccess(patronId)).data);
      } catch (error) {
        error instanceof Error && setAppError(error);
      } finally {
        setIsLoadingAccess(false);
      }
    };
    const fetchMetadata = async () => {
      try {
        setIsLoadingMetaData(true);
        setFetchMetaDataError(undefined);
        if (recordId) {
          const response: MetaData = (await getMetadata(recordId)).data;
          response.creator = cleanUpCreators(response.creator);
          response.libraries = cleanUpLibraries(response.libraries);
          recordId && setMetaData(response);
        }
      } catch (error) {
        error instanceof Error && setFetchMetaDataError(error);
      } finally {
        setIsLoadingMetaData(false);
      }
    };
    if (!recordId || !patronId) {
      setAppError(new Error('URL must contain parameters: recordid and patronid'));
    } else {
      fetchLibraryAccess().then();
      fetchMetadata().then();
    }
  }, [recordId, patronId]);

  return (
    <>
      {appError ? (
        <ErrorBanner error={appError} />
      ) : isLoadingAccess ? (
        <StyledFullPageProgressWrapper>
          <CircularProgress />
        </StyledFullPageProgressWrapper>
      ) : !libraryAccess?.ncip_server_url ? (
        <WarningBanner message="Sorry, this ILL feature is not available. Your library does not support the Norwegian NCIP profile." />
      ) : !isLoadingMetaData ? (
        fetchMetaDataError ? (
          <ErrorBanner error={fetchMetaDataError} />
        ) : (
          metaData && (
            <PageWrapper>
              <Typography variant="h1" gutterBottom>
                Use this form to send ILL-request
              </Typography>
              <MetadataHolder metaData={metaData} />
              {patronId && (
                <OrderSchema
                  metaData={metaData}
                  patronId={patronId}
                  ncip_server_url={libraryAccess.ncip_server_url}
                  readonly={libraryAccess.isAlmaLibrary}
                />
              )}
            </PageWrapper>
          )
        )
      ) : (
        <StyledFullPageProgressWrapper>
          <CircularProgress />
        </StyledFullPageProgressWrapper>
      )}
    </>
  );
};

export default AppContent;
