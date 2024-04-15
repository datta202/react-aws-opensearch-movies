export interface Transporter {
  config?: ConfigConnection;
  msearch: (requests: SearchRequest[]) => Promise<ElasticsearchResponseBody[]>;
}

export interface AppSettings {
  debug: boolean;
}

export interface BasicAuth {
  username: string;
  password: string;
}

export interface ConfigConnection {
  /**
   * @description The Elasticsearch host
   * @example http://localhost:9200
   */
  host?: string;
  /**
   * @description The Elasticsearch API key. This is optional and only required if you have API key authentication enabled.
   * @example 1234567890
   */
  apiKey?: string;
  /**
   * @description Headers to be sent with the Elasticsearch request.
   * @example { 'X-My-Header': 'My-Value' }
   */
  headers?: Record<string, string>;
  /**
   * @description The Elasticsearch cloud id. This is optional and can be used to connect to Elasticsearch cloud. An alternative to host.
   */
  cloud_id?: string;
  /**
   * @description The Elasticsearch account. This is optional and only required if you have basic authentication enabled.
   * @example username: elastic
   * @example password: changeme
   */
  auth?: BasicAuth;

  withCredentials?: boolean;
  /**
   * @description Set to true to send credentials with the request. This is useful for CORS requests.
   */
}

export type SearchRequest = {
  body: ElasticsearchSearchRequest;
  request: AlgoliaMultipleQueriesQuery;
  indexName: string;
};

type ElasticsearchHitDocument = Record<string, unknown>;
type ElasticsearchHit = ElasticsearchBaseHit<ElasticsearchHitDocument>;

type ElasticsearchResponseBody =
  ElasticsearchBaseResponseBody<ElasticsearchHitDocument>;

export type {
  ElasticsearchHitDocument,
  ElasticsearchHit,
  ElasticsearchResponseBody,
};
