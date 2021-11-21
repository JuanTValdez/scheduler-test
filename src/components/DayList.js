import React from 'react';
import DayListItem from './DayListItem.js';

export default function DayList(props) {
  const listOfDays = props.days.map((currentDay) => {
    return (
      <DayListItem
        key={currentDay.id}
        name={currentDay.name}
        spots={currentDay.spots}
        selected={currentDay.name === props.value}
        // setDay={props.setDay}
        setDay={() => props.onChange(currentDay.name)}
      />
    );
  });

  return (
    <div>
      <section>
        <ul>{listOfDays}</ul>
      </section>
    </div>
  );
}
