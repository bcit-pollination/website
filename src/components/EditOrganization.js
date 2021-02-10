import { useState } from 'react';
import '../css/App.css'
import { withRouter } from "react-router-dom";
import { useForm } from 'react-hook-form';

const EditOrganizationForm = (props) => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        console.log(data);
    };

    const leftForm = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', minHeight: '70vh' }

    const newLine = "\r\n";
    const emailPlaceholderText = "{ " + newLine + "  EMAIL 1: UID," + newLine + "  EMAIL 2: UID," + newLine + "  EMAIL 3: UID," + newLine + "}"
    return (
        <div className="EditOrg-form">
            <div className="card col-12 col-lg-4 mt-2 hv-center" style={leftForm}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2>Edit Organization</h2>
                    <div className="form-group text-left">
                        <label htmlFor="orgName">Name</label>
                        <input type="text"
                            className="form-control"
                            id="orgname"
                            name="orgNAme"
                            placeholder="//TODO ORGANIZATION NAME"
                            ref={register}
                            required="required"
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="emailList">Last Name</label>
                        <textarea type="scrolalbletextbox"
                            className="form-control"
                            cols="1"
                            id="elist"
                            name="emailList"
                            placeholder={emailPlaceholderText}
                            ref={register}
                            rows="10"
                            required="required"
                        />
                    </div>
                    <input type="submit" value="Update" />
                    <br />
                    <br />
                    <input type="submit" value="Cancel" />
                </form>
            </div>
        </div>
    )
}

export default withRouter(EditOrganizationForm);