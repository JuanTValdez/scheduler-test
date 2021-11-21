import React, { useState } from 'react';
import InterviewerListItem from './InterviewerListItem.js';
import './InterviewerListItem.scss';

export default function InterviewerList(props) {
  const [selected, setSelected] = useState(props.value);
  const [name, setName] = useState(props.name);

  const setInterviewer = (name, id) => {
    setName(name);
    setSelected(id);
    props.onChange(name, id);
    // I THINK THIS IS THE SPOT I NEED TO FIX
  };

  const interviewers =
    props.interviewers &&
    props.interviewers.map((currentInterviewer) => {
      return (
        <InterviewerListItem
          key={currentInterviewer.id}
          name={currentInterviewer.name}
          avatar={currentInterviewer.avatar}
          selected={currentInterviewer.id === selected}
          setInterviewer={() =>
            setInterviewer(currentInterviewer.name, currentInterviewer.id)
          }
        />
      );
    });

  // console.log('Interviewers: ', interviewers);
  return (
    <div>
      <section className='interviewers'>
        <h4 className='interviewers__header text--light'>Interviewer</h4>
        <ul className='interviewers__list'>{interviewers}</ul>
      </section>
    </div>
  );
}
