import logo from '../images/logo_pollination.jpg';
import '../css/App.css'

const PollinationLogo = 
    ({height, width, margin}) => {
        
    return (
        
        <img className="App-logo" style={{width: width, height:height, margin:margin}}               
        src={logo} alt="logo"/>
    )
}

export default PollinationLogo;
