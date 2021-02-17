import {useState} from 'react';
import '../css/App.css'
import { withRouter } from "react-router-dom";
import { useForm } from 'react-hook-form';

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

const selections = ["View Elections", "Create Organization"]

const renderButtons = list => {
    // const [active, setActive] = useState(list[0]);

    return list.map(item => {
        return (
            <>
            <button name={item} value={item} type={`button`} onClick={() => console.log("HELP")} >{item}</button>
            </>
        );
    });

}
const renderTableData = list => {
    return list.map((org, index) => {
        const {id, name, admin} = org;
        return (
        <tr key={id}>
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

const renderTable = () => {

    // const redirectToCreateOrg = () => {
    //     console.log("Redirecting to organization creation page.")
    //     props.history.push('/createOrganization');
    // }

    return (
    <div>
    <h1 id='title'>Organization List</h1>
    <table id='org'>
        <tbody>
            <tr>{renderTableHeader(mylist[0])}</tr>
            {renderTableData(mylist)}
        </tbody>
    </table>
    {renderButtons(selections)}
    </div>
    );
}


  

  export default renderTable;