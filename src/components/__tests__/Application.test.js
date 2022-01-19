import React from 'react';
import axios from 'axios';
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
  queryByAltText,
  getByDisplayValue,
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
    // console.log(prettyDOM(day));
  });

  ///////// Next Test

  it('loads data, cancels an interview and increases the spots remaining for Monday by 1', async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, 'Archie Cohen'));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(
      container,
      'appointment'
    ).find((appointment) => queryByText(appointment, 'Archie Cohen'));

    fireEvent.click(queryByAltText(appointment, 'Delete'));

    // 4. Check that the confirmation message is shown.

    expect(
      getByText(appointment, 'Are you sure you would like to delete?')
    ).toBeInTheDocument();
    // 5. Click the "Confirm" button on the confirmation.

    fireEvent.click(queryByText(appointment, 'Confirm'));
    // 6. Check that the element with the text "Deleting" is displayed.

    expect(getByText(appointment, 'Deleting')).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.

    await waitForElement(() => getByAltText(appointment, 'Add'));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".

    const day = getAllByTestId(container, 'day').find((day) =>
      queryByText(day, 'Monday')
    );

    expect(getByText(day, '2 spots remaining')).toBeInTheDocument();

    // debug();
  });

  it('loads data, edits an interview and keeps the spots remaining for Monday the same', async () => {
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointment = getAllByTestId(
      container,
      'appointment'
    ).find((appointment) => queryByText(appointment, 'Archie Cohen'));

    expect(queryByText(appointment, 'Archie Cohen'));
    expect(queryByText(appointment, 'Edit'));
    fireEvent.click(queryByAltText(appointment, 'Edit'));

    fireEvent.change(getByDisplayValue(appointment, 'Archie Cohen'), {
      target: { value: 'Lydia Miller-Jones' },
    });
    // fireEvent.click(getByAltText(appointment, 'Lydia Miller-Jones'));

    expect(getByText(appointment, 'Save')).toBeInTheDocument();

    fireEvent.click(getByText(appointment, 'Save'));

    expect(getByText(appointment, 'Saving')).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, 'Lydia Miller-Jones'));

    const day = getAllByTestId(container, 'day').find((day) =>
      queryByText(day, 'Monday')
    );

    // await waitForElement(() => {
    expect(getByText(day, '1 spot remaining')).toBeInTheDocument();
    // });

    // debug();
  });

  it('shows the save error when failing to save an appointment', async () => {
    // const { container, debug } = render(<Application />);
    // await waitForElement(() => getByText(container, 'Archie Cohen'));
    // const appointments = getAllByTestId(container, 'appointment');
    // const appointment = appointments[0];
    // // Finds first appointment slot (empty in this case), and clicks the img with the alt tag "Add".
    // fireEvent.click(getByAltText(appointment, 'Add'));
    // fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    //   target: { value: 'Lydia Miller-Jones' },
    // });
    // fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));
    // fireEvent.click(getByText(appointment, 'Save'));
    // expect(getByText(appointment, 'Saving')).toBeInTheDocument();
    // await axios.put.mockRejectedValueOnce(Promise.reject());
    // // debug();
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
