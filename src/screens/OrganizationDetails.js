import '../css/App.css'
import { 
    withRouter, 
    Switch, 
    Route,
    useRouteMatch,
    useParams
} from "react-router-dom";
import { getReq, postReq } from '../utils/customAxiosLib'
import {useState, useEffect} from 'react';
import CreateElection from './CreateElection';
import ElectionDetails from './ElectionDetails';
import { useForm } from 'react-hook-form';
import { renderButton } from '../utils/utils';

const renderElectionTableData = (electionList, redirectToElectionDetails) => {
    return electionList.map((election, index) => {
        const {election_id, election_description, start_time, end_time} = election;
        return (
        <tr 
            key={index} 
            onClick={() => {
                console.log("Viewing: " + election_description);
                redirectToElectionDetails(election_id);
            }}
        >
            <td>{election_id}</td>
            <td>{election_description}</td>
            <td>{start_time}</td>
            <td>{end_time}</td>
        </tr>
        );
    });

}

const renderElectionTableHeader = () => {
    return (
        <tr>
            <th key={0}>ID</th>
            <th key={1}>DESCRIPTION</th>
            <th key={2}>START</th>
            <th key={3}>END</th>
        </tr>
    );
}

const renderUserTableData = (userList) => {
    return userList.map((user, index) => {
        const {email, first_name, last_name, dob, privilege} = user;
        return (
        <tr 
            key={index} 
            onClick={() => {
                console.log("Clicked on: " + user);
            }}
        >
            <td>{email}</td>
            <td>{first_name + " " + last_name}</td>
            <td>{dob}</td>
            <td>{privilege === 4 ? "Owner" : privilege === 3 ? "Admin" : privilege === 2 ? "Member" : ""}</td>
        </tr>
        );
    });

}

const renderUserTableHeader = () => {
    return (
        <tr>
            <th key={0}>Email</th>
            <th key={1}>Full Name</th>
            <th key={2}>DOB</th>
            <th key={3}>Privilege</th>
        </tr>
    );
}

const OrganizationDetails = (props) => {

    let { path } = useRouteMatch();
    let { orgId } = useParams();
    console.log("ORG ID: " + orgId);

    const redirectToEditOrg = () => {
        console.log("[ + ] Redirecting to create org page.")
        props.history.push('/createOrganization');
    }

    const redirectToCreateElection = (id) => {
        console.log("[ + ] Redirecting to create election page.")
        props.history.push(`/orgList/orgDetails/${id}/createElection/${id}`);
    }

    const redirectToElectionDetails = (election_id) => {
        console.log("[ + ] Redirecting to create election page.")
        props.history.push(`/orgList/orgDetails/${orgId}/electionDetails/${election_id}`);
    }

    const [inviteError, setInviteError] = useState(false);
    const [visibleInvitation, setInviVisi] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [userOrgId, setUserOrgId] = useState("");
    const [electionList , setElectionList] = useState([    
        {
            election_id: 1,
            election_description: "",
            start_time: "",
            end_time: ""
        },
    ])
    const [userList , setUserList] = useState([    
        {
            email: "email@email.com",
            first_name: "first",
            last_name: "last",
            privilege: 1,
            user_org_id: "some id",
            dob: "2021-01-01",
            uid: 0
        },
    ])
    const [privilege, setPrivilege] = useState(0);

    useEffect(()=>{
        getReq(`/org/elections/list?org_id=${orgId}`)
        .then(response => {
            if (200 <= response.status && response.status < 300) {
                console.log("GOT /org/elections/list !!!")
                setElectionList(response.data.elections);
            }
        })
        .catch(error => {
            console.log("Get /org/elections/list failed: ");
            console.log(error);
        });

        getReq(`/org/users?org_id=${orgId}&min_privilege_level=0`)
        .then(response => {
            if (200 <= response.status && response.status < 300) {
                console.log("GOT /org/users !!!")
                setUserList(response.data.users)
            }
        })
        .catch(error => {
            console.log("Get /org/users failed: ");
            console.log(error);
        });

        getReq('/org/list')
        .then(response => {
            if (200 <= response.status && response.status < 300) {
                for (let org in response.data.orgs) {
                    if (parseInt(orgId) === response.data.orgs[org].org_id )
                        setPrivilege(response.data.orgs[org].privilege);
                }
                console.log("Recv /org/list and set privilege !!!")
            }
        })
        .catch(error => {
            console.log("Get /org/list failed: ");
            console.log(error);
        });
    }, [orgId]);


    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        postReq('/org/users/invite', {
            "invites": [
                {
                    "email": data.userEmail,
                    "user_org_id": data.userOrgId
                }
            ],
            "org_id": parseInt(orgId)
        })
        .then(response => {
            if (200 <= response.status && response.status < 300) {
                console.log("[User list updated!!!]");
                setUserEmail("")
                setUserOrgId("")
                setInviVisi(!visibleInvitation);
                setInviteError(false);
            } else {
                console.log("[User list NOT UPDATED!!!]");
                setInviteError(true);
            }
        })
        .catch(error => {
            console.log("User list POST failed: ");
            console.log(error);
            setInviteError(true);
        })
    };


    return (
    <div>
        <Switch>
            <Route exact path={path}>
                {/* <h1 id='title'>Organization Details</h1> */}
                <h2 className='title'>Organization ID: {orgId}</h2>
                <h4 className='title'>{privilege === 4 ? "(You are the owner of this organisation)" : privilege === 3 ? "(You are an admin)" : privilege === 2 ? "(You are a member)" : ""}</h4>
                <h3 className='title'>Election List:</h3>
                <table id='org'>
                    <tbody>
                        {renderElectionTableHeader()}
                        {renderElectionTableData(electionList, redirectToElectionDetails)}
                    </tbody>
                </table>
                
                {renderButton("Create Election", () => {redirectToCreateElection(orgId)})}
                <br/>
                {/* {renderButton("Edit Organization", () => {redirectToEditOrg()})} */}

                { privilege > 2 ? <>
                <h3 className='title'>User List:</h3>
                <table id='userList'>
                    <tbody>
                        {renderUserTableHeader()}
                        {renderUserTableData(userList)}
                    </tbody>
                </table>
                <button 
                    onClick={()=>{setInviVisi(!visibleInvitation)}} 
                    style={{display: `${visibleInvitation ? "none" : ""}`}}
                >Add User</button>
                <form id="addUserForm" onSubmit={handleSubmit(onSubmit)} style={{display: `${visibleInvitation ? "" : "none"}`}}>
                    <h4 className='title'>Invite user to org:</h4>
                    <div id="addUserInput">
                    <div className="form-group text-left">
                        <label>User Email:</label>
                        <input
                            type="text"
                            value={userEmail}
                            id="userEmail"
                            name="userEmail"
                            ref={register}
                            placeholder="actualEmail@email.com"
                            onChange={e => setUserEmail(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group text-left">
                        <label>User Org Id:</label>
                        <input
                            type="text"
                            value={userOrgId}
                            id="userOrgId"
                            name="userOrgId"
                            ref={register}
                            placeholder="anything"
                            onChange={e => setUserOrgId(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    </div>
                    <p 
                        style={{
                            display: `${inviteError ? "" : "none"}`, 
                            color: "red",
                        }}
                    >There has been an error! Please check the email address!</p>
                    <input className="button" type="submit" value="Invite" />
                </form> 
                </> : ""}
            </Route>
            <Route path={`/orgList/orgDetails/:orgId/createElection/:orgId`}>
                <CreateElection />
            </Route>
            <Route path={`/orgList/orgDetails/:orgId/electionDetails/:election_id`}>
                <ElectionDetails />
            </Route>
        </Switch>
    </div>
    );
}

export default withRouter(OrganizationDetails);