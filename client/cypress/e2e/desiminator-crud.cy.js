describe('CRUD për desiminatorët', () => {
  const desiminatorEmri = 'TestDesiminator';
  const desiminatorMbiemri = 'TestMbiemri';
  const desiminatorEmail = 'testdesiminator@example.com';
  const desiminatorNrTel = '123456789';
  const desiminatorQyteti = 'Durres';
  const desiminatorPassword = '123456';

  const desiminatorEmriUpdate = 'TestDesiminatorUpdate';

  beforeEach(() => {
    cy.visit('http://localhost:3000/desiminators');
  });

  it('Shton një desiminator, modifikon dhe e fshin atë', () => {
    // Shto desiminatorin
    cy.get('input[name="emri"]').type(desiminatorEmri);
    cy.get('input[name="mbiemri"]').type(desiminatorMbiemri);
    cy.get('input[name="email"]').type(desiminatorEmail);
    cy.get('input[name="nrTel"]').type(desiminatorNrTel);
    cy.get('input[name="qyteti"]').type(desiminatorQyteti);
    cy.get('input[name="password"]').type(desiminatorPassword);
    cy.contains('button', 'Create').click();

    // Kontrollo që u shtua
    cy.contains('td', desiminatorEmri, { timeout: 10000 }).should('exist');

    // Modifiko desiminatorin
    cy.contains('td', desiminatorEmri)
      .parent('tr')
      .within(() => {
        cy.get('button.edit-btn').click();
      });

    cy.get('input[name="emri"]').clear().type(desiminatorEmriUpdate);
    cy.get('input[name="password"]').clear().type(desiminatorPassword);
    cy.contains('button', 'Update').click();

    cy.wait(2000);

    // Kontrollo që u përditësua
    cy.contains('td', desiminatorEmriUpdate, { timeout: 10000 }).should('exist');

    // Fshi desiminatorin
    cy.contains('td', desiminatorEmriUpdate)
      .parent('tr')
      .within(() => {
        cy.get('button.delete-btn').click();
      });

    // Kontrollo që u fshi
    cy.contains('td', desiminatorEmriUpdate, { timeout: 10000 }).should('not.exist');
  });
});