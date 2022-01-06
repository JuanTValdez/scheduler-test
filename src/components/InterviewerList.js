import React, { useState } from 'react';
import InterviewerListItem from './InterviewerListItem.js';
import './InterviewerListItem.scss';

export default function InterviewerList(props) {
  const selected = props.value && props.value.id;

  const interviewers =
    props.interviewers &&
    props.interviewers.map((currentInterviewer) => {
      return (
        <InterviewerListItem
          key={currentInterviewer.id}
          name={currentInterviewer.name}
          avatar={currentInterviewer.avatar}
          selected={currentInterviewer.id === selected}
          setInterviewer={() => props.onChange(currentInterviewer)}
        />
      );
    });

  return (
    <div>
      <section className='interviewers'>
        <h4 className='interviewers__header text--light'>Interviewer</h4>
        <ul className='interviewers__list'>{interviewers}</ul>
      </section>
    </div>
  );
}
