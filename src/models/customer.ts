import { Account } from "./account";

export interface Customer {
  id: number | string;
  name: string;
  age?: number;
  memberScore?: number;
  gender?: 'male' | 'female';
  address?: string;
  
  createAt?: number;
  updateAt?: number;
  cityId?: number | string;
  accounts?: Account[];
}