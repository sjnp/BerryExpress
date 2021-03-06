import React from 'react';
import {
  BrowserRouter as Router,
  Switch, Route 
} from 'react-router-dom'
import './App.css';

import Home from "./pages/Home"
import Login from './pages/Login';
import Admin from './pages/Admin';
import AddBranch from './pages/AddBranch';
import AddStaff from './pages/AddStaff';
import GetBranch  from './pages/GetBranch';
import GetStaff from './pages/GetStaff';

import Staff from './pages/Staff';
import AddParcel from './pages/AddParcel';
import UpdateParcelStatus from './pages/UpdateParcelStatus'

import Receipt from './pages/Receipt';

import Postman from './pages/Postman';

import Test from './pages/Test'

const App = () => {

  return (
    <Router>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css"></link>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined"></link>
      <Switch>
        <Route exact path='/' >
          <Home />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route exact path="/admin">
          <Admin />
        </Route>
        <Route path="/admin/addBranch">
          <AddBranch />
        </Route>
        <Route path="/admin/addStaff">
          <AddStaff />
        </Route>
        <Route path="/admin/getBranch">
          <GetBranch />
        </Route>
        <Route path="/admin/getStaff">
          <GetStaff />
        </Route>
        <Route exact path="/staff">
          <Staff />
        </Route>
        <Route path="/staff/addParcel">
          <AddParcel />
        </Route>
        <Route path="/staff/updateParcelStatus">
          <UpdateParcelStatus />
        </Route>
        <Route exact path="/postman">
          <Postman />
        </Route>
        <Route path="/postman/updateParcelStatus">
          <UpdateParcelStatus />
        </Route>
        <Route path="/test">
          <Test />
        </Route>
        <Route path="/receipt">
          <Receipt />
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
