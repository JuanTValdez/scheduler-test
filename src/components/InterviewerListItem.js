import React from 'react';
import classNames from 'classnames';
import './InterviewerListItem.scss';

// const filterInterviewers = function (interviewer) {
//   if (interviewer === 'Sylvia Palmer') {
//     return 'Sylvia Palmer';
//   } else if (interviewer === 'Tori Malcolm') {
//     return 'Tori Malcolm';
//   } else if (interviewer === 'Mildred Nazir') {
//     return 'Mildred Nazir';
//   } else if (interviewer === 'Cohana Roy') {
//     return 'Cohana Roy';
//   } else if (interviewer === 'Sven Jones') {
//     return 'Sven Jones';
//   }
// };

export default function InterviewerListItem(props) {
  const interviewerClass = classNames('interviewers', {
    interviewers__item: props.setInterviewer,
    'interviewers__item--image': props.avatar,
    'interviewers__item--selected': props.selected,
  });
  // console.log('props: ', props);
  return (
    <li
      className={interviewerClass}
      // onClick={props.setInterviewer}
      onClick={() => props.setInterviewer(props.id)}
      selected={props.selected}
    >
      <img
        className='interviewers__item-image'
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
