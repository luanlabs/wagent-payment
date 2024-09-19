export interface IResponse<T> {
  message: string | object;
  result: T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: { message: string; extras?: any };
}

const fetcher = async <T>(
  url: string,
  config?: RequestInit,
): Promise<{ data: T; response: Response }> => {
  const response = await fetch(url, config);

  if (response.status >= 400) {
    const data = await response.json();

    throw { data, response };
  }

  const data = await response.json();

  return { data, response };
};

export default fetcher;
