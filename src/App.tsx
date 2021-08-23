import cityApi from 'api/cityApi';
import { NotFound, PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout';
import LoginPage from 'features/auth/pages/LoginPage';
import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  useEffect(() => {
    console.log('start');
    cityApi.getAll({_page: 1, _limit: 10}).then(response => console.log('city', response))
  }, [])
  return (
    <div className="App">
      <Switch>
        <Route path="/login">
          <LoginPage/>
        </Route>

        <PrivateRoute path="/admin">
          <AdminLayout/>
        </PrivateRoute>

        {/* Set default route */}
        <Redirect from="/" to="/admin" />

        <Route>
          <NotFound/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
