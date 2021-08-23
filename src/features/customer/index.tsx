import { Box } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { accountActions, selectAccountListFilter } from 'features/account/accountSlice';
import { cityActions, selectCityListFilter } from 'features/city/citySlice';
import * as React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { AddEditPage } from './pages/AddEditPage';
import { DetailPage } from './pages/DetailPage';
import ListPage from './pages/ListPage';

export function CustomerPage () {
  // reuse /admin/customers from parent admin layout
  const match = useRouteMatch()
  const dispatch = useAppDispatch()
  const filter = useAppSelector(selectAccountListFilter)
  const cityFilter = useAppSelector(selectCityListFilter)

  React.useEffect(() => {
    dispatch(accountActions.fetchAccountList(filter))
    dispatch(cityActions.fetchCityList(cityFilter))
  }, [dispatch, filter, cityFilter])

  return (
    <Box>
      <Switch>
        <Route path={match.path} exact>
          <ListPage></ListPage>
        </Route>
        <Route path={`${match.path}/add`}>
          <AddEditPage></AddEditPage>
        </Route>
        <Route path={`${match.path}/edit/:id`}>
          <AddEditPage></AddEditPage>
        </Route>

        <Route path={`${match.path}/:id`}>
          <DetailPage></DetailPage>
        </Route>
      </Switch>
    </Box>
  );
}
