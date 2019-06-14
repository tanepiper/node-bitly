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

declare class BitlyClient {
  constructor(accessToken: string, config?: BitlyConfig);
  /**
   * This is used to return the page title for a given Bitlink.
   * @param items An array of short urls or hashes
   * @returns The results of the request
   */
  public info(items: string | string[]): Promise<BitlyResponseData>;

  /**
   * Used to shorted a url
   * @param longUrl The URL to be shortened
   * @returns The results of the request
   */
  public shorten(longUrl: string): Promise<BitlyResponseData>;

  /**
   * Request to expand urls and hashes
   * @param items A string or array of strings of short urls and hashes.
   * @returns The results of the request
   */
  public expand(items: string | string[]): Promise<BitlyResponseData>;

  /**
   * Request to get clicks for urls and hashes
   * @param  items A string or array of strings of short urls and hashes.
   * @returns The result of the request
   */
  public clicks(items: string | string[]): Promise<BitlyResponseData>;

  /**
   * Request to get clicks by minute for urls and hashes
   * @param items A string or array of strings of short urls and hashes.
   * @returns The result of the request
   */
  public clicksByMinute(items: string | string[]): Promise<BitlyResponseData>;

  /**
   * Request to get clicks by day for urls and hashes
   * @param items A string or array of strings of short urls and hashes.
   * @returns The result of the request
   */
  public clicksByDay(items: string | string[]): Promise<BitlyResponseData>;

  /**
   * Lookup a single url
   * @param url The url to look up
   * @returns The result of the request
   */
  public lookup(url: string): Promise<BitlyResponseData>;

  /**
   * Request referrers for a single url
   * @param  uri The uri to look up
   * @returns The result of the request
   */
  public referrers(item: string): Promise<BitlyResponseData>;

  /**
   * Request countries for a single url
   * @param  uri The uri to look up
   * @returns The result of the request
   */
  public countries(item: string): Promise<BitlyResponseData>;

  /**
   * Perform any bitly API request using a method name and passed data object
   * @param method The method name to be called on the API
   * @param data The data object to be passed. Keys should be query parameters
   * @return The bitly request return data
   */
  public bitlyRequest(
    method: string,
    data: BitlyUrlQueryParams | object
  ): Promise<BitlyResponseData>;
}

export as namespace BitlyClient;
export default BitlyClient;
