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
        console.log(new Date());


        console.log("Data being sent to server:")
        console.log("'dob':'2021-03-08'");  // TODO: let users add DOB
        console.log("'email':'"+data.email+"'");
        console.log("'first_name':'"+data.firstName+"'"); 
        console.log("'last_name':'"+data.lastName+"'");
        console.log("'password':'********'")


        postReq('http://pollination.live/api/user', {
            "dob":"2021-03-08", // TODO: let users add DOB
            "email": data.email,
            "first_name": data.firstName,
            "last_name": data.lastName,
            "password": data.password,
        })
        .then(response => {
            console.log("Returned:");
            console.log("Response Status:");
            console.log(response.status);
            console.log("Response statusText:");
            console.log(response.statusText);
            console.log("Response headers:");
            console.log(response.headers);
            console.log("Response data:");
            console.log(response.data);
        })
        .catch(error => {console.log("postReq failed: " + error)})

        // getReq('http://pollination.live/api/api/user', {"Authorization":"Bearer "+""})
        //     .then(response => {
        //         console.log("Recv Verification from server.")
        //         console.log(response);
        //     })
        //     .catch(error => {
        //         console.log("getReq failed: ");
        //         console.log(error);
        //     })

        redirectToHome();
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
    // const handleSubmitClick = (e) => {
    //     e.preventDefault();
    //     if(state.password.length > 0 && state.email.length > 0) {
    //         sendDetailsToServer()    
    //     } else {
    //         console.log('Please enter Email AND Password');
    //         props.showError('Please enter Email AND Password')    
    //     }
    // }
    // const sendDetailsToServer = () => {
    //     console.log("Sending Registration Info to server");
    //     redirectToHome();
    // }
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
                            ref={register({required: true})}
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
                        />
                        {errors.password && <p>This field is required. Min length: {minPass}</p>}
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
                        onClick={() => {console.log('Going to login page'); redirectToLogin()}}>Login here</span> 
                    </div>
                </form>
            </div>
        </div>
    )
}

export default withRouter(RegistrationForm);