import React, { useState } from 'react';
import Header from './Header.js';
import Show from './Show.js';
import Empty from './Empty.js';
import Form from './Form.js';
import Status from './Status.js';
import Confirm from './Confirm.js';
import Error from './Error.js';
import useVisualMode from '../../hooks/useVisualMode.js';
import './styles.scss';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const [isNewInterview, setIsNewInterview] = useState(false);

  const deleteAppointment = function () {
    const interview = {
      student: null,
      interviewer: null,
    };

    transition(DELETING, true);
    props
      .cancelInterview(props.id, interview)
      .then(() => transition(EMPTY))
      .catch((err) => {
        transition(ERROR_DELETE, true);
      });
  };

  const save = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer: interviewer.id,
    };

    transition(SAVING);
    props
      .bookInterview(props.id, interview, isNewInterview)
      .then(() => transition(SHOW))
      .catch((err) => {
        transition(ERROR_SAVE, true);
      });
  };

  const interviewerList = Object.values(props.interviewers).map(
    (interviewer) => {
      return interviewer;
    }
  );

  return (
    <article className='appointment'>
      <Header time={props.time}></Header>

      {mode === 'EMPTY' && (
        <Empty
          onAdd={() => {
            transition(CREATE);
            setIsNewInterview(true);
          }}
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
            setIsNewInterview(false);
          }}
          onDelete={() => {
            transition(CONFIRM);
          }}
        ></Show>
      )}
      {mode === 'EDIT' && (
        <Form
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
      {mode === ERROR_SAVE && (
        <Error
          message='Could not save appointment.'
          onClose={() => {
            back();
          }}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error message='Could not delete appointment.' onClose={() => back()} />
      )}
    </article>
  );
}
