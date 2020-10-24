import Api from '@utils/api';

export const fetchProducts = (queryString: string) => Api.get(`/services?${queryString}`);

export const fetchProductById = (id: number) => Api.get(`/services/${id}`);
