import { Innholdsformasjon } from '../types';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_INNHOLDSTJENESTE_API_URL;

export const getInnholdsinformasjon = async (isbn: string): Promise<Innholdsformasjon> => {
  const url = `${apiUrl}?isbn=${isbn}`;
  const apiResponse = await axios.get(url);
  const innholdResponse = JSON.parse(apiResponse.data.body);
  const innholdsinformasjon: Innholdsformasjon = { isbn: isbn };
  if (!innholdResponse) {
    return innholdsinformasjon;
  }
  innholdsinformasjon.title = innholdResponse.title;
  innholdsinformasjon.image_path = getImagePath(
    innholdResponse.image_small,
    innholdResponse.image_original,
    innholdResponse.image_large
  );
  innholdsinformasjon.description_short = splitOnSomeTags(innholdResponse.description_short).map(removeAllTags);
  innholdsinformasjon.description_long = splitOnSomeTags(innholdResponse.description_long).map(removeAllTags);
  innholdsinformasjon.table_of_contents = splitOnSomeTags(innholdResponse.table_of_contents).map(removeAllTags);

  innholdsinformasjon.audio_file = innholdResponse.audio_file ?? null;

  innholdsinformasjon.source = innholdResponse.source;

  return innholdsinformasjon;
};

const getImagePath = (small: string, original: string, large: string) => {
  if (large) {
    return large;
  } else {
    return original ? original : small;
  }
};

const removeAllTags = (value: string) => {
  return value.replace(/(<([^>]+)>)/gi, '');
};

const splitOnSomeTags = (field: string) => {
  if (field) {
    const replacedSomeTagsWithNewLine = field
      .replaceAll('\\n', '')
      .replaceAll('<br>', '\\n')
      .replaceAll('<br />', '\\n')
      .replaceAll('<p>', '\\n\\n')
      .replaceAll('<li>', '\\n')
      .replaceAll('<br>', '\\n');

    return replacedSomeTagsWithNewLine.split('\\n');
  }
  return [];
};
