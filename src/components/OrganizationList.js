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

const renderTableData = (orgList) => {
    return orgList.map((org, index) => {
        const {id, name, admin} = org;
        return (
        <tr 
        key={id} 
        onClick={() => {
            console.log("Viewing elections list for: " + name);
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

const renderTable = (props) => {

    const redirectToEditOrg = () => {
        console.log("Redirecting to edit org page.")
        props.history.push('/editOrganization');
    }

    return (
    <div>
    <h1 id='title'>Organization List</h1>
    <table id='org'>
        <tbody>
            <tr>{renderTableHeader(mylist[0])}</tr>
            {renderTableData(mylist)}
        </tbody>
    </table>
    {renderCreateOrgButton("Create Organization", () => {redirectToEditOrg()})}
    </div>
    );
}

export default withRouter(renderTable);