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
            console.log("BRUH");
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



const OrgList = (props) => {

    const redirectToOrganizationDetails = (id, name) => {
        console.log("Redirecting to view details of " + name);
        props.history.push(`/orgList/orgDetails/${id}`);
    }

    const redirectToCreateOrg = () => {
        console.log("Redirecting to create org page.");
        props.history.push('/createOrganization');
    }

    let { path } = useRouteMatch();

    const [listState , setState] = useState([    {
            org_id: 0,
            name: "",
            user_org_id: "",
        },
    ])

    useEffect(()=>{
        getReq('/org/list')
        .then(response => {
            if (response.status === 200) {
                console.log("GOT /org/list !!!")
                console.log(response.data.orgs[0]);
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
            <h1 id='title'>Organization List</h1>
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