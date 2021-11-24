import React from 'react';
import Header from './Header.js';
import Show from './Show.js';
import Empty from './Empty.js';
import './styles.scss';

export default function Appointment(props) {
  // console.log('Interviewer Props: ', props.interview.interviewer.name);

  return (
    // <div>
    <article className='appointment'>
      <Header time={props.time}></Header>
      {props.interview ? (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
        ></Show>
      ) : (
        <Empty id={1} time={props.time} />
      )}
    </article>
    // </div>
  );
}
