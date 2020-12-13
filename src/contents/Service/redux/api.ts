/* eslint-disable implicit-arrow-linebreak */
import API from '@utils/api';

const path = '/services';

export const fetchServices = (queryString: string) => API.get(`${path}?sort=updatedAt%2CDESC&${queryString}`);

export const fetchServiceById = (id: number) => API.get(`${path}/${id}`);
