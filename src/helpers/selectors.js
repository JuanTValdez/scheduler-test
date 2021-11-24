export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(
    (currentDay) => currentDay.name === day
  );

  // Checked if state.days and filteredDays are empty. If so, return empty array

  if (state.days.length === 0 || filteredDays.length === 0) {
    return [];
  }

  // returns object from an id

  const appointments = filteredDays[0].appointments.map((id) => {
    return state.appointments[id];
  });

  return appointments;
}
console.log(state.days[0].appointments.length);
