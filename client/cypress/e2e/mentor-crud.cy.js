describe('CRUD për mentorët', () => {
  const mentorEmri = 'TestMentor';
  const mentorMbiemri = 'TestMbiemri';
  const mentorEmail = 'testmentor@example.com';
  const mentorNrTel = '123456789';
  const mentorQyteti = 'Tirane';
  const mentorPassword = '123456';

  const mentorEmriUpdate = 'TestMentorUpdate';

  beforeEach(() => {
    cy.visit('http://localhost:3000/mentors');
  });

  it('Shton një mentor, modifikon dhe e fshin atë', () => {
    // Shto mentorin
    cy.get('input[name="emri"]').type(mentorEmri);
    cy.get('input[name="mbiemri"]').type(mentorMbiemri);
    cy.get('input[name="email"]').type(mentorEmail);
    cy.get('input[name="nrTel"]').type(mentorNrTel);
    cy.get('input[name="qyteti"]').type(mentorQyteti);
    cy.get('input[name="password"]').type(mentorPassword);
    cy.contains('button', 'Create').click();

    // Kontrollo që u shtua
    cy.contains('td', mentorEmri, { timeout: 10000 }).should('exist');

    // Modifiko mentorin
    cy.contains('td', mentorEmri)
      .parent('tr')
      .within(() => {
        cy.get('button.edit-btn').click();
      });

    cy.get('input[name="emri"]').clear().type(mentorEmriUpdate);
    cy.get('input[name="password"]').clear().type(mentorPassword);
    cy.contains('button', 'Update').click();

    // Jep pak kohë rifreskimit
    cy.wait(2000);

    // Kontrollo që u përditësua
    cy.contains('td', mentorEmriUpdate, { timeout: 10000 }).should('exist');

    // Fshi mentorin
    cy.contains('td', mentorEmriUpdate)
      .parent('tr')
      .within(() => {
        cy.get('button.delete-btn').click();
      });

    // Kontrollo që u fshi
    cy.contains('td', mentorEmriUpdate, { timeout: 10000 }).should('not.exist');
  });
});
