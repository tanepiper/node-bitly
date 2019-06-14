/**
 * A Bitly module configuration
 */
export interface BitlyConfig {
  /**
   * The API URL, optional as default is provided
   */
  apiUrl?: string;
  /**
   * API Version, currently v3 is only supported
   */
  apiVersion?: "v3"; // Fixed as we only support this version for now
  /**
   * Optional custom domain
   */
  domain?: string;
  /**
   * Return format, default is JSON
   */
  format?: string;
  [k: string]: any;
}

/**
 * Paramaters that can be passed to a Bitly URL request
 */
export interface BitlyUrlQueryParams {
  /**
   * A list of short url hashes
   */
  shortUrl?: string[];
  /**
   * A list of long URLS
   */
  longUrl?: string;
  /**
   * A single URL
   */
  url?: string;
  /**
   * A single hash
   */
  hash?: string[];
  [k: string]: any;
}

/**
 * The response from a shorten request
 */
export interface ShortenResponse {
  /**
   * The Bitly URL
   */
  url: string;
  /**
   * The bitly hash
   */
  hash: string;
  /**
   * Global hash if URL already available
   */
  global_hash: string;
  /**
   * Long URL for this response
   */
  long_url: string;
  /**
   * If it's a new hash or not
   */
  new_hash: number;
}

/**
 * An expand response
 */
export interface ExpandResponse {
  expand: string[];
}

/**
 * Type for a response from Bitly
 */
export type BitlyResponseData = ShortenResponse | ExpandResponse;

/**
 * Type for a bitly response
 */
export interface BitlyResponse<T = BitlyResponseData> {
  /**
   * Status code of the response
   */
  status_code: number;
  /**
   * The status text
   */
  status_txt: string;
  /**
   * The data being returned
   */
  data: T;
}

/**
 * An error from Bitly
 */
export interface BitlyError<T = any> extends Error {
  /**
   * Status code of the error
   */
  statusCode: number;
  /**
   * Error data
   */
  data: T;
}
