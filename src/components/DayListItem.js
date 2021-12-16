import React from 'react';
import classNames from 'classnames';
import './DayListItem.scss';

export default function DayListItem(props) {
  const formatSpots = function () {
    if (props.spots === 0) {
      return 'no spots remaining';
    } else if (props.spots === 1) {
      return `${props.spots} remaining`;
    } else if (props.spots === 2) {
      return `${props.spots} remaining`;
    } else if (props.spots === 3) {
      return `${props.spots} remaining`;
    } else if (props.spots === 4) {
      return `${props.spots} remaining`;
    } else if (props.spots === 5) {
      return `${props.spots} remaining`;
    }
  };
  const dayClass = classNames('dayList', {
    'day-list__item': props.setDay,
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0,
  });
  return (
    <li
      className={dayClass}
      onClick={() => props.setDay(props.name)}
      selected={props.selected}
    >
      <h2 className='text--regular'>{props.name}</h2>
      <h3 className='text--light'>{formatSpots(props.spots)}</h3>

      {/* <h3 className='text--light'>{props.formatSpots}</h3> */}
    </li>
  );
}
