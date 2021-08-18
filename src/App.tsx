import React, { useEffect, useState } from 'react';
import './App.css';
import { Innholdsformasjon } from './types';
import CollapsedBox from './components/CollapsedBox';
import Header from './components/Header';
import Footer from './components/Footer';
import { ErrorTextField, ImageContainer, ISBNLabel, TitleLabel } from './components/CustomElements';
import { getInnholdsinformasjon } from './services/api';

const URL = window.location.href;
const filesUrl = process.env.REACT_APP_INNHOLDSTJENESTE_FILES_URL;
const oriaKeyword = 'oria';

function isEmpty(array?: string[]): boolean {
  return !(array && array.length);
}

const App = () => {
  const [innholdsinformasjon, setInnholdsinformasjon] = useState<Innholdsformasjon | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState<Error>();

  useEffect(() => {
    const fetchData = async () => {
      const isbn = getIsbnFromQueryOrPath();
      if (!isbn) {
        setLoadingError(new Error(`Resource not found. \nParameter specifying isbn was not provided.`));
        return;
      }
      try {
        setIsLoading(true);
        setLoadingError(undefined);
        setInnholdsinformasjon(await getInnholdsinformasjon(isbn));
      } catch (e) {
        setLoadingError(new Error('Failed to retrieve the resource, please try again.'));
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loadingError) {
    return <ErrorTextField>{loadingError.message}</ErrorTextField>;
  }

  if (!innholdsinformasjon) {
    return !oriaParameterIsSet() ? <Header /> : null;
  }

  function getIsbnFromQueryOrPath() {
    const searchQuery = new URLSearchParams(window.location.search);
    let isbn = searchQuery.get('isbn');
    if (!isbn) {
      let path = window.location.pathname;
      path = path.endsWith('/') ? path.substr(0, path.length - 1) : path;
      isbn = path.substring(path.lastIndexOf('/') + 1);
    }
    return isbn;
  }

  function oriaParameterIsSet() {
    return URL.includes(oriaKeyword);
  }

  function getClassNameBasedOnURL() {
    return oriaParameterIsSet() ? oriaKeyword : '';
  }

  return (
    <>
      {isLoading ? (
        <progress />
      ) : (
        <>
          {!oriaParameterIsSet() && (
            <>
              <Header />
              <TitleLabel className={getClassNameBasedOnURL()}>{innholdsinformasjon.title}</TitleLabel>
              <ISBNLabel className={getClassNameBasedOnURL()}>ISBN: {innholdsinformasjon.isbn}</ISBNLabel>
            </>
          )}

          <div className={'content-wrapper'}>
            <div className={'collapsed-boxes'}>
              {!isEmpty(innholdsinformasjon.description_short) && (
                <CollapsedBox
                  className={getClassNameBasedOnURL()}
                  name="Beskrivelse fra forlaget (kort)"
                  contents={innholdsinformasjon.description_short}
                  open={true}
                />
              )}
              {!isEmpty(innholdsinformasjon.description_long) && (
                <CollapsedBox
                  className={getClassNameBasedOnURL()}
                  name="Beskrivelse fra forlaget (lang)"
                  contents={innholdsinformasjon.description_long}
                  open={isEmpty(innholdsinformasjon.description_short)}
                />
              )}
              {!isEmpty(innholdsinformasjon.table_of_contents) && (
                <CollapsedBox
                  className={getClassNameBasedOnURL()}
                  name="Innholdsfortegnelse"
                  contents={innholdsinformasjon.table_of_contents}
                  open={isEmpty(innholdsinformasjon.description_short) && isEmpty(innholdsinformasjon.description_long)}
                />
              )}
              {filesUrl && innholdsinformasjon.audio_file && (
                <CollapsedBox
                  className={getClassNameBasedOnURL()}
                  name="Lydutdrag"
                  mp3File={filesUrl + innholdsinformasjon.audio_file}
                  open={false}
                />
              )}
            </div>
            {filesUrl && !oriaParameterIsSet() && innholdsinformasjon.image_path && (
              <ImageContainer src={filesUrl + innholdsinformasjon.image_path} alt="Bilde av boken" />
            )}
          </div>
        </>
      )}
      <Footer source={innholdsinformasjon.source} />
    </>
  );
};

export default App;
