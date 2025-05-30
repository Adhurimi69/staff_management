describe('CRUD për mentorët', () => {
  const mentorEmri = 'TestMentor';
  const mentorMbiemri = 'TestMbiemri';
  const mentorEmail = 'testmentor@example.com';
  const mentorNrTel = '123456789';
  const mentorQyteti = 'Tirane';
  const mentorPassword = 'Mentor123';

  const mentorEmriUpdate = 'TestMentorUpdate';

  beforeEach(() => {
    cy.visit('http://localhost:3000/mentors');
  });

  it('Shton një mentor, modifikon dhe e fshin atë', () => {
    // Shto mentorin
    cy.get('input[name="emri"]').clear().type(mentorEmri);
    cy.get('input[name="mbiemri"]').clear().type(mentorMbiemri);
    cy.get('input[name="email"]').clear().type(mentorEmail);
    cy.get('input[name="nrTel"]').clear().type(mentorNrTel);
    cy.get('input[name="qyteti"]').clear().type(mentorQyteti);
    cy.get('input[name="password"]').clear().type(mentorPassword);
    cy.contains('button', 'Create').click();

    // Kontrollo që u shtua (në tabelë)
    cy.contains('td', mentorEmri, { timeout: 10000 }).should('exist');

    // Modifiko mentorin
    cy.contains('td', mentorEmri)
      .parent('tr')
      .within(() => {
        cy.get('button.edit-btn').click();
      });

    // Ndrysho emrin dhe passwordin (required)
    cy.get('input[name="emri"]').clear().type(mentorEmriUpdate);
    cy.get('input[name="password"]').clear().type(mentorPassword);
    cy.contains('button', 'Update').click();

    // Prisni pak që të rifreskohet lista
    cy.wait(2000);

    // Kontrollo që emri është përditësuar në tabelë
    cy.contains('td', mentorEmriUpdate, { timeout: 10000 }).should('exist');

    // Fshi mentorin
    cy.contains('td', mentorEmriUpdate)
      .parent('tr')
      .within(() => {
        cy.get('button.delete-btn').click();
      });

    // Modal konfirmimi duhet të shfaqet
    cy.get('.modal-overlay').should('be.visible');
    cy.contains('button', 'Po, fshije').click();

    // Kontrollo që u fshi (nuk duhet të ekzistojë më)
    cy.contains('td', mentorEmriUpdate, { timeout: 10000 }).should('not.exist');
  });
});
