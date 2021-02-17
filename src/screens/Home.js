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
    const redirectToOrg = () => {
        console.log("Redirecting to organization page.")
        props.history.push('/org');
    }
    const redirectToCreateElection = () => {
        console.log("Redirecting to organization page.")
        props.history.push('/editOrganization');
    }
    const redirectToEditOrg = () => {
        console.log("Redirecting to organization page.")
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
            {/* {redirectToOrg()} */}
            <br/>
            <button name={"Organizations list"} type={`button`} onClick={() => {redirectToOrg()}} >Organizations list</button>
            <br/>
            <button name={"Organizations list"} type={`button`} onClick={() => {redirectToEditOrg()}} >Edit Organization</button>
            <br/>
            <button name={"Organizations list"} type={`button`} onClick={() => {redirectToCreateElection()}} >Create Election</button>
        </div>
    )
}

export default withRouter(Home);