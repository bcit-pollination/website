import './css/App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { useState } from 'react';

import Header           from './components/Header'
import RegistrationForm from './components/RegistrationForm';
import LoginForm        from './components/LoginForm';
import AlertComponent   from './components/AlertMessage';  
import Home             from './screens/Home';  
import OrganizationList from './screens/OrganizationList';
import CreateOrganization from './screens/CreateOrganization';
import ElectionForm     from './screens/CreateElection';
import ElectionResults  from './screens/ElectionResults';


function App() {

  const [errorMessage, updateErrorMessage] = useState(null);

  return (
    <Router>
      <div className="App">
        <Header className="App-header" onBackClick={() => { }} />

        <div className="container d-flex align-items-center flex-column">
          <Switch>
            <Route path="/" exact={true}>
              <LoginForm showError={updateErrorMessage} onClick={() => { }} />
            </Route>
            <Route path="/login">
              <LoginForm showError={updateErrorMessage} onClick={() => { }} />
            </Route>
            <Route path="/register">
              <RegistrationForm showError={updateErrorMessage}/>
            </Route>


            <Route path="/home">
              <Home/>
            </Route>
              <Route path="/createOrganization">
                <CreateOrganization showError={updateErrorMessage}/>
              </Route>

              <Route path="/orgList">
                <OrganizationList/>
              </Route>

              <Route path="/createElection">
                <ElectionForm/>
              </Route>

              <Route path="/electionResults">
                <ElectionResults/>
              </Route>
          </Switch>

          <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage} />
        </div>
      </div>
    </Router>
  );
}

export default App;
