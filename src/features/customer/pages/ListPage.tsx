import { Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import customerApi from 'api/customerApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectAccountMap } from 'features/account/accountSlice';
import { selectCityList, selectCityMap } from 'features/city/citySlice';
import { Customer, ListParams } from 'models';
import * as React from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CustomerFilter } from '../components/CustomerFilter';
import CustomerTable from '../components/CustomerTable';
import { customerActions, selectCustomerList, selectCustomerListFilter, selectCustomerListLoading, selectCustomerListPagination } from '../customerSlice';

const useStyle = makeStyles(theme => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1)
  },
  titleContainer: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(6)
  },
  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  }
}))
export default function ListPage () {
  const match = useRouteMatch()
  const history = useHistory()
  const dispatch = useAppDispatch()
  const classes = useStyle()
  const customerList = useAppSelector(selectCustomerList)
  const pagination = useAppSelector(selectCustomerListPagination)
  const filter = useAppSelector(selectCustomerListFilter)
  const loading = useAppSelector(selectCustomerListLoading)
  const accountMap = useAppSelector(selectAccountMap)
  const cityList = useAppSelector(selectCityList)
  const cityMap = useAppSelector(selectCityMap)

  const handlePageChange = (event: any, page: number) => {
    dispatch(
      customerActions.setFilter({
        ...filter,
        _page: page
      })
    )
  };

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(customerActions.setFilterWithDebounce(newFilter))
  }
  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(customerActions.setFilter(newFilter))
  }
  const handleRemoveCustomer = async (customer: Customer) => {
    console.log('Handle remove', customer);
    try {
      // call api
      await customerApi.remove(customer?.id || '')
      
      toast.success("Remove customer successfully");
      
      const newFilter = { ...filter }
      dispatch(customerActions.fetchCustomerList(newFilter))
    } catch (error) {
      console.log('remove customer error', error);
    }
  }
  const handleEditCustomer = async (customer: Customer) => {
    console.log('Handle edit', customer);
    history.push(`${match.url}/edit/${customer.id}`, {customerId: customer.id})
  }

  React.useEffect(() => {
    dispatch(customerActions.fetchCustomerList(filter))
  }, [dispatch, filter])
  
  return (
    <Box className={classes.root} >
      {loading && <LinearProgress className={classes.loading}/>}
      <Box className={classes.titleContainer}>
        <Typography variant="h4" >customers</Typography>
        <Link to={`${match.url}/add`}>
          <Button variant="contained" color="primary">Add new customer</Button>
        </Link>
      </Box>

      <Box mb={3}>
        <CustomerFilter 
          filter={filter} 
          cityList={cityList} 
          onChange={handleFilterChange}
          onSearchChange={handleSearchChange}/>
      </Box>

      <Box>
        <CustomerTable 
          customerList={customerList} 
          accountMap={accountMap} 
          cityMap={cityMap} 
          onRemove={handleRemoveCustomer}
          onEdit={handleEditCustomer}/>
      </Box>
      <Box mt={2} display="flex" justifyContent="center">
        {/* 
          Page calculation
          page = Math.ceil(totalRows / limit). Ex: 20/15 = ceil(1.3) = 2 
        */}
        <Pagination 
          color="primary"
          count={Math.ceil(pagination._totalRows / pagination._limit)} 
          page={pagination._page} 
          onChange={handlePageChange} />
      </Box>
    </Box>
  )
}
