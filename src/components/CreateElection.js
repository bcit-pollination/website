import React, { useState } from "react";
import "../css/App.css";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers';
import { withRouter } from "react-router-dom";

import * as Yup from "yup";

import ReactDatePicker from "react-datepicker";

function ElectionForm() {
  // functions to build form returned by useForm() hook
  const { register, handleSubmit, reset, errors, watch, control } = useForm({
    // resolver: yupResolver(validationSchema)w
  });

  // watch to enable re-render when ticket number is changed
  const watchNumberOfQuestions = watch("numberOfQuestions");

  // return array of question indexes for rendering dynamic forms in the template
  function questionNumbers() {
    return [...Array(parseInt(watchNumberOfQuestions || 0)).keys()];
  }

  // watch to enable re-render when ticket number is changed
  const watchNumberOfFields = watch("numberOfFields");

  function numberOfFields() {
    return [...Array(parseInt(watchNumberOfFields || 0)).keys()];
  }

  function onSubmit(data) {
    // display form data on success

    console.log(JSON.stringify(data, null, 4));
    alert("SUCCESS!! :-)\n\n" + JSON.stringify(data, null, 4));
  }

  const DropdownSelection = props => {
    return (
      <>
        <label>{props.label}</label>
        <select
          name={props.name}
          ref={register}
          className={`form-control ${
            errors.numberOfQuestions ? "is-invalid" : ""
          }`}
        >
          {props.list.map(i => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </>
    );
  };

  const Test = () => {
    return <h1>HIELO</h1>;
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
      <div className="card m-3">
        <h5 className="card-header">Election Creation Page</h5>

        <div className="card-body border-bottom">
          <div className="form-row">
            <div className="form-group">
              {/* <label>Number of Questions</label>
              <select
                name="numberOfQuestions"
                ref={register}
                className={`form-control ${
                  errors.numberOfQuestions ? "is-invalid" : ""
                }`}
              >
                {["", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
              <label>Number of Fields Per Question</label>
              <select
                name="numberOfFields"
                ref={register}
                className={`form-control ${
                  errors.numberOfQuestions ? "is-invalid" : ""
                }`}
              >
                {["", 1, 2, 3, 4].map(i => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">
                {errors.numberOfQuestions?.message}
              </div> */}

              <DropdownSelection
                label="Number of Questions"
                name="numberOfQuestions"
                list={["", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              />
              <DropdownSelection
                label="Number of Fields Per Question"
                name="numberOfFields"
                list={[1, 2, 3, 4]}
              />
              <DropdownSelection
                label="Type of Election"
                name="typeElection"
                list={["Public", "Private"]}
              />
            </div>
          </div>

          <div className="card-body border-bottom">
            <div className="form-row">
              <div className="form-group">
                <label>Start Date</label>
                <Controller
                  name={"startDate"}
                  control={control}
                  render={({ onChange, value }) => (
                    <ReactDatePicker
                      selected={value}
                      onChange={onChange}
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      showTimeSelect
                    />
                  )}
                />
                <label>End Date</label>
                <Controller
                  name={"endDate"}
                  control={control}
                  render={({ onChange, value }) => (
                    <ReactDatePicker
                      selected={value}
                      onChange={onChange}
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      showTimeSelect
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        {questionNumbers().map(i => (
          <div key={i} className="list-group list-group-flush">
            <div className="list-group-item">
              <h5 className="card-title"> {i + 1} </h5>
              <div className="form-row">
                <div className="form-group col-6">
                  <label>Question {i + 1}</label>
                  <input
                    name={`questions.[${i}]_question.question`}
                    ref={register}
                    type="text"
                    className={`form-control ${
                      errors.questions?.[i]?.question ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.questions?.[i]?.question?.message}
                  </div>
                </div>
                <div className="form-col col-6">
                  {numberOfFields().map(j => (
                    <div className="">
                      <label>Field {j + 1}</label>
                      <input
                        name={`questions.[${i}]_question.fields[${j}]`}
                        ref={register}
                        type="text"
                        className={`form-control ${
                          errors.questions?.[i]?.field ? "is-invalid" : ""
                        }`}
                      />
                      <div className="invalid-feedback">
                        {errors.questions?.[i]?.field?.message}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="card-footer text-center border-top-0">
          <button type="submit" className="btn btn-primary mr-1">
            Submit
          </button>
          <button className="btn btn-secondary mr-1" type="reset">
            Reset
          </button>
        </div>
      </div>
    </form>
  );
}

<<<<<<< HEAD
export default ElectionForm;
=======

export default withRouter(ElectionForm);
>>>>>>> 53fd6fd243fe3584bfc02181eca59138c77bad08
