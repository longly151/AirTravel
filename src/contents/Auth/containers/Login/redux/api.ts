/* eslint-disable import/prefer-default-export */
import Api from '@utils/api';
import { ILogInInput } from './model';

export const realtorLoginApi = (data: ILogInInput) => Api.post('/auth/login/customer', data);

export const registerFcmTokenApi = (data: {nofifyToken: string}) => Api.patch('/customers/notify/token', data);
