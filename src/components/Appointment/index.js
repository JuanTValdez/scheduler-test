import React from 'react';
import Header from './Header.js';
import Show from './Show.js';
import Empty from './Empty.js';
import './styles.scss';

const appointments = {
  1: {
    id: 1,
    time: '12pm',
  },
  2: {
    id: 2,
    time: '1pm',
    interview: {
      student: 'Lydia Miller-Jones',
      interviewer: {
        id: 3,
        name: 'Sylvia Palmer',
        avatar: 'https://i.imgur.com/LpaY82x.png',
      },
    },
  },
  3: {
    id: 3,
    time: '2pm',
  },
  4: {
    id: 4,
    time: '3pm',
    interview: {
      student: 'Archie Andrews',
      interviewer: {
        id: 4,
        name: 'Cohana Roy',
        avatar: 'https://i.imgur.com/FK8V841.jpg',
      },
    },
  },
  5: {
    id: 5,
    time: '4pm',
  },
};

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
