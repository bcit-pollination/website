import '../css/App.css';
import PollinationLogo from './PollinationLogo';
import BackButton from './BackButton';

const Header = ({className, onBackClick}) => {
    return (
        <div>
            <header className={className?className:'App-header'}>
                <BackButton onClick={onBackClick}/>
                <PollinationLogo/>
            </header>
        </div>
    )
}

export default Header;