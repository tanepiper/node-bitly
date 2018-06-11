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

export interface BitlyResponse {
  status_code: number;
  status_txt: string;
  data: {
    hash?: string;
    expand?: string[]
  };
}

export interface BitlyError extends Error {
  statusCode: number;
  data: object;
}
