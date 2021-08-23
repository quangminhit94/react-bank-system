import { Transaction } from "./transaction";

export class Account {

  public transactions: Transaction[];

  public constructor(
      public id: number | string,
      public customerId: number | string,

      public fullName: string,
      public accountNumber: string,
      public balance: number,
      public expireDate?: number,
      
      transactions?: Transaction[]
  ) {
      this.transactions = transactions !== undefined ? transactions : [];
  }
  
}