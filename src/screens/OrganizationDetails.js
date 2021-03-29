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

const renderButton = (btnName, onClick) => {
    return (
        <>
        <button 
        onClick={onClick}
        name={btnName} 
        value={btnName} 
        type={`button`}
        >{btnName}</button>
        </>
    );
}

const renderTableData = (electionList, redirectToElectionDetails) => {
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

const renderTableHeader = () => {
    return (
        <tr>
            <th key={0}>ID</th>
            <th key={1}>DESCRIPTION</th>
            <th key={2}>START</th>
            <th key={3}>END</th>
        </tr>
    );
}

const OrganizationDetails = (props) => {

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

    const [listState , setState] = useState([    
        {
            election_id: 1,
            election_description: "",
            start_time: "",
            end_time: ""
        },
    ])

    useEffect(()=>{
        getReq(`/org/elections/list?org_id=${orgId}`)
        .then(response => {
            if (response.status === 200) {
                console.log("GOT /org/elections/list !!!")
                setState(response.data.elections);
            }
        })
        .catch(error => {
            console.log("Get /org/elections/list failed: ");
            console.log(error);
        });

        getReq(`/org/users?org_id=${orgId}&min_privilege_level=0`)
        .then(response => {
            if (response.status === 200) {
                console.log("GOT /org/users !!!")
                console.log(response.data.users)
            }
        })
        .catch(error => {
            console.log("Get /org/users failed: ");
            console.log(error);
        });

        getReq('/org/list')
        .then(response => {
            if (response.status === 200) {
                console.log("Recv /org/list !!!")
                setState(response.data.orgs);
            }
        })
        .catch(error => {
            console.log("Get /org/list failed: ");
            console.log(error);
        });
        
    }, [orgId]);

    let { path } = useRouteMatch();

    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
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
            if (response.status === 200) {
                console.log("[User list updated!!!]");
            }
        })
        .catch(error => {
            console.log("User list POST failed: ");
            console.log(error);
        })
    };
    const [userEmail, setUserEmail] = useState("");
    const [userOrgId, setUserOrgId] = useState("");

    return (
    <div>
        <Switch>
            <Route exact path={path}>
                {/* <h1 id='title'>Organization Details</h1> */}
                <h2 className='title'>Organization ID: {orgId}</h2>
                <h3 className='title'>Election List:</h3>
                <table id='org'>
                    <tbody>
                        {renderTableHeader()}
                        {renderTableData(listState, redirectToElectionDetails)}
                    </tbody>
                </table>
                
                {renderButton("Create Election", () => {redirectToCreateElection(orgId)})}
                <br/>
                {/* {renderButton("Edit Organization", () => {redirectToEditOrg()})} */}

                <form id="addUserForm" onSubmit={handleSubmit(onSubmit)}>
                    <h4 className='title'>Invite user to org:</h4>
                    <div className="form-group text-left">
                        <label>User Email:</label>
                        <input
                            type="text"
                            value={userEmail}
                            placeholder="actualEmail@email.com"
                            onChange={e => setUserEmail(e.target.value)}
                            className="form-control"
                            required
                            autoFocus
                        />
                    </div>
                    <div className="form-group text-left">
                        <label>User Org Id:</label>
                        <input
                            type="text"
                            value={userOrgId}
                            placeholder="anything"
                            onChange={e => setUserOrgId(e.target.value)}
                            className="form-control"
                            required
                            autoFocus
                        />
                    </div>
                    <input type="submit" value="Invite" />
                </form>

                <h3 className='title'>User List:</h3>

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