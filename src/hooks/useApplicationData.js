import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: '',
    days: [],
    appointments: {},
    interviewers: {},
  });

  const daysApi = `/api/days`;
  const appointmentsApi = `/api/appointments`;
  const interviewerApi = `/api/interviewers`;

  useEffect(() => {
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

  const bookInterview = function (id, interview, newInterview = false) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const newDays = state.days.map((dayObj) => {
      if (dayObj.name == state.day && newInterview === true) {
        return {
          ...dayObj,
          spots: dayObj.spots - 1,
        };
      } else {
        return dayObj;
      }
    });

    const newState = {
      ...state,
      appointments,
      days: newDays,
    };

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then((response) => setState(newState));
  };

  const cancelInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const newDays = state.days.map((dayObj) => {
      if (dayObj.name == state.day) {
        return {
          ...dayObj,
          spots: dayObj.spots + 1,
        };
      } else {
        return dayObj;
      }
    });
    console.log('Days: ', state);

    const newState = {
      ...state,
      appointments,
      days: newDays,
    };

    return axios
      .delete(`/api/appointments/${id}`, appointment)
      .then((response) => setState(newState));
  };

  // ...state contains all keys within the setState object
  const setDay = (day) => setState({ ...state, day });

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
