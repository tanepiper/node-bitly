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

  [k: string]: any;
}

/**
 * Paramaters that can be passed to a Bitly URL request
 */
export interface BitlyUrlQueryParams {
  /**
   * A list of short url hashes
   */
  short_url?: string[];
  /**
   * A list of long URLS
   */
  long_url?: string;
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
  title: string;
  /**
   * Deep links
   */
  deeplinks: DeepLink[];
  /**
   * Created By
   */
  created_by: string;
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
 * A Bitly error
 */
export interface BitlyError {
  field: string;
  message: string;
  error_code: string;
}


/**
 * An error from Bitly
 */
export interface BitlyErrorResponse {
  message: string;
  errors: BitlyError[];
  resource: string;
  description: string;
}

export type BitlyResponse = BitlyLink | BitlyError;
