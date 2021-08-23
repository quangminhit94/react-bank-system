/**
 * A Transaction for a account
 */
 export class Transaction {

  public constructor(
    public id: number | string,
    public description: string,
    public type: string,
    public date: number,
    public amount: number,
    public accountId: number | string,
  ) {}
}