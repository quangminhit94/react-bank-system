import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import customerApi from 'api/customerApi';
import { Customer } from 'models';
import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { history } from 'utils';
import { CustomerForm } from '../components/CustomerForm';

export function AddEditPage () {
  const { id: customerId } = useParams<{id: string}>()
  const isEditMode = Boolean(customerId)
  const [customer, setCustomer] = React.useState<Customer>()

  React.useEffect(() => {
    if(!customerId) return;
    (async () => {
      try {
        const data: Customer = await customerApi.getById(customerId)
        console.log(data);
        setCustomer(data)
      } catch (error) {
        console.log('Failed to fetch customer details', error);
      }
    })()
  },[customerId])
  const handleCustomerFormSubmit = async (formValues: Customer) => {
    if(isEditMode) {
      await customerApi.update(formValues)
    } else {
      await customerApi.add(formValues)
    }

    // throw new Error('Test alert error')
    toast.success("Save customer successfully");
    
    // redirect to customer list
    history.push('/admin/customers')
  }

  const initialValues: Customer = {
    name: '',
    age: '',
    gender: 'male',
    memberScore: '',
    address: '',
    ...customer,
  } as Customer;

  console.log('Customer', customer);
  return (
    <Box>
      <Link to="/admin/customers">
        <Typography variant="caption" style={{display: 'flex', alignItems: 'center'}}>
          <ChevronLeft/> &nbsp; Back to customer list
        </Typography>
      </Link>
      <Typography variant="h4">
        {isEditMode ? 'Update customer' : 'Add new customer'}
      </Typography>

      {(!isEditMode || customer) && (
        <Box mt={3}>
          <CustomerForm initialValues={initialValues} onSubmit={handleCustomerFormSubmit}/>
        </Box>
      )}
    </Box>
  )
}
