import BackPNG from '../images/back.png';
import '../css/App.css'

const BackButton = 
    ({height, width, margin, onClick}) => {
        
    return (
        <img className="Back-button" 
        style={{width: width, height:height, margin:margin}}               
        src={BackPNG} alt="logo" 
        onClick={onClick}/>
    )
}

export default BackButton;
