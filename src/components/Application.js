import React, { useState, useEffect } from 'react';
import 'components/Application.scss';
import DayList from './DayList.js';
import axios from 'axios';
import Appointment from './Appointment/index.js';
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from 'helpers/selectors.js';
import useApplicationData from '../hooks/useApplicationData.js';

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  } = useApplicationData();
  let dailyAppointments = [];
  let dailyInterviewers = [];

  const changeDay = function (newDay) {
    if (state.day === 'Monday') {
      setDay(newDay);
    } else if (state.day === 'Tuesday') {
      setDay(newDay);
    } else if (state.day === 'Wednesday') {
      setDay(newDay);
    } else if (state.day === 'Thursday') {
      setDay(newDay);
    } else if (state.day === 'Friday') {
      setDay(newDay);
    }
  };

  dailyAppointments = getAppointmentsForDay(state, state.day);
  dailyInterviewers = getInterviewersForDay(state, state.day);

  const schedule = Object.values(dailyAppointments).map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

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
            days={state.days}
            value={state.day}
            onChange={(day) => {
              changeDay(day);
            }}
          />
        </nav>
        <img
          className='sidebar__lhl sidebar--centered'
          src='images/lhl.png'
          alt='Lighthouse Labs'
        />
      </section>
      <section className='schedule'>
        {schedule}
        <Appointment key='lastSlot' time='5pm' interviewers='' />
      </section>
    </main>
  );
}
