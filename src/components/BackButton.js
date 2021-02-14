import BackPNG from '../images/back.png';
import '../css/App.css'
import { useHistory } from "react-router-dom";



const BackButton = 
    ({height, width, margin, onClick}) => {

    let history = useHistory();

    return (
        <img className="Back-button" 
        style={{width: width, height:height, margin:margin}}               
        src={BackPNG} alt="logo" 
        onClick={() => {onClick(); history.goBack();}}/>
    )
}

export default BackButton;
