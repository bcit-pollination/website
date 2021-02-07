import './css/App.css';
import Header from './components/Header'
import Button from 'react-bootstrap/Button';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';


function App() {
  return (
    <div className="App">
      <Header className="App-header" onBackClick={() => {console.log("TAKE ME BACK")}}/>
      {/* <RegistrationForm onClick={() => {console.log("onClick passed from App.js")}}/> */}
      <LoginForm onClick={() => {console.log("onClick passed from App.js")}}/>
    </div>
  );
}

export default App;
