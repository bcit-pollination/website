import {useState} from 'react';
import '../css/App.css'


const RegistrationForm = (props) => {
    const [state , setState] = useState({
        email : "",
        password : "",
        // confirmPassword: "",
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const sendDetailsToServer = () => {
        console.log("Sending Registration Info to server");
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(state.password.length > 0 && state.email.length > 0) {
            sendDetailsToServer()    
        } else {
            console.log('Please enter Email AND Password');
        }
    }

    const centerForm = {position:'absolute', top:'50%', left:'50%', transform: 'translate(-50%, -50%)', minHeight:'70vh' }
    
    return (
        <div className="Auth-form">
            <div className="card col-12 col-lg-4 mt-2 hv-center" style={centerForm}>
                <form>
                    <h2>Register</h2>
                    <div className="form-group text-left">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" 
                            className="form-control" 
                            id="fname" 
                            placeholder="First Name"
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" 
                            className="form-control" 
                            id="lname" 
                            placeholder="Last Name"
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="iputEmail1">Email address</label>
                        <input type="email" 
                            className="form-control" 
                            id="email" 
                            aria-describedby="emailHelp" 
                            placeholder="Enter email"
                            value={state.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="inputPassword1">Password</label>
                        <input type="password" 
                            className="form-control" 
                            id="password" 
                            placeholder="Password"
                            value={state.password}
                            onChange={handleChange}
                        />
                    </div>
                    {/* <div className="form-group text-left">
                        <label htmlFor="inputPassword1">Confirm Password</label>
                        <input type="password" 
                            className="form-control" 
                            id="confirmPassword" 
                            placeholder="Confirm Password"
                            value={state.confirmPassword}
                            onChange={handleChange}
                        />
                    </div> */}
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        onClick={handleSubmitClick}
                    >
                        Register
                    </button>
                    <div className="mt-2">
                        <span>Already have an account? </span>
                        <span style={{color: '#007bff', fontWeight: 'bold', cursor: 'pointer' }} 
                        onClick={() => console.log('To login')}>Login here</span> 
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegistrationForm;