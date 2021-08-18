export interface Innholdsformasjon {
  isbn: string;
  title?: string;
  description_short?: string[];
  description_long?: string[];
  table_of_contents?: string[];
  image_path?: string;
  audio_file?: string;
  source?: string;
}
