import React, { useState } from 'react';

import InterviewerList from '../InterviewerList.js';
import Button from '../Button.js';

export default function Form(props) {
  const [student, setStudent] = useState(props.student || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || '');
  // console.log('THIS: ' +  interviewer.name)

  const reset = function () {
    setStudent('');
    setInterviewer('');
  };
  const cancel = function () {
    reset();

    props.onCancel();
  };

  // ADD ONSAVE

  // const save = function () {
  //   setInterviewer(interviewer.name);

  //   props.onSave(interviewer.name, interviewer.id);
  // };

  return (
    <main className='appointment__card appointment__card--create'>
      <section className='appointment__card-left'>
        <form onSubmit={(event) => event.preventDefault()} autoComplete='off'>
          <input
            className='appointment__create-input text--semi-bold'
            name='name'
            type='text'
            placeholder='Enter Student Name'
            value={props.student}
            onChange={(event) => setStudent(event.target.value)}
            /*
          This must be a controlled component
          your code goes here
        */
          />
        </form>
        <InterviewerList
          value={interviewer}
          interviewers={props.interviewers}
          onChange={setInterviewer}
          /* your code goes here */
        />
      </section>
      <section className='appointment__card-right'>
        <section className='appointment__actions'>
          <Button
            danger
            onClick={cancel}
            //  your code goes here
          >
            Cancel
          </Button>
          <Button
            // needs to add props.
            confirm
            onClick={() => {
              props.onSave(student, interviewer);
            }}
            // your code goes here
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
