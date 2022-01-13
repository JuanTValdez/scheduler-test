import React from 'react';

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByTestId,
  getByRole,
  getByText,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
} from '@testing-library/react';

import Application from 'components/Application';

afterEach(cleanup);
describe('Application', () => {
  it('Defaults to Monday and changes the schedule when a new day is selected', () => {
    const { getByText } = render(<Application />);

    // waitForElement returns a promise.
    return waitForElement(() => getByText('Monday')).then(() => {
      fireEvent.click(getByText('Tuesday'));
      expect(getByText('Leopold Silvers')).toBeInTheDocument();
    });
  });

  it('loads data, books an interview and reduces the spots remaining for Monday by 1', async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));
    // returns the DOM output in the entire body of the file with the data-testid of "appointment".
    const appointments = getAllByTestId(container, 'appointment');
    const appointment = appointments[0];

    // Finds first appointment slot (empty in this case), and clicks the img with the alt tag "Add".

    fireEvent.click(getByAltText(appointment, 'Add'));

    // Finds input within the placeholder text of /enter student name/i and changes its input value to "Lydia Miller-Jones".

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: 'Lydia Miller-Jones' },
    });
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

    fireEvent.click(getByText(appointment, 'Save'));
    // debug(appointment);

    expect(getByText(appointment, 'Saving')).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, 'Lydia Miller-Jones'));

    expect(getByText(appointment, 'Lydia Miller-Jones')).toBeInTheDocument();

    // debug(appointment);
    // outputs same as debug()
    // console.log(prettyDOM(appointment));

    const day = getAllByTestId(container, 'day').find((day) =>
      queryByText(day, 'Monday')
    );

    expect(getByText(day, 'no spots remaining')).toBeInTheDocument();
    console.log(prettyDOM(day));
  });
});

/////// ECMAScript 2017 of asynchronous testing ///////

// it('Defaults to Monday and changes the schedule when a new day is selected', () => {
//   const { getByText } = render(<Application />);

//   // waitForElement returns a promise.
//   await waitForElement(() => getByText('Monday'), async() => {
//     fireEvent.click(getByText('Tuesday'));
//     expect(getByText('Leopold Silvers')).toBeInTheDocument();
//   });
// });
