import {useState} from 'react';
import '../css/App.css'
import { withRouter } from "react-router-dom";
import { useForm } from 'react-hook-form';

const RegistrationForm = (props) => {
    const { register, handleSubmit, watch, errors } = useForm();
    
    const onSubmit = data => {
        console.log(data);
    };

    const [state , setState] = useState({
        firstName: "",
        lastName: "",
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
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(state.password.length > 0 && state.email.length > 0) {
            sendDetailsToServer()    
        } else {
            console.log('Please enter Email AND Password');
            props.showError('Please enter Email AND Password')    
        }
    }
    const sendDetailsToServer = () => {
        console.log("Sending Registration Info to server");
        redirectToHome();
    }
    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/home');
    }
    const redirectToLogin = () => {
        props.updateTitle('Login')
        props.history.push('/login'); 
    }

    const centerForm = {position:'absolute', top:'50%', left:'50%', transform: 'translate(-50%, -50%)', minHeight:'70vh' }
    
    return (
        <div className="Auth-form">
            <div className="card col-12 col-lg-4 mt-2 hv-center" style={centerForm}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2>Register</h2>
                    <div className="form-group text-left">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" 
                            className="form-control" 
                            id="fname"
                            name="firstName" 
                            placeholder="First Name"
                            ref={register}
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" 
                            className="form-control" 
                            id="lname" 
                            name="lastName" 
                            placeholder="Last Name"
                            ref={register}
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="inputEmail1">Email address</label>
                        <input type="email" 
                            className="form-control" 
                            id="email" 
                            name="email" 
                            aria-describedby="emailHelp" 
                            placeholder="Enter email"
                            value={state.email}
                            onChange={handleChange}
                            ref={register}
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="inputPassword1">Password</label>
                        <input type="password" 
                            className="form-control" 
                            id="password" 
                            name="password"
                            placeholder="Password"
                            value={state.password}
                            onChange={handleChange}
                            ref={register}
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
                    <input type="submit"/>
                    {/* <button 
                        type="submit" 
                        className="btn btn-primary"
                        onClick={handleSubmitClick}
                    >
                        Register
                    </button> */}
                    <div className="mt-2">
                        <span>Already have an account? </span>
                        <span style={{color: '#007bff', fontWeight: 'bold', cursor: 'pointer' }} 
                        onClick={() => {console.log('To login'); redirectToLogin()}}>Login here</span> 
                    </div>
                </form>
            </div>
        </div>
    )
}

export default withRouter(RegistrationForm);