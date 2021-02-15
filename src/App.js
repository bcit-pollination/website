import './css/App.css';
import Header from './components/Header'
// import Button from 'react-bootstrap/Button';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';

import AlertComponent from './components/AlertMessage';  
import Home from './screens/Home';  
import OrganizationList from './components/OrganizationList';

import EditOrganization from './components/EditOrganization';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { useState } from 'react';


function App() {

  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);

  return (
    <Router>
      <div className="App">
        <Header className="App-header" title={title} onBackClick={() => { console.log("TAKE ME BACK") }} />
        {/* <RegistrationForm onClick={() => {console.log("onClick passed from App.js")}}/> */}

        <div className="container d-flex align-items-center flex-column">
          <Switch>
            <Route path="/" exact={true}>
              <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle} />
            </Route>
            <Route path="/register">
              <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle} />
            </Route>
            <Route path="/login">
              <LoginForm showError={updateErrorMessage} updateTitle={updateTitle} onClick={() => { console.log("onClick passed from App.js") }} />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/editOrganization">
              <EditOrganization showError={updateErrorMessage} updateTitle={updateTitle} />
            </Route>
            <Route path="/org">
              <OrganizationList/>
            </Route>
          </Switch>
          <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage} />
        </div>
      </div>
    </Router>
  );
}

export default App;
