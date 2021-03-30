import {useState} from 'react';
import '../css/App.css'
import { withRouter } from "react-router-dom";
import { useForm } from 'react-hook-form';
// import axios from 'axios';
import {postReq} from '../utils/customAxiosLib'

// const axios = require('axios');

const RegistrationForm = (props) => {
    const minPass = 8;

    const { register, handleSubmit, errors } = useForm();
    
    const onSubmit = (data) => {

        sessionStorage.removeItem("jwt");

        console.log("Data being sent to server:")
        console.log("'dob':'" +data.dob+"'");
        console.log("'email':'"+data.email+"'");
        console.log("'first_name':'"+data.firstName+"'"); 
        console.log("'last_name':'"+data.lastName+"'");
        console.log("'password':'********'")

        postReq('/user', {
            "dob":data.dob,
            "email": data.email,
            "first_name": data.firstName,
            "last_name": data.lastName,
            "password": data.password,
        })
        .then(response => {
            if (200 <= response.status && response.status < 300) {
                sessionStorage.setItem("jwt", response.data.jwt_token);
                setRegisterError(false);
                redirectToHome();
            } else {
                setRegisterError(true);
            }
        })
        .catch(error => {
            console.log("registration failed: ");
            console.log(error);
            setRegisterError(true);
        })
    };

    const [registerError , setRegisterError] = useState(false)

    const [state , setState] = useState({
        dob: "",
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

    const redirectToHome = () => {
        props.history.push('/home');
    }
    const redirectToLogin = () => {
        props.history.push('/login'); 
    }

    const centerForm = {position:'absolute', top:'50%', left:'50%', transform: 'translate(-50%, -50%)', minHeight:'70vh' }
    
    return (
        <div className="Auth-form">
            <div className="card col-12 col-lg-4 mt-2 hv-center" style={centerForm}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2>Register</h2>

                    <div className="form-group text-left">
                        <label htmlFor="date">Date of Birth</label>
                        <input type="date" 
                            className="form-control" 
                            id="dob" 
                            name="dob" 
                            placeholder="Date of Birth"
                            value={state.dob}
                            onChange={handleChange}

                            ref={register}
                            required
                        />
                    </div>

                    <div className="form-group text-left">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" 
                            className="form-control" 
                            id="fname"
                            name="firstName" 
                            placeholder="First Name"
                            onChange={handleChange}

                            ref={register}
                            required
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" 
                            className="form-control" 
                            id="lname" 
                            name="lastName" 
                            placeholder="Last Name"
                            onChange={handleChange}

                            ref={register}
                            required
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="inputEmail1">Email Address</label>
                        <input type="email" 
                            className="form-control" 
                            id="email" 
                            name="email" 
                            aria-describedby="emailHelp" 
                            placeholder="Enter Email"
                            value={state.email}
                            onChange={handleChange}
                            ref={register({required: true})}
                            required
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
                            ref={register({ required: true, minLength: minPass})}
                            required
                        />
                        {errors.password && <p>This field is required. Min length: {minPass}</p>}
                    </div>

                    <p 
                        style={{
                            display: `${registerError ? "" : "none"}`, 
                            color: "red",
                        }}
                    >There has been an error! Your email might have already been registered with us!</p>

                    <input className="button" type="submit" value="Register"/>

                    <div className="mt-2">
                        <span>Already have an account? </span>
                        <span style={{color: '#007bff', fontWeight: 'bold', cursor: 'pointer' }} 
                        onClick={() => {console.log('Going to login page'); redirectToLogin()}}>Login here</span> 
                    </div>
                </form>
            </div>
        </div>
    )
}

export default withRouter(RegistrationForm);