import '../css/App.css';
import PollinationLogo from './PollinationLogo';
import BackButton from './BackButton';
import { withRouter } from "react-router-dom";

const Header = (props) => {
    // const capitalize = (s) => {
    //     if (typeof s !== 'string') return ''
    //     return s.charAt(0).toUpperCase() + s.slice(1)
    // }
    // let title = capitalize(props.location.pathname.substring(1,props.location.pathname.length))
    // if(props.location.pathname === '/') {
    //     title = 'Welcome'
    // }
    function renderLogout() {
        if(props.location.pathname === '/home'){
            return(
                <div className="">
                    <button className="btn btn-danger" onClick={() => handleLogout()}>Logout</button>
                </div>
            )
        }
    }
    function handleLogout() {
        // localStorage.removeItem(ACCESS_TOKEN_NAME)
        props.history.push('/login')
    }

    return (
        <div>
            <header className={props.className?props.className:'App-header'}>
                <BackButton onClick={props.onBackClick}/>
                <PollinationLogo/>
                {renderLogout()}
            </header>
        </div>
    )
}

export default withRouter(Header);