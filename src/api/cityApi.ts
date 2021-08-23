import { City } from 'models';
import { ListParams, ListResponse } from 'models/common';
import axiosClient from './axiosClient';

const resourceUrl = '/cities'

const cityApi = {
  getAll(params: ListParams): Promise<ListResponse<City>> {
    return axiosClient.get(resourceUrl, { params })
  }
};

export default cityApi;