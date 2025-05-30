describe('CRUD për vullnetarët', () => {
  const vullnetarEmri = 'TestVullnetar';
  const vullnetarMbiemri = 'TestMbiemri';
  const vullnetarEmail = 'testvullnetar@example.com';
  const vullnetarNrTel = '123456789';
  const vullnetarQyteti = 'Prishtine';
  const vullnetarPassword = '123456';

  const vullnetarEmriUpdate = 'TestVullnetarUpdate';

  beforeEach(() => {
    cy.visit('http://localhost:3000/vullnetare');
  });

  it('Shton një vullnetar, modifikon dhe e fshin atë', () => {
    // Shto vullnetarin
    cy.get('input[name="emri"]').type(vullnetarEmri);
    cy.get('input[name="mbiemri"]').type(vullnetarMbiemri);
    cy.get('input[name="email"]').type(vullnetarEmail);
    cy.get('input[name="nrTel"]').type(vullnetarNrTel);
    cy.get('input[name="qyteti"]').type(vullnetarQyteti);
    cy.get('input[name="password"]').type(vullnetarPassword);
    cy.contains('button', 'Create').click();

    // Kontrollo që u shtua
    cy.contains('td', vullnetarEmri, { timeout: 10000 }).should('exist');

    // Modifiko vullnetarin
    cy.contains('td', vullnetarEmri)
      .parent('tr')
      .within(() => {
        cy.get('button.edit-btn').click();
      });

    cy.get('input[name="emri"]').clear().type(vullnetarEmriUpdate);
    cy.get('input[name="password"]').clear().type(vullnetarPassword);
    cy.contains('button', 'Update').click();

    cy.wait(2000);

    // Kontrollo që u përditësua
    cy.contains('td', vullnetarEmriUpdate, { timeout: 10000 }).should('exist');

    // Fshi vullnetarin
    cy.contains('td', vullnetarEmriUpdate)
      .parent('tr')
      .within(() => {
        cy.get('button.delete-btn').click();
      });

    // Kontrollo që u fshi
    cy.contains('td', vullnetarEmriUpdate, { timeout: 10000 }).should('not.exist');
  });
});
