import '../css/App.css'
import { withRouter } from "react-router-dom";

const mylist = [
    {
        id: 1,
        name: "Government of Canada",
        admin: "Justin Trudeau"
    },
    {
        id: 2,
        name: "British Columbia Institute of Technology",
        admin: "D'arcy Smith"
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

const renderTableData = (orgList, viewDetails) => {
    return orgList.map((org, index) => {
        const {id, name, admin} = org;
        return (
        <tr 
        key={id} 
        onClick={() => {
            viewDetails(id, name);
        }}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{admin}</td>
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
        props.history.push('/orgDetails');
    }

    const redirectToCreateOrg = () => {
        console.log("Redirecting to create org page.");
        props.history.push('/createOrganization');
    }

    return (
    <div>
    <h1 id='title'>Organization List</h1>
    <table id='org'>
        <tbody>
            <tr>{renderTableHeader(mylist[0])}</tr>
            {renderTableData(mylist, redirectToOrganizationDetails)}
        </tbody>
    </table>
    {renderCreateOrgButton("Create Organization", () => {redirectToCreateOrg()})}
    </div>
    );
}

export default withRouter(OrgList);