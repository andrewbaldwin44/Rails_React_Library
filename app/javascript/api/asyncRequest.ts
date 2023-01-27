import { camelCaseKeys, snakeCaseKeys, camelToSnakeCase } from 'utils/string';
const token = document.querySelector('meta[name="csrf-token"]').content;

export const REQUEST_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

type Query = { [key: string]: string } | null;

interface IRequestHeaders {
  type?: string;
  body?: { [key: string]: any } | null;
}

export interface IAsyncRequestOptions extends IRequestHeaders {
  query?: Query;
}

const getRequestHeaders = ({ type, body }: IRequestHeaders) => ({
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': token,
  },
  method: type,
  body: body ? JSON.stringify(snakeCaseKeys(body)) : null,
});

function formatQueryString(query?: Query) {
  if (!query) {
    return '';
  }

  return Object.entries(query).reduce((qs, [key, value]) => {
    if (!value) return qs;

    const snakeCaseKey = camelToSnakeCase(key);
    const encodedValue = encodeURI(String(value).replace('#', ''));

    return qs ? `${qs}&${snakeCaseKey}=${encodedValue}` : `?${snakeCaseKey}=${encodedValue}`;
  }, '');
}

interface IApiResponse {
  statusCode: number;
  message: string;
}

export async function asyncRequest<IResponse>(
  request: string,
  { type = REQUEST_METHODS.GET, body = null, query = null }: IAsyncRequestOptions = {},
) {
  const queryString = formatQueryString(query);
  const requestHeaders = getRequestHeaders({ type, body });
  const response = await fetch(`/${request}${queryString}`, requestHeaders);

  const parsedResponse = camelCaseKeys<IResponse & IApiResponse>(await response.json());

  if (parsedResponse.statusCode >= 400) {
    throw new Error(`Network Error: Status ${parsedResponse.statusCode} ${parsedResponse.message}`);
  }

  return parsedResponse;
}
