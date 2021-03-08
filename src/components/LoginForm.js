import {getReq} from '../utils/customAxiosLib'
import {useState} from 'react';
import '../css/App.css'
import { withRouter } from "react-router-dom";
import { useForm } from 'react-hook-form';


const LoginForm = (props) => {
    const minPass = 8;
    const { register, handleSubmit, errors } = useForm();
    
    // const authenticateUser = data => {

    // }
    const onSubmit = data => {
        console.log("Data to be sent to server:")
        console.log(data);
        getReq('/user')
            .then(response => {
                console.log("Recv Verification from server.")
                console.log(response);
            })
            .catch(error => {
                console.log("getReq failed: ");
                console.log(error);
            })

        redirectToHome();
    };

    const [state , setState] = useState({
        loginEmail : "",
        loginPassword : "",
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
                            id="loginEmail"
                            name="loginEmail"
                            aria-describedby="emailHelp" 
                            placeholder="Enter email"
                            value={state.loginEmail}
                            onChange={handleChange}
                            ref={register({required: true})}
                        />
                    </div>
                    
                    <div className="form-group text-left">
                        <label htmlFor="inputPassword1">Password</label>
                        <input type="password" 
                            className="form-control" 
                            id="loginPassword" 
                            name="loginPassword"
                            placeholder="Password"
                            value={state.loginPassword}
                            onChange={handleChange}
                            ref={register({ required: true, minLength: minPass})}
                        />
                        {errors.loginPassword && <p>This field is required. Min length: {minPass}</p>}
                    </div>

                    <input type="submit" value="Login"/>
                    
                    <div className="mt-2">
                        <span>Don't have an account? </span>
                        <span style={{color: '#007bff', fontWeight: 'bold', cursor: 'pointer' }} 
                        onClick={() => {console.log('Going to registration page');redirectToRegister();}}>Register here</span> 
                    </div>
                </form>
            </div>
        </div>
    )
}

export default withRouter(LoginForm);