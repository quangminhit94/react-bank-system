import { Box, Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Account, City, Customer } from 'models';
import React from 'react';
import { capitalizeString, setScoreColor } from 'utils';

export interface CustomerTableProps {
  customerList?: Customer[];
  accountMap: {
    [key: string]: Account,
  };
  cityMap: {
    [key: string]: City,
  };
  onEdit?: (customer: Customer) => void;
  onRemove?: (customer: Customer) => void;
}

const useStyles = makeStyles({
  table: {
  },
});


export default function CustomerTable({ customerList, accountMap, cityMap, onEdit, onRemove }: CustomerTableProps) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [selectedCustomer, setSelectedCustomer] = React.useState<Customer>();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleRemoveClick = (customer: Customer) => {
    // set selected customer
    setSelectedCustomer(customer)
    // show confirm dialog
    setOpen(true);
  }
  const handleRemoveConfirm = (customer: Customer) => {
    // call onRemove
    onRemove?.(customer)
    // show confirm dialog
    setOpen(false);
  }
  return (
    <>
      <TableContainer>
      <Table className={classes.table} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">#</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Score</TableCell>
            <TableCell align="right">Account Number</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customerList && customerList.map((customer, idx) => (
            <TableRow key={customer.id}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell align="left">{customer.name}</TableCell>
              <TableCell align="left">{capitalizeString(customer.gender)}</TableCell>
              <TableCell align="left">{customer.age}</TableCell>
              <TableCell align="right">
                <Box color={setScoreColor(customer.memberScore)}>{customer.memberScore}</Box>
              </TableCell>
              <TableCell align="left">{accountMap[`${customer.id}`]?.accountNumber}</TableCell>
              <TableCell align="left">{cityMap[`${customer.cityId}`]?.name}</TableCell>
              <TableCell align="right">
                <Button variant="contained" color="primary" onClick={() => onEdit?.(customer)}>Edit</Button>
                <span>&nbsp;</span>  
                <Button variant="contained" color="secondary" onClick={() => handleRemoveClick(customer)}>Remove</Button>  
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      
      {/* Dialog remove */}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Remove customer?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to remove this customer "{selectedCustomer?.name}"? This action can&apos;t be undo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default" variant="outlined">
            No
          </Button>
          <Button onClick={() => handleRemoveConfirm(selectedCustomer as Customer)} color="secondary" variant="contained" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
