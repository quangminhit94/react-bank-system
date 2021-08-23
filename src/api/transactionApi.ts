import { Transaction } from 'models/transaction';
import { ListParams, ListResponse } from 'models/common';
import axiosClient from './axiosClient';

const resourceUrl = '/transactions'

const transactionApi = {
  getAll(params: ListParams): Promise<ListResponse<Transaction>> {
    return axiosClient.get(resourceUrl, { params })
  }
};

export default transactionApi;