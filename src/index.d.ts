export interface BitlyConfig {
  apiUrl: string;
  apiVersion: 'v3' | 'v4'; // We support only these versions
  domain: string;
  format: string;
  group_guid: string;
  [k: string]: any; // Config can support additional parameters we may need in the future
}

export interface BitlyUrlQueryParams {
  longUrl: string;
  url: string;
  hash: string[];
  shortUrl: string[];
  [k: string]: any;
}

export interface ShortenResponse {
  url: string;
  hash: string;
  global_hash: string;
  long_url: string;
  new_hash: number;
}

export interface ExpandInteface {
  expand: string[];
}

type BitlyResponseData = ShortenResponse | ExpandInteface;

export interface BitlyResponse {
  status_code: number;
  status_txt: string;
  data: BitlyResponseData;
}

export interface BitlyError extends Error {
  statusCode: number;
  data: object;
}
