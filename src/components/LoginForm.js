import {postReq} from '../utils/customAxiosLib'
import {useState} from 'react';
import '../css/App.css'
import { withRouter } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { renderButton } from '../utils/utils'



const LoginForm = (props) => {
    const redirectToElectionResults = () => {
        console.log("[ + ] Redirecting to electionResults");
        props.history.push(`/electionResults`);
    }
    sessionStorage.removeItem("jwt");

    const minPass = 8;
    const { register, handleSubmit, errors } = useForm();
    
    const onSubmit = data => {
        postReq('/user/login', {
            "email": data.email,
            "password": data.password,
        })
        .then(response => {
            if (200 <= response.status && response.status < 300) {
                sessionStorage.setItem("jwt", response.data.jwt_token);
                redirectToHome();
            } else {
                console.log("login failed! " + response);
                setLoginError(true);
            }
        })
        .catch(error => {
            console.log("login failed: ");
            console.log(error);
            setLoginError(true);
        })
    };

    const [loginError , setLoginError] = useState(false)

    const [state , setState] = useState({
        email : "",
        password : "",
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
    const redirectToRegister = () => {
        props.history.push('/register'); 
    }

    const centerForm = {position:'absolute', top:'50%', left:'50%', transform: 'translate(-50%, -50%)', minHeight:'50vh' }
    
    return (
        <div className="Auth-form">
            <div className="card col-12 col-lg-4 mt-2 hv-center" style={centerForm}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2>Login</h2>
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
                    <p 
                        style={{
                            display: `${loginError ? "" : "none"}`, 
                            color: "red",
                        }}
                    >There has been an error! Please check your credentials!</p>
                    <input className="button" type="submit" value="Login"/>

                    <div className="mt-2">
                        <span>Don't have an account? </span>
                        <span style={{color: '#007bff', fontWeight: 'bold', cursor: 'pointer' }} 
                        onClick={() => {console.log('Going to registration page');redirectToRegister();}}>Register here</span> 
                    </div>
                    {renderButton("View Public Election Results", () => {redirectToElectionResults()})}
                </form>
            </div>
        </div>
    )
}

export default withRouter(LoginForm);