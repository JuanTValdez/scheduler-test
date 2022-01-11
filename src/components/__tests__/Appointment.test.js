import React from 'react';

import { render, cleanup, fireEvent } from '@testing-library/react';

import Form from 'components/Appointment/Form';
import Application from 'components/Application';
import Appointment from 'components/Appointment/index.js';
/*
  A test that renders a React Component
*/

afterEach(cleanup);

const interviewers = [
  {
    id: 1,
    student: 'Sylvia Palmer',
    avatar: 'https://i.imgur.com/LpaY82x.png',
  },
];

describe('Appointment', () => {
  it('renders without crashing', () => {
    render(
      <Appointment
        // key={interviewers.id}
        // id={interviewers.id}
        interviewers={interviewers}
      />
    );
  });

  it('does something it is supposed to do', () => {
    // ...
  });

  it('does something else it is supposed to do', () => {
    // ...
  });
});
