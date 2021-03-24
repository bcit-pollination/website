import '../css/App.css'
import { 
    withRouter, 
    Switch, 
    Route,
    useRouteMatch
} from "react-router-dom";
import { getReq } from '../utils/customAxiosLib'
import {useState, useEffect} from 'react';
import OrganizationDetails from './OrganizationDetails';


const renderCreateOrgButton = (btnName, onClick) => {
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

const renderTableData = (orgList, redirectToOrganizationDetails) => {
    return orgList.map((org, index) => {
        const {org_id, name, user_org_id} = org;
        return (
        <tr 
        key={org_id}
        onClick={() => {
            redirectToOrganizationDetails(org_id, name);
        }}
        >
            <td>{org_id}</td>
            <td>{name}</td>
            <td>{user_org_id}</td>
        </tr>
        );
    });
}

const renderTableHeader = () => {
    return (
        <tr>
            <th key={0}>ID</th>
            <th key={1}>NAME</th>
            <th key={2}>USER ORG ID</th>
        </tr>
    );
}

const renderUserInfo = (userInfo) => {
    return (
        <div>
            <table id="userInfo">
                <tbody>
                    <tr><td><p>D.O.B: {userInfo.dob}</p></td><td><p>Email: {userInfo.email}</p></td></tr>
                    <tr><td><p>Last Name: {userInfo.last_name}</p></td><td><p>First Name: {userInfo.first_name}</p></td></tr>
                </tbody>
            </table>
        </div>
    );
}

const OrgList = (props) => {

    const redirectToOrganizationDetails = (id, name) => {
        console.log("[ + ] Redirecting to view details of " + name);
        props.history.push(`/orgList/orgDetails/${id}`);
    }

    const redirectToCreateOrg = () => {
        console.log("[ + ] Redirecting to create org page.");
        props.history.push('/createOrganization');
    }

    let { path } = useRouteMatch();

    const [listState , setState] = useState([    {
            org_id: 0,
            name: "",
            user_org_id: "",
        },
    ])

    const [userInfo, setUserInfo] = useState({
        dob:'',
        email:"",
        first_name:"",
        last_name:""
    });

    useEffect(()=>{
        getReq('/user')
        .then(response => {
            if (response.status === 200) {
                console.log("Recv /user !!!")
                console.log(response.data);
                setUserInfo(response.data);
            }
        })
        .catch(error => {
            console.log("Get /user");
            console.log(error)
        });
        getReq('/org/list')
        .then(response => {
            if (response.status === 200) {
                console.log("Recv /org/list !!!")
                console.log(response.data.orgs);
                setState(response.data.orgs);
            }
        })
        .catch(error => {
            console.log("Get /org/list failed: ");
            console.log(error);
        });
    }, []);


    return (
    <div>
        <Switch>
            <Route exact path={path}>
            <h2 className='title'>User's information</h2>
            {renderUserInfo(userInfo)}
            <h2 className='title'>Organization List</h2>
                <table id='org'>
                    <tbody>
                        {renderTableHeader()}
                        {renderTableData(listState, redirectToOrganizationDetails)}
                    </tbody>
                </table>
                {renderCreateOrgButton("Create Organization", () => {redirectToCreateOrg()})}
            </Route>
            <Route path={`/orgList/orgDetails/:orgId`}>
                <OrganizationDetails />
            </Route>
        </Switch>
    </div>
    );
}

export default withRouter(OrgList);