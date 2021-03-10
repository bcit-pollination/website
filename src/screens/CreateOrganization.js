import '../css/App.css'
import { withRouter } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { postReq } from '../utils/customAxiosLib';

const CreateOrganizationForm = (props) => {

    const { register, handleSubmit } = useForm();

    const redirectToOrgList = () => {
        console.log("[ + ] Redirecting to organizations page.")
        props.history.push('/orgList');
    }

    const onSubmit = data => {
        console.log(data.orgName);

        postReq('/org', {
            "name": data.orgName,
            "user_org_id": data.orgUser_org_id,  // TODO add UI
            "verifier_password": data.orgVerifier_password,  // TODO add UI

        })
        .then(response => {
            if (response.status === 200) {
                console.log("[ORG created!!!]");

                console.log("[Name]: " + data.orgName);
                console.log("[ID]: " + data.orgUser_org_id);
                console.log("[PW]: " + data.orgVerifier_password);
                redirectToOrgList();
            }
        })
        .catch(error => {
            console.log("Create org failed: ");
            console.log(error);
        })

    };

    const newLine = "\r\n";
    const emailPlaceholderText = "{ " + newLine + "  EMAIL 1: UID," + newLine + "  EMAIL 2: UID," + newLine + "  EMAIL 3: UID," + newLine + "}"


    return (
        <div className="col-12 CreateOrg-form">
            <div className={`card col-12 col-lg-12 mt-2 hv-center`} >
                <form onSubmit={handleSubmit(onSubmit)}>

                    <h2>Create Organization</h2>

                    <div className="form-group text-left">
                        <label htmlFor="orgName">Name</label>
                        <input type="text"
                            className="form-control"
                            id="orgName"
                            name="orgName"
                            placeholder="Org Name"
                            ref={register}
                            required="required"
                        />
                    </div>

                    <div className="form-group text-left">
                        <label htmlFor="orgUser_org_id">User Organization ID</label>
                        <input type="text"
                            className="form-control"
                            id="orgUser_org_id"
                            name="orgUser_org_id"
                            placeholder="User Organization ID"
                            ref={register}
                            required="required"
                        />
                    </div>

                    <div className="form-group text-left">
                        <label htmlFor="orgVerifier_password">ID Verifier Password</label>
                        <input type="password"
                            className="form-control"
                            id="orgVerifier_password"
                            name="orgVerifier_password"
                            placeholder="Password"
                            ref={register}
                            required="required"
                        />
                    </div>

                    {/* <div className="form-group text-left">
                        <label htmlFor="emailList">Emails</label>
                        <textarea type="scrolalbletextbox"
                            className="form-control"
                            cols="1"
                            id="emailList"
                            name="emailList"
                            placeholder={emailPlaceholderText}
                            ref={register}
                            rows="10"
                            required="required"
                        />
                    </div> */}

                    <input type="submit" value="Create" />
                    <br />
                    <br />
                    {/* <input type="submit" value="Cancel" /> */}
                </form>
            </div>
        </div>
    )
}

export default withRouter(CreateOrganizationForm);