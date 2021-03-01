import '../css/App.css'
import { withRouter, useParams } from "react-router-dom";

const electionList = [
    {
        id: 1,
        name: "Data Comm Head",
        start: "21-03-01",
        end: "21-04-01"
    },
    {
        id: 2,
        name: "Term party location",
        start: "21-04-05",
        end: "21-05-01"
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

const renderTableData = (electionList) => {
    return electionList.map((election, index) => {
        const {id, name, start, end} = election;
        return (
        <tr 
        key={id} 
        onClick={() => {
            console.log("Viewing: " + name);
        }}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{start}</td>
            <td>{end}</td>
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

    let { orgId } = useParams();
    console.log("ORG ID: " + orgId);

    const redirectToEditOrg = () => {
        console.log("STILL Redirecting to create org page.")
        props.history.push('/createOrganization');
    }

    return (
    <div>
    <h1 id='title'>Organization Details</h1>
    <h2>{orgId}</h2>
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