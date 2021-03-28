import '../css/App.css'
import { 
    withRouter, 
    useParams
} from "react-router-dom";
import { getReq } from '../utils/customAxiosLib'
import { useState, useEffect} from 'react';

const ElectionResults = (props) => {
    const [listState, setState] = useState();
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
        <>
        </>
    );
}
export default withRouter(ElectionResults);