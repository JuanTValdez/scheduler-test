import React from 'react';
import Header from './Header.js';
import Show from './Show.js';
import Empty from './Empty.js';
import Form from './Form.js';
import Status from './Status.js';
import Confirm from './Confirm.js';
import useVisualMode from '../../hooks/useVisualMode.js';
import './styles.scss';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';

export default function Appointment(props) {
  // console.log('Interviewer Props: ', props.interview.interviewer.name);

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const deleteAppointment = function () {
    const interview = {
      student: null,
      interviewer: null,
    };

    transition(DELETING);
    props.cancelInterview(props.id, interview).then(() => transition(EMPTY));
  };

  const save = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer: interviewer.id,
    };

    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => transition(SHOW));
  };

  const interviewerList = Object.values(props.interviewers).map(
    (interviewer) => {
      return interviewer;
    }
  );

  return (
    // <div>
    <article className='appointment'>
      <Header time={props.time}></Header>

      {mode === 'EMPTY' && (
        <Empty
          // id={1}
          // time={props.time}
          onAdd={() => transition(CREATE)}
        />
      )}

      {mode === 'CREATE' && (
        <Form
          interviewer={[]}
          interviewers={interviewerList}
          onChange={() => {}}
          onSave={save}
          onCancel={() => back()}
        />
      )}

      {mode === 'SHOW' && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => {
            transition(EDIT);
          }}
          onDelete={() => {
            transition(CONFIRM);
          }}
        ></Show>
      )}
      {mode === 'EDIT' && (
        <Form
          // value={props.student}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={interviewerList}
          onChange={() => {}}
          onSave={save}
          onCancel={() => {
            back();
          }}
        />
      )}
      {mode === SAVING && <Status message='Saving' />}

      {mode === CONFIRM && (
        <Confirm
          message='Delete the appointment?'
          onConfirm={() => {
            deleteAppointment();
          }}
          onCancel={() => back()}
        />
      )}

      {mode === DELETING && <Status message='Deleting' />}
    </article>

    // </div>
  );
}
