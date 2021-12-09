// const state = {
//   days: [
//     {
//       id: 1,
//       name: 'Monday',
//       appointments: [1, 2, 3],
//       interviewers: [1, 2, 2],
//     },
//     {
//       id: 2,
//       name: 'Tuesday',
//       appointments: [4, 5],
//       interviewers: [1, 2],
//     },
//   ],
//   appointments: {
//     1: { id: 1, time: '12pm', interview: null },
//     2: { id: 2, time: '1pm', interview: null },
//     3: {
//       id: 3,
//       time: '2pm',
//       interview: { student: 'Archie Cohen', interviewer: 2 },
//     },
//     4: { id: 4, time: '3pm', interview: null },
//     5: {
//       id: 5,
//       time: '4pm',
//       interview: { student: 'Chad Takahashi', interviewer: 2 },
//     },
//   },
//   interviewers: {
//     1: {
//       id: 1,
//       name: 'Sylvia Palmer',
//       avatar: 'https://i.imgur.com/LpaY82x.png',
//     },
//     2: {
//       id: 2,
//       name: 'Tori Malcolm',
//       avatar: 'https://i.imgur.com/Nmx0Qxo.png',
//     },
//   },
// };

// {
//   "student": "Lydia Miller-Jones",
//   "interviewer": {
//     "id": 1,
//     "name": "Sylvia Palmer",
//     "avatar": "https://i.imgur.com/LpaY82x.png"
//   }
// }

export function getInterview(state, interview) {
  // console.log('int: ', interview.interviewer);
  if (!interview) {
    return null;
  } else {
    return {
      ...interview,
      interviewer: state.interviewers[interview.interviewer],
    };
  }
}

// getInterview(interviewers, days.appointments.interview);

export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(
    (currentDay) => currentDay.name === day
  );

  // Checks if state.days and filteredDays are empty. If so, return empty array

  if (state.days.length === 0 || filteredDays.length === 0) {
    return [];
  }

  // returns appointments object from an id

  const appointments = filteredDays[0].appointments.map((id) => {
    return state.appointments[id];
  });

  return appointments;
}

export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter(
    (currentDay) => currentDay.name === day
  );

  if (state.days.length === 0 || filteredDays.length === 0) {
    return [];
  }

  const interviewers = filteredDays[0].interviewers.map((id) => {
    return state.interviewers[id];
  });

  return interviewers;
}
