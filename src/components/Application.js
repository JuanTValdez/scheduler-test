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
// import useVisualMode from '../hooks/useVisualMode.js';

// import InterviewerList from './InterviewerList.js';

export default function Application(props) {
  // Setting multiple states into one state.
  // Each key is a different state.
  const [state, setState] = useState({
    day: '',
    days: [],
    appointments: {},
    interviewers: {},
  });
  let dailyAppointments = [];
  let dailyInterviewers = [];

  const bookInterview = function (id, interview) {
    console.log('Book Interview: ', id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const newState = {
      ...state,
      appointments,
    };
    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then((response) => setState(newState));
  };

  const cancelInterview = function (id, interview) {
    console.log('Cancel Interview: ', id, interview);
  };

  // ...state contains all keys within the setState object
  const setDay = (day) => setState({ ...state, day });
  // Since setDays is being used in useEffect, we must use setState((prev) => ({ ...prev, days })) instead of using setState({ ...state, day })
  // const setDays = (days) => setState((prev) => ({ ...prev, days }));

  // http://localhost:8001/api/days isnt required, because localhost is used by default
  const daysApi = `/api/days`;
  const appointmentsApi = `/api/appointments`;
  const interviewerApi = `/api/interviewers`;

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

  useEffect(() => {
    // axios.get(daysApi).then((response) => setDays(response.data));
    Promise.all([
      Promise.resolve(axios.get(daysApi).then((response) => response.data)),
      Promise.resolve(
        axios.get(appointmentsApi).then((response) => response.data)
      ),
      Promise.resolve(
        axios.get(interviewerApi).then((response) => response.data)
      ),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        day: 'Monday',
        days: all[0],
        appointments: all[1],
        interviewers: all[2],
      }));
    });
  }, []);

  dailyAppointments = getAppointmentsForDay(state, state.day);
  dailyInterviewers = getInterviewersForDay(state, state.day);

  // console.log('Daily Interviewers: ', dailyInterviewers);
  // console.log('Daily Appointments: ', dailyAppointments);

  const schedule = Object.values(dailyAppointments).map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    console.log('Int: ', interview);
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
    // return <Appointment key='last' time='5pm' />;
  });
  // console.log('Schedule: ', schedule);

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
      <section className='schedule'>{schedule}</section>
    </main>
  );
}
