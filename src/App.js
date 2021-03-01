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
import OrganizationList from './components/OrganizationList';
import CreateOrganization from './components/CreateOrganization';
import ElectionForm     from './components/CreateElection';


function App() {

  const [errorMessage, updateErrorMessage] = useState(null);

  return (
    <Router>
      <div className="App">
        <Header className="App-header" onBackClick={() => { console.log("TAKE ME BACK") }} />
        {/* <RegistrationForm onClick={() => {console.log("onClick passed from App.js")}}/> */}

        <div className="container d-flex align-items-center flex-column">
          <Switch>
            <Route path="/" exact={true}>
              <RegistrationForm showError={updateErrorMessage}/>
            </Route>
            <Route path="/register">
              <RegistrationForm showError={updateErrorMessage}/>
            </Route>
            <Route path="/login">
              <LoginForm showError={updateErrorMessage} onClick={() => { console.log("onClick passed from App.js") }} />
            </Route>

            <Route path="/home">
              <Home/>
            </Route>
            <Route path="/createOrganization">
              <CreateOrganization showError={updateErrorMessage}/>
            </Route>
            <Route path="/org">
              <OrganizationList/>
            </Route>
            <Route path="/createElection">
              <ElectionForm/>
            </Route>
          </Switch>

          <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage} />
        </div>
      </div>
    </Router>
  );
}

export default App;
