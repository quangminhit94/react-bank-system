import { Box, makeStyles } from '@material-ui/core';
import { Header, Sidebar } from 'components/Common';
import { DashboardPage } from 'features/dashboard';
import { CustomerPage } from 'features/customer';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

export interface AdminLayoutProps {
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridAutoColumns: '280px 1fr',
    gridTemplateAreas: `"header header" "sidebar main"`,

    minHeight: '100vh',
  },
  header: {
    gridArea: 'header',
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  sidebar: {
    gridArea: 'sidebar',
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },
  main: {
    gridArea: 'main',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 3),
  },
}))

export function AdminLayout (props: AdminLayoutProps) {
  const classes = useStyles()
  return (
    <div>
      <Box className={classes.root}>
        <Box className={classes.header}>
          <Header/>
        </Box>
        <Box className={classes.sidebar}>
          <Sidebar/>
        </Box>
        <Box className={classes.main}>
          <Switch>
            <Route path="/admin/dashboard">
              <DashboardPage/>
            </Route>
            <Route path="/admin/customers">
              <CustomerPage/>
            </Route>
            <Route path="/admin" exact>
              Admin
            </Route>
          </Switch>
        </Box>
      </Box>
    </div>
  );
}
