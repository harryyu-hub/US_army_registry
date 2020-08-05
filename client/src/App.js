import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/home';
import CreateUser from './components/createUsers';
import EditUser from './components/editUsers';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/createuser' component={CreateUser} />
          <Route path='/edituser/:userId' component={EditUser} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
