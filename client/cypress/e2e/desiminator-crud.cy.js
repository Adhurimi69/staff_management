describe('CRUD për desiminatorët', () => {
  const desiminatorEmri = 'TestDesiminator';
  const desiminatorMbiemri = 'TestMbiemri';
  const desiminatorEmail = 'testdesiminator@example.com';
  const desiminatorNrTel = '123456789';
  const desiminatorQyteti = 'Durres';
  const desiminatorPassword = 'Test123';

  const desiminatorEmriUpdate = 'TestDesiminatorUpdate';

  beforeEach(() => {
    cy.visit('http://localhost:3000/desiminators');
  });

  it('Shton një desiminator, modifikon dhe e fshin atë', () => {
    // Shto desiminatorin
    cy.get('input[name="emri"]').clear().type(desiminatorEmri);
    cy.get('input[name="mbiemri"]').clear().type(desiminatorMbiemri);
    cy.get('input[name="email"]').clear().type(desiminatorEmail);
    cy.get('input[name="nrTel"]').clear().type(desiminatorNrTel);
    cy.get('input[name="qyteti"]').clear().type(desiminatorQyteti);
    cy.get('input[name="password"]').clear().type(desiminatorPassword);
    cy.contains('button', 'Create').click();

    // Kontrollo që u shtua (në tabelë)
    cy.contains('td', desiminatorEmri, { timeout: 10000 }).should('exist');

    // Modifiko desiminatorin
    cy.contains('td', desiminatorEmri)
      .parent('tr')
      .within(() => {
        cy.get('button.edit-btn').click();
      });

    // Ndrysho emrin dhe passwordin (required)
    cy.get('input[name="emri"]').clear().type(desiminatorEmriUpdate);
    cy.get('input[name="password"]').clear().type(desiminatorPassword);
    cy.contains('button', 'Update').click();

    // Prisni pak që të rifreskohet lista
    cy.wait(2000);

    // Kontrollo që emri është përditësuar në tabelë
    cy.contains('td', desiminatorEmriUpdate, { timeout: 10000 }).should('exist');

    // Fshi desiminatorin
    cy.contains('td', desiminatorEmriUpdate)
      .parent('tr')
      .within(() => {
        cy.get('button.delete-btn').click();
      });

    // Modal konfirmimi duhet të shfaqet
    cy.get('.modal-overlay').should('be.visible');
    cy.contains('button', 'Po, fshije').click();

    // Kontrollo që u fshi (nuk duhet të ekzistojë më)
    cy.contains('td', desiminatorEmriUpdate, { timeout: 10000 }).should('not.exist');
  });
});
