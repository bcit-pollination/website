import '../css/App.css'
import { 
    withRouter, 
    useParams
} from "react-router-dom";
import { getReq } from '../utils/customAxiosLib'
import { useState, useEffect} from 'react';

const renderButton = (btnName, onClick) => {
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

const renderQuestionTable = (questionList) => {
    return questionList.map((question, index) => {
        const {question_id, question_description, options} = question;
        return (
        <tr
        key={index}
        >
            <td>{question_id}</td>
            <td>{question_description}</td>
            <td className="options">{options.map((option, index) => {
                const {option_description} = option;
                return (
                    <div>
                        {index + 1} : {option_description}<br/>
                    </div>
                )
            })}</td>
        </tr>
        );
    });
}

const ElectionDetails = () => {

    let { election_id } = useParams();
    console.log("Election ID: " + election_id);

    const [electionInfo, setElectionInfo] = useState({
        anonymous: false,
        election_description: "",
        election_id: 0,
        end_time: "",
        org_id: 5,
        public_results: false,
        questions: [],
        start_time: "",
        verified: false
    });

    useEffect(()=>{
        getReq(`/org/elections?election_id=${election_id}`)
        .then(response => {
            if (200 <= response.status && response.status < 300) {
                console.log("GOT /org/elections/list !!!")
                setElectionInfo(response.data);
            }
        })
        .catch(error => {
            console.log("Get /org/elections/list failed: ");
            console.log(error);
        });    
    }, [election_id]);

    return (
    <div>
        <h2 className='title'>{electionInfo.election_description}</h2>
        <table id="infoTable">
            <tbody>
                <tr>
                    <td>election_description:</td>
                    <td>{electionInfo.election_description}</td>
                </tr>
                <tr>
                    <td>Election Id:</td>
                    <td>{electionInfo.election_id}</td>
                </tr>
                <tr>
                    <td>Start Time:</td>
                    <td>{electionInfo.start_time}</td>
                </tr>
                <tr>
                    <td>End Time:</td>
                    <td>{electionInfo.end_time}</td>
                </tr>
                <tr>
                    <td>Org Id:</td>
                    <td>{electionInfo.org_id}</td>
                </tr>
                <tr>
                    <td>Anonymous:</td>
                    <td>{electionInfo.anonymous + ""}</td>
                </tr>
                <tr>
                    <td>Public Results:</td>
                    <td>{electionInfo.public_results + ""}</td>
                </tr>
                <tr>
                    <td>User needs to be verified:</td>
                    <td>{electionInfo.verified + ""}</td>
                </tr>
            </tbody>
        </table>
        <table id="org">
        <tbody>
            <th>Question Id</th>
            <th>Description</th>
            <th>Choices</th>
            {renderQuestionTable(electionInfo.questions)}
        </tbody>
        </table>
        {renderButton("Edit Election", () => {console.log("Switch to edit Election view")})}
    </div>
    );
}

export default withRouter(ElectionDetails);