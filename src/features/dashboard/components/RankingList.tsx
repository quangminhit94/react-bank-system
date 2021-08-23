import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Transaction, Customer } from 'models';
import React from 'react';

export interface RankingListProps {
  customerList?: Customer[];
  rankingList?: Transaction[];
}

const useStyles = makeStyles({
  table: {
  },
});
export function TransactionRankingList({ rankingList }: RankingListProps) {
  const classes = useStyles();
  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">#</TableCell>
            <TableCell align="left">Type</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rankingList && rankingList.map((transaction, idx) => (
            <TableRow key={transaction.id}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell align="left">{transaction.type}</TableCell>
              <TableCell align="right">{transaction.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export function CustomerRankingList({ customerList }: RankingListProps) {
  const classes = useStyles();
  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">#</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="right">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customerList && customerList.map((customer, idx) => (
            <TableRow key={customer.id}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell align="left">{customer.name}</TableCell>
              <TableCell align="right">{customer.memberScore}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
