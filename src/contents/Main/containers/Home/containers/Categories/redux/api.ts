/* eslint-disable implicit-arrow-linebreak */
import API from '@utils/api';

const path = '/service_categories';

export const fetchServiceCategories = (queryString: string) =>
  API.get(`${path}?${queryString}`);

export const fetchServiceCategoryById = (id: number) =>
  API.get(`${path}/${id}`);
