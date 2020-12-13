/* eslint-disable import/prefer-default-export */
import Api from '@utils/api';

export const fetchBills = (queryString: string) => Api.get(`/bills?sort=updatedAt%2CDESC&${queryString}`);
