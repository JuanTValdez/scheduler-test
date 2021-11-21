import React, { useState } from 'react';
import 'components/Application.scss';
import DayList from './DayList.js';

import InterviewerList from './InterviewerList.js';
import Appointment from './Appointment/index.js';
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
const days = [
  {
    id: 1,
    name: 'Monday',
    spots: 2,
  },
  {
    id: 2,
    name: 'Tuesday',
    spots: 5,
  },
  {
    id: 3,
    name: 'Wednesday',
    spots: 0,
  },
];

// const appointment = Object.values(appointments).map();

// console.log('Appointment Array: ' + appointment);
export default function Application(props) {
  const [day, setDay] = useState('Monday');

  const changeDay = function (newDay) {
    if (day === 'Monday') {
      setDay(newDay);
    } else if (day === 'Tuesday') {
      setDay(newDay);
    } else if (day === 'Wednesday') {
      setDay(newDay);
    }
  };

  return (
    <main className='layout'>
      <section className='sidebar'>
        <img
          className='sidebar--centered'
          src='images/logo.png'
          alt='Interview Scheduler'
        />
        <hr className='sidebar__separator sidebar--centered' />
        <nav className='sidebar__menu'>
          <DayList
            days={days}
            value={day}
            onChange={(day) => {
              changeDay(day);
            }}
            // setDay={(day) => {
            //   changeDay(day);
            // }}
          />
        </nav>
        <img
          className='sidebar__lhl sidebar--centered'
          src='images/lhl.png'
          alt='Lighthouse Labs'
        />
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
      </section>
      <section className='schedule'>
        {Object.values(appointments).map((appointment) => {
          return (
            <Appointment
              key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              interview={appointment.interview}
            />
          );
          return <Appointment key='last' time='5pm' />;
        })}
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
