import { headers, baseUrl } from '..';
import { isAuthenticated } from '../auth';

export type FetchExpensesParams = {
  startDate?: Date,
  endDate?: Date
  cursor?: Date | string,
}

export async function listExpenses(
  { startDate, endDate, cursor }: FetchExpensesParams,
): Promise<any> {
  const { token } = isAuthenticated();
  let endpoint = `${baseUrl}/expenses`;

  if (startDate && endDate) endpoint = `${baseUrl}/expenses?startDate=${startDate}&endDate=${endDate}`;
  if (cursor) endpoint = `${baseUrl}/expenses?cursor=${cursor}`;
  if (startDate && endDate && cursor) endpoint = `${baseUrl}/expenses?startDate=${startDate}&endDate=${endDate}&cursor=${cursor}`;

  const resp = await fetch(endpoint, {
    method: 'GET',
    headers: { ...headers, Authorization: `Bearer ${token}` },
  });

  return resp.json();
}
