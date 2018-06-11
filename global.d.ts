export interface BitlyClient {
  info: (items: string | string[]) => Promise<BitlyResponseData>;
  shorten: (longUrl: string) => Promise<BitlyResponseData>;
  expand: (items: string | string[]) => Promise<BitlyResponseData>;
  clicks: (items: string | string[]) => Promise<BitlyResponseData>;
  clicksByMinute: (items: string | string[]) => Promise<BitlyResponseData>;
  clicksByDay: (items: string | string[]) => Promise<BitlyResponseData>;
  lookup: (url: string) => Promise<BitlyResponseData>;
  referrers: (item: string) => Promise<BitlyResponseData>;
  countries: (item: string) => Promise<BitlyResponseData>;
}

export interface BitlyConfig {
  apiUrl?: string;
  apiVersion?: 'v3'; // Fixed as we only support this version for now
  domain?: string;
  format?: string;
  [k: string]: any;
}

export interface BitlyUrlQueryParams {
  shortUrl?: string[];
  longUrl?: string;
  url?: string;
  hash?: string[];
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
