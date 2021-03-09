import '../css/App.css'

import { 
    withRouter, 
    Switch, 
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";

import { getReqA } from '../utils/customAxiosLib'

import OrganizationDetails from './OrganizationDetails';

let orgList = [
    {
        id: 1,
        name: "Government of Canada"
    },
    {
        id: 2,
        name: "British Columbia Institute of Technology"
    },
    {
        id: 23,
        name: "PICCCCCCCCCCCCC"
    },
];

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
        const {id, name} = org;
        return (
        <tr 
        key={id} 
        >
            <td>{id}</td>
            <td><Link to={`/orgList/orgDetails/${id}`}>{name}</Link></td>
        </tr>
        );
    });
}

const renderTableHeader = list => {
    let header = Object.keys(list);
    return header.map((key, index) => {
        return <th key={index}>{key.toUpperCase()}</th>
    });
}

const OrgList = (props) => {

    const redirectToOrganizationDetails = (id, name) => {
        console.log("Redirecting to view details of " + name);
        props.history.push(`/orgDetails/${id}`);
    }

    const redirectToCreateOrg = () => {
        console.log("Redirecting to create org page.");
        props.history.push('/createOrganization');
    }

    let { path } = useRouteMatch();

    console.log(path);

    let jwt_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwb2xsaW5hdGlvbi5saXZlIiwiaWF0IjoxNjE1MjAwNzI5LCJleHAiOjE2MjEyMDA3MjksInVpZCI6IjUifQ.R757PBDilIYsmO_UzLo5VpqBq9fyVqaHbyJHzYilzpQ";

    getReqA('/org/list', jwt_token)
    .then(response => {
        if (response.status === 200) {
            console.log("GOT /org/list !!!")
        }
    })
    .catch(error => {
        console.log("Get /org/list failed: ");
        console.log(error);
    });

    return (
    <div>
        <Switch>
            <Route exact path={path}>
            <h1 id='title'>Organization List</h1>
                <table id='org'>
                    <tbody>
                        <tr>{renderTableHeader(orgList[0])}</tr>
                        {renderTableData(orgList, redirectToOrganizationDetails)}
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