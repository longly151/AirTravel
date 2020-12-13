/* eslint-disable import/prefer-default-export */
import Api from '@utils/api';
import { IRegisterInput } from './model';

export const realtorRegisterApi = (data: IRegisterInput) => Api.post('/auth/register/customer', data);
