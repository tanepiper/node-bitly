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
  apiVersion?: string; // Fixed as we only support this version for now
  /**
   * Optional custom domain
   */
  domain?: string;
  /**
   * Return format, default is JSON
   */
  format?: string;
  /**
   * Debug mode
   */
  debug?: boolean;

  [k: string]: any;
}

/**
 * Parameters that can be passed to a Bitly Request
 */
export interface BitlyQueryParams extends BitlyStandardQueryParams, BitlyStatQueryParams {
  [k: string]: any;
}

export interface BitlyStandardQueryParams {
  /**
   * Bitlink ID, made up of domain + hash. Example: bit.ly/1JtuvXY
   */
  bitlink?: string
  /**
   * Bitlink ID, made up of domain + hash. Alias for bitlink.
   */
  bitlink_id?: string;
  /**
   * Internet domain name. Default = "bit.ly"
   */
  domain?: string;
  /**
   * An un-shortened link
   */
  long_url?: string;
}

export interface BitlyStatQueryParams {
  /**
   * Unit of time. Default = "day"
   */
  unit?: BitlyTimeUnit;
  /**
   * How many units to query data for. Default = -1, for all units.
   */
  units?: number;
  /**
   * Limit on # of items to return. Default = 50
   */
  size?: number;
  /**
   * ISO-8601 timestamp. Default = current time.
   */
  unit_reference?: string;
}

export interface References {
  [key: string]: string;
}

/**
 * A Bitly link deep link
 */
export interface DeepLink {
  /**
   * Bitlink
   */
  bitlink: string;
  /**
   * Install URL
   */
  install_url: string;
  /**
   * Created date
   */
  created: string;
  /**
   * App URI path
   */
  app_uri_path: string;
  /**
   * Modified
   */
  modified: string;
  /**
   * Install type
   */
  install_type: string;
  /**
   * App GUID
   */
  app_guid: string;
  /**
   * GUID
   */
  guid: string;
  /**
   * OS
   */
  os: string;
}


/**
 * Type for a bitly response
 */
export interface BitlyLink {
  /**
   * References
   */
  references: References;
  /**
   * Archived
   */
  archived: boolean;
  /**
   * Tags
   */
  tags: string[];
  /**
   * Created Time
   */
  created_at: string;
  /**
   * Title
   */
  title?: string;
  /**
   * Deep links
   */
  deeplinks: DeepLink[];
  /**
   * Created By
   */
  created_by?: string;
  /**
   * Long URL
   */
  long_url: string;
  /**
   * Custom Bitlink
   */
  custom_bitlinks: string[];
  /**
   * Link
   */
  link: string;
  /**
   * ID
   */
  id: string;
}

/**
 * Expand response
 */
export interface BitlyExpandResponse {
  /**
   * ISO-8601 Timestamp
   */
  created_at: string;
  /**
   * The shortened link (domain + ID)
   */
  link: string;
  /**
   * Bitlink / ID
   */
  id: string;
  /**
   * The full, expanded link
   */
  long_url: string;
}

/**
 * Generic Stats Response Base
 */
export interface BitlyStatResponse {
  units: number;
  unit_reference: string;
  unit: BitlyTimeUnit;
  metrics: Array<{
    value: string;
    clicks: number;
  }>;
}

/**
 * https://dev.bitly.com/v4/#operation/getMetricsForBitlinkByCountries
 */
export interface BitlyMetricsByCountryRes extends BitlyStatResponse {
  facet: BitlyFacet;
}

/**
 * https://dev.bitly.com/v4/#operation/getClicksForBitlink
 */
export interface BitlyClickMetricsRes extends Omit<BitlyStatResponse, 'metrics'> {
  link_clicks: Array<{
    date: string;
    clicks: number;
  }>;
}

/**
 * https://dev.bitly.com/v4/#operation/getMetricsForBitlinkByReferrersByDomains
 */
export interface BitlyReferrersByDomainsMetricsRes extends Omit<BitlyStatResponse, 'metrics'> {
  referrers_by_domain: Array<{
    network: string;
    referrers: Array<{
      value: string;
      clicks: number;
    }>
  }>;
}

/**
 * https://dev.bitly.com/v4/#operation/getMetricsForBitlinkByReferringDomains
 */
export interface BitlyReferringDomainsMetrics extends BitlyStatResponse {
  facet: BitlyFacet;
}

/**
 * https://dev.bitly.com/v4/#operation/getMetricsForBitlinkByReferrers
 */
export interface BitlyMetricsByReferrers extends BitlyStatResponse {
  facet: BitlyFacet;
}

export type BitlyFacet = 'countries' | 'cities' | 'devices' | 'referrers' | 'referrers_by_domain' | 'referring_domains' | 'referring_networks' | 'shorten_counts';

export type BitlyTimeUnit = 'minute' | 'hour' | 'day' | 'week' | 'month';

/**
 * An error from Bitly
 */
export interface BitlyErrorResponse {
  message: string;
  errors: BitlyError[];
  resource: string;
  description: string;
}
/**
 * Error specifics
 */
export interface BitlyError {
  field: string;
  message: string;
  error_code: string;
}

export type BitlyResponse = BitlySuccess | BitlyErrorResponse;
export type BitlySuccess = BitlyLink | BitlyExpandResponse | BitlyMetricsByCountryRes | BitlyClickMetricsRes | BitlyReferrersByDomainsMetricsRes | BitlyReferringDomainsMetrics;

export type BitlyReqMethod = 'GET' | 'POST' | 'PATCH';


/**
 * Type Guards
 */
export function isBitlyLink(response: BitlyResponse): response is BitlyLink {
  return 'link' in response && 'id' in response && 'long_url' in response;
}

export function isBitlyErrResponse(response: any): response is BitlyErrorResponse {
  return 'message' in response && 'resource' in response;
}
