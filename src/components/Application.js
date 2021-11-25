import React, { useState, useEffect } from 'react';
import 'components/Application.scss';
import DayList from './DayList.js';
import axios from 'axios';
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

export default function Application(props) {
  // Setting multiple states into one state.
  // Each key is a different state.
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
  });
  // ...state contains all keys within the setState object
  const setDay = (day) => setState({ ...state, day });
  // Since setDays is being used in useEffect, we must use setState((prev) => ({ ...prev, days })) instead of using setState({ ...state, day })
  const setDays = (days) => setState((prev) => ({ ...prev, days }));

  // http://localhost:8001/api/days isnt required, because localhost is used by default
  const url = `/api/days`;

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
    axios.get(url).then((response) => setDays(response.data));
  }, []);

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
          {/* <DayList
            days={days}
            value={day}
            onChange={(day) => {
              changeDay(day);
            }}
           
          /> */}
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
      </section>
    </main>
  );
}

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import 'components/Application.scss';
// import DayList from './DayList.js';

// import InterviewerList from './InterviewerList.js';
// import Appointment from './Appointment/index.js';
// const appointments = {
//   1: {
//     id: 1,
//     time: '12pm',
//   },
//   2: {
//     id: 2,
//     time: '1pm',
//     interview: {
//       student: 'Lydia Miller-Jones',
//       interviewer: {
//         id: 3,
//         name: 'Sylvia Palmer',
//         avatar: 'https://i.imgur.com/LpaY82x.png',
//       },
//     },
//   },
//   3: {
//     id: 3,
//     time: '2pm',
//   },
//   4: {
//     id: 4,
//     time: '3pm',
//     interview: {
//       student: 'Archie Andrews',
//       interviewer: {
//         id: 4,
//         name: 'Cohana Roy',
//         avatar: 'https://i.imgur.com/FK8V841.jpg',
//       },
//     },
//   },
//   5: {
//     id: 5,
//     time: '4pm',
//   },
// };
// const days = [
//   {
//     id: 1,
//     name: 'Monday',
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: 'Tuesday',
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: 'Wednesday',
//     spots: 0,
//   },
// ];

// export default function Application(props) {
//   const [fetchedData, setFetchedData] = useState([]);
//   const [day, setDay] = useState('Monday');

//   const changeDay = function (newDay) {
//     if (day === 'Monday') {
//       setDay(newDay);
//     } else if (day === 'Tuesday') {
//       setDay(newDay);
//     } else if (day === 'Wednesday') {
//       setDay(newDay);
//     }
//   };

//   const url = `http://localhost:8001/api/days`;

//   const fetchApi = async () => {};

// useEffect(() => {
//   axios.get(url).then((response) => {
//     // const apiData = response;

//     // const fetched = apiData.data.map((day) => {
//     //   console.log('New Day: ', day);
//     //   setFetchedData(day);
//     // });

//     // apiData.data.map((day) => {
//     //   console.log('New Day: ', day);
//     // });

//     console.log('Fetched: ', setFetchedData([...response.data.fetchedData]));
//     // console.log('Fetched: ', [fetchedData]);
//     // console.log('Data 2: ', [apiData.data[0]]);
//     // console.log('Days Array: ', days);
//   });
// }, []);

//   return (
//     <main className='layout'>
//       <section className='sidebar'>
//         <img
//           className='sidebar--centered'
//           src='images/logo.png'
//           alt='Interview Scheduler'
//         />
//         <hr className='sidebar__separator sidebar--centered' />
//         <nav className='sidebar__menu'>
//           {/* {apiData.data.map((day) => {
//             console.log('New Day: ', day);
//           })}
//           ; */}
//           <DayList
//             days={days}
//             value={day}
//             //  onChange={(day) => {
//             //    changeDay(day);
//             //   }}
//             // setDay={(day) => {
//             //   changeDay(day);
//             // }}
//           />
//         </nav>
//         <img
//           className='sidebar__lhl sidebar--centered'
//           src='images/lhl.png'
//           alt='Lighthouse Labs'
//         />
//       </section>
//       <section className='schedule'>
//         {Object.values(appointments).map((appointment) => {
//           return (
//             <Appointment
//               key={appointment.id}
//               id={appointment.id}
//               time={appointment.time}
//               interview={appointment.interview}
//             />
//           );
//           return <Appointment key='last' time='5pm' />;
//         })}
//       </section>
//     </main>
//   );
// }

// // import React, { useState, useEffect } from 'react';
// // import 'components/Application.scss';
// // import DayList from './DayList.js';
// // import axios from 'axios';
// // import InterviewerList from './InterviewerList.js';
// // import Appointment from './Appointment/index.js';
// // const appointments = {
// //   1: {
// //     id: 1,
// //     time: '12pm',
// //   },
// //   2: {
// //     id: 2,
// //     time: '1pm',
// //     interview: {
// //       student: 'Lydia Miller-Jones',
// //       interviewer: {
// //         id: 3,
// //         name: 'Sylvia Palmer',
// //         avatar: 'https://i.imgur.com/LpaY82x.png',
// //       },
// //     },
// //   },
// //   3: {
// //     id: 3,
// //     time: '2pm',
// //   },
// //   4: {
// //     id: 4,
// //     time: '3pm',
// //     interview: {
// //       student: 'Archie Andrews',
// //       interviewer: {
// //         id: 4,
// //         name: 'Cohana Roy',
// //         avatar: 'https://i.imgur.com/FK8V841.jpg',
// //       },
// //     },
// //   },
// //   5: {
// //     id: 5,
// //     time: '4pm',
// //   },
// // };

// // // const days = [
// // //   {
// // //     id: 1,
// // //     name: 'Monday',
// // //     spots: 2,
// // //   },
// // //   {
// // //     id: 2,
// // //     name: 'Tuesday',
// // //     spots: 5,
// // //   },
// // //   {
// // //     id: 3,
// // //     name: 'Wednesday',
// // //     spots: 0,
// // //   },
// // // ];

// // export default function Application(props) {
// //   // const [day, setDay] = useState('Monday');
// //   const [days, setDays] = useState([]);

// //   const changeDay = function (newDay) {
// //     if (days === 'Monday') {
// //       setDays(newDay);
// //     } else if (days === 'Tuesday') {
// //       setDays(newDay);
// //     } else if (days === 'Wednesday') {
// //       setDays(newDay);
// //     } else if (days === 'Thursday') {
// //       setDays(newDay);
// //     } else if (days === 'Friday') {
// //       setDays(newDay);
// //     }
// //   };

// // useEffect(() => {
// //   const url = `http://localhost:8001/api/days`;
// //   axios.get(url).then((response) => {
// //     const fetchedResults = response;
// //     // console.log([response.data[0].name]);
// //     setDays([fetchedResults]);
// //     console.log('Days: ' + [days]);
// //     console.log('Fetched Data: ', [fetchedResults]);
// //   });
// // }, []);

// //   const fetchApI = async () => {

// //   }

// //   return (
// //     <main className='layout'>
// //       <section className='sidebar'>
// //         <img
// //           className='sidebar--centered'
// //           src='images/logo.png'
// //           alt='Interview Scheduler'
// //         />
// //         <hr className='sidebar__separator sidebar--centered' />
// //         <nav className='sidebar__menu'>
// //           <DayList
// //             days={days}
// //             value={days}
// //             onChange={(day) => {
// //               changeDay(day);
// //             }}
// //             // setDay={(day) => {
// //             //   changeDay(day);
// //             // }}
// //           />
// //         </nav>
// //         <img
// //           className='sidebar__lhl sidebar--centered'
// //           src='images/lhl.png'
// //           alt='Lighthouse Labs'
// //         />
// //       </section>
// //       <section className='schedule'>
// //         {Object.values(appointments).map((appointment) => {
// //           return (
// //             <Appointment
// //               key={appointment.id}
// //               id={appointment.id}
// //               time={appointment.time}
// //               interview={appointment.interview}
// //             />
// //           );
// //           return <Appointment key='last' time='5pm' />;
// //         })}
// //       </section>
// //     </main>
// //   );
// // }
