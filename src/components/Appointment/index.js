import React from 'react';
import Header from './Header.js';
import Show from './Show.js';
import Empty from './Empty.js';
import Form from './Form.js';
import Status from './Status.js';
import useVisualMode from '../../hooks/useVisualMode.js';
import './styles.scss';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const EDIT = 'EDIT';

export default function Appointment(props) {
  // console.log('Interviewer Props: ', props.interview.interviewer.name);

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  // console.log('Appointment Props: ', props);

  const save = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer: interviewer.id,
    };
    // console.log('Interview: ', interview);
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => transition(SHOW));
  };

  // console.log('Passing Interviewers ', props.interviewers);

  const interviewerList = Object.values(props.interviewers).map(
    (interviewer) => {
      return interviewer;
    }
  );
  console.log('Interview prop: ', props.interview);
  // console.log('Interviewer List:', interviewerList);
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
          // interviewers={[props.interviewers[0]]}
          onChange={() => {}}
          onSave={save}
          onCancel={() => back()}
        />
      )}

      {mode === 'SHOW' && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
        ></Show>
      )}
      {mode === 'EDIT' && (
        <Form
          value={3}
          student='Juan Valdez'
          interviewer={2}
          // interviewers={interviewers}
          // onChange={action('OnChange')}
          onSave={() => {
            save();
          }}
          // onCancel={action('onCancel')}
        />
      )}
      {mode === SAVING && <Status message='Saving' />}
    </article>
    // </div>
  );
}
