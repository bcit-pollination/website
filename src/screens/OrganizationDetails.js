import '../css/App.css'
import { withRouter } from "react-router-dom";

const electionList = [
    {
        id: 1,
        name: "Data Comm Head",
        start: "21-03-01"
    },
    {
        id: 2,
        name: "Term party location",
        start: "21-04-05"
    },
];

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

const renderTableData = (orgList) => {
    return orgList.map((org, index) => {
        const {id, name, start} = org;
        return (
        <tr 
        key={id} 
        onClick={() => {
            console.log("Viewing: " + name);
        }}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{start}</td>
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

const OrganizationDetails = (props) => {

    const redirectToEditOrg = () => {
        console.log("STILL Redirecting to create org page.")
        props.history.push('/createOrganization');
    }

    return (
    <div>
    <h1 id='title'>Organization List</h1>
    <table id='org'>
        <tbody>
            <tr>{renderTableHeader(electionList[0])}</tr>
            {renderTableData(electionList)}
        </tbody>
    </table>
    {renderEditOrgButton("Edit Organization", () => {redirectToEditOrg()})}
    </div>
    );
}

export default withRouter(OrganizationDetails);