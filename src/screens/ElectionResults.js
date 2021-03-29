import '../css/App.css'
import { 
    withRouter, 
    Switch, 
    Route,
    useRouteMatch
} from "react-router-dom";
import { getReq } from '../utils/customAxiosLib'
import { useState, useEffect} from 'react';

const renderTableHeader = () => {
    return (
        <tr>
            <th key={0}>ID</th>
            <th key={1}>ELECTION DESCRIPTION</th>
            <th key={2}>START TIME</th>
            <th key={3}>END TIME</th>
            <th key={5}>ORG ID</th>
        </tr>
    );
}

const renderTableData = (electionList) => {
    return electionList.map((election, index) => {
        const {election_description, election_id, end_time,
        start_time, org_id} = election;
        return (
        <tr 
        key={index}
        >
            <td>{election_id}</td>
            <td>{election_description}</td>
            <td>{start_time}</td>
            <td>{end_time}</td>
            <td>{org_id}</td>
        </tr>
        );
    });
}

const ElectionResults = (props) => {
    const [listState, setState] = useState([{
        anonymous : "",
        election_description: "",
        election_id: 0,
        end_time: "",
        start_time: "",
        ord_id: 0
    }]);
    useEffect(() => {
        getReq("/org/elections/public/get/list?page=1&elections_per_page=333").then(response => {
            if (response.status === 200) {
                setState(response.data.elections.filter(election => election.public_results === true))
            }
        })
        .catch(error => {
            console.log(error);
        });
    }, []);
    
    console.log(listState);


    return (
        <div>
            <h2 className='title'>Public Elections List</h2>
            <table id="org">
                <tbody>
                    {renderTableHeader()}
                    {renderTableData(listState)}
                </tbody>
            </table>
        </div>
    );
}
export default withRouter(ElectionResults);