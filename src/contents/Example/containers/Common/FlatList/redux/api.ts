import Api from '@utils/api';

export const fetchProducts = (queryString: string) => Api.get(`/properties?${queryString}`);

export const fetchProductById = (id: number) => Api.get(`/properties/${id}`);
