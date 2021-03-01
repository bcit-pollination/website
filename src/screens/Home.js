import React from 'react';
import { withRouter } from 'react-router-dom';

    // const handleSubmitClick = (e) => {
    //     e.preventDefault();
    //     props.onClick();
    //     console.log("Sending Login Info to server");=
    //     redirectToHome();
    // }


    // const redirectToRegister = () => {
    //     props.history.push('/register'); 
    // } 


function Home(props) {
    const redirectToCreateOrg = () => {
        console.log("Redirecting to create org page.")
        props.history.push('/createOrganization');
    }
    const redirectToOrgList = () => {
        console.log("Redirecting to organizations page.")
        props.history.push('/org');
    }
    const redirectToCreateElection = () => {
        console.log("Redirecting to create election page.")
        props.history.push('/createElection');
    }
    // useEffect(() => {
    //     axios.get(API_BASE_URL+'/user/me', { headers: { 'token': localStorage.getItem(ACCESS_TOKEN_NAME) }})
    //     .then(function (response) {
    //         if(response.status !== 200){
    //           redirectToLogin()
    //         }
    //     })
    //     .catch(function (error) {
    //       redirectToLogin()
    //     });
    //   })
    // function redirectToLogin() {
    //     props.history.push('/login');
    // }
    return(
        <div className="container d-flex align-items-center flex-column">
            <h4>Home page content</h4>
            <br/>
            <button name={"Create Organization"} type={`button`} onClick={() => {redirectToCreateOrg()}} >Create Organization</button>
            <br/>
            <button name={"Organizations list"} type={`button`} onClick={() => {redirectToOrgList()}} >Organizations list</button>
            <br/>
            <button name={"Create Election"} type={`button`} onClick={() => {redirectToCreateElection()}} >Create Election</button>
        </div>
    )
}

export default withRouter(Home);