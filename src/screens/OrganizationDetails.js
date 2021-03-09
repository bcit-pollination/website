import '../css/App.css'
import { 
    withRouter, 
    Switch, 
    Route,
    useRouteMatch,
    useParams
} from "react-router-dom";
import { getReq } from '../utils/customAxiosLib'
import {useState, useEffect} from 'react';

const renderEditOrgButton = (btnName, onClick) => {
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

const renderTableData = (electionList) => {
    return electionList.map((election, index) => {
        const {election_id, election_description, start_time, end_time} = election;
        return (
        <tr 
        key={election_id} 
        onClick={() => {
            console.log("Viewing: " + election_description);
        }}>
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
            <th key={2}>END</th>
        </tr>
    );
}

const OrganizationDetails = (props) => {

    let { orgId } = useParams();
    console.log("ORG ID: " + orgId);

    const redirectToEditOrg = () => {
        console.log("STILL Redirecting to create org page.")
        props.history.push('/createOrganization');
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
    }, []);


    return (
    <div>
    <h1 id='title'>Organization Details</h1>
    <h2>{orgId}</h2>
    <table id='org'>
        <tbody>
            {renderTableHeader()}
            {renderTableData(listState)}
        </tbody>
    </table>
    {renderEditOrgButton("Edit Organization", () => {redirectToEditOrg()})}
    </div>
    );
}

export default withRouter(OrganizationDetails);