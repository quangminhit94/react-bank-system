import { Customer } from 'models/customer';
import { ListParams, ListResponse } from 'models/common';
import axiosClient from './axiosClient';

const resourceUrl = '/customers'

const customerApi = {
  getAll(params: ListParams): Promise<ListResponse<Customer>> {
    return axiosClient.get(resourceUrl, { params })
  },
  getById(id: string | number): Promise<Customer> {
    const url = `${resourceUrl}/${id}`
    return axiosClient.get(url)
  },
  add(data: Customer): Promise<Customer> {
    const url = `${resourceUrl}`
    return axiosClient.post(url, data)
  },
  update(data: Partial<Customer>): Promise<Customer> {
    const url = `${resourceUrl}/${data.id}`
    return axiosClient.put(url, data)
  },
  remove(id: string | number): Promise<any> {
    const url = `${resourceUrl}/${id}`
    return axiosClient.delete(url)
  }
};

export default customerApi;