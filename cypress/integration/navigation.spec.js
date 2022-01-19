// <reference types='cypress' />;

describe('Navigation', () => {
  it('should visit root', () => {
    // Does not work
    // cy.visit('/');

    // Use this instead. Use port of your client project. The project is scheduler-test

    cy.visit('http://localhost:8001/');
  });

  it(
    'should navigate to Tuesday',
    () => cy.visit('http://localhost:8001/'),
    cy.get('li').contains('Tuesday').click()
  );
});
