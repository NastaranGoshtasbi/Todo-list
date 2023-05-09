import { BASE_URL } from "@/types/constants";

export const request = async  (
    method,
    url,
    query = undefined,
    inputOptions = {},
  ) => {
    const options = JSON.parse(JSON.stringify(inputOptions));

    if ('body' in options && options.body instanceof Object) {
      options.body = JSON.stringify(options.body);
      options.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
      };
    }

    const search = query ? `?${new URLSearchParams(query).toString()}` : '';

    const response = await window.fetch(`${BASE_URL}${url}${search}`, {
      method,
      credentials: 'include',
      ...options,
    });

    if (response.ok) {
      return {
        headers: response.headers,
        body: await response.json(),
      };
    }
    throw new Error(response.statusText);
  }
