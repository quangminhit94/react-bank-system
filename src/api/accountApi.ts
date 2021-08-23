import { Account } from 'models/account';
import { ListParams, ListResponse } from 'models/common';
import axiosClient from './axiosClient';

const resourceUrl = '/accounts'

const accountApi = {
  getAll(params: ListParams): Promise<ListResponse<Account>> {
    return axiosClient.get(resourceUrl, { params })
  }
};

export default accountApi;