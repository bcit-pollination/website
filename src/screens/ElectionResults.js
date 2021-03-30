import '../css/App.css'
import { 
    withRouter, 
    Switch, 
    Route,
    useRouteMatch,
    useParams
} from "react-router-dom";
import { getReq } from '../utils/customAxiosLib'
import { useState, useEffect} from 'react';

const ElectionVoteDetails = props => {
    const [electionResults, setElectionResults] = useState({
        "election_info": {
            "anonymous": true,
            "election_description": "test_elec",
            "election_id": 10,
            "end_time": "2024-01-23T04:56:07+00:00",
            "org_id": 10,
            "public_results": true,
            "questions": [
                {
                    "election_id": 10,
                    "max_selection_count": 2,
                    "min_selection_count": 2,
                    "options": [
                        {
                            "option_description": "q1_op1",
                            "option_id": 20,
                            "result": 50.0,
                            "total_votes_for": 8
                        },
                        {
                            "option_description": "q1_op2",
                            "option_id": 21,
                            "result": 50.0,
                            "total_votes_for": 8
                        },
                        {
                            "option_description": "q1_op3",
                            "option_id": 22,
                            "result": 0.0,
                            "total_votes_for": 0
                        }
                    ],
                    "ordered_choices": false,
                    "question_description": "q1",
                    "question_id": 10
                },
                {
                    "election_id": 10,
                    "max_selection_count": 1,
                    "min_selection_count": 1,
                    "options": [
                        {
                            "option_description": "q2_op1",
                            "option_id": 23,
                            "result": 100.0,
                            "total_votes_for": 8
                        },
                        {
                            "option_description": "q2_op2",
                            "option_id": 24,
                            "result": 0.0,
                            "total_votes_for": 0
                        }
                    ],
                    "ordered_choices": false,
                    "question_description": "q2",
                    "question_id": 11
                },
                {
                    "election_id": 10,
                    "max_selection_count": 3,
                    "min_selection_count": 3,
                    "options": [
                        {
                            "option_description": "q3_op1",
                            "option_id": 25,
                            "result": 39.58333333333333,
                            "total_votes_for": 19
                        },
                        {
                            "option_description": "q3_op2",
                            "option_id": 26,
                            "result": 41.66666666666667,
                            "total_votes_for": 20
                        },
                        {
                            "option_description": "q3_op3",
                            "option_id": 27,
                            "result": 18.75,
                            "total_votes_for": 9
                        }
                    ],
                    "ordered_choices": true,
                    "question_description": "q3",
                    "question_id": 12
                }
            ],
            "start_time": "2000-01-23T04:56:07+00:00",
            "verified": true
        },
        "org_info": {
            "name": "yo sooonnn mollit",
            "org_id": 10
        }
    });
    let { election_id } = useParams();
    useEffect(() => {
        getReq(`/org/elections/results?election_id=${election_id}`).then(response => {
            if (response.status === 200) {
                console.log("Got Election");
                setElectionResults(response.data);
            }
        })
        .catch(error => {
            console.log("Failed to get electionResults.");
            console.log(error);
        });
    }, [election_id]);

    return electionResults.election_info.questions.map((question, index) => {
        let rank = 0;
        let last = -1;

        return (
            <div>
                <h2>{question.question_description}</h2>
                <table id="org">
                    <tr>
                        <th key={0}>Rank</th>
                        <th key={1}>Option</th>
                        <th key={2}>Result</th>
                    </tr>
  
                        {question.options.sort((a,b) => (a.result < b.result) ? 1 : -1).map((option, index) => {
                            if (last != option.result) rank++
                            last = option.result;
                            return (
                            <tr>
                            <td>{rank}</td>
                            <td>{option.option_description}</td>
                            <td>{Number.parseFloat(option.result).toPrecision(4)}%</td>
                            </tr>
                            )
                        })}

                </table>
            </div>
        );
    });
}

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

const renderTableData = (electionList, redirectToElectionDetails) => {
    return electionList.map((election, index) => {
        const {election_description, election_id, end_time,
        start_time, org_id} = election;
        return (
        <tr 
        key={index}
        onClick={() => {
            redirectToElectionDetails(election_id, election_description)
        }}
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

    let { path } = useRouteMatch();

    const redirectToElectionDetails = (id, name) => {
        console.log("[ + ] Redirecting to view details of " + name);
        props.history.push(`/electionResults/electionDetails/${id}`);
    }
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
            if (200 <= response.status && response.status < 300) {
                setState(response.data.elections.filter(election => election.public_results === true))
            }
        })
        .catch(error => {
            console.log(error);
        });
    }, []);
    

    return (
        <Switch>
        <Route exact path={path}>
        <div>
            <h2 className='title'>Public Elections List</h2>
            <table id="org">
                <tbody>
                    {renderTableHeader()}
                    {renderTableData(listState, redirectToElectionDetails)}
                </tbody>
            </table>
        </div>   
        </Route>
        <Route path={`/electionResults/electionDetails/:election_id`}>
        <ElectionVoteDetails />
        </Route>
        </Switch>
    );
}
export default withRouter(ElectionResults);