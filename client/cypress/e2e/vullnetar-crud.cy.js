describe('CRUD për vullnetarët', () => {
  const vullnetarEmri = 'TestVullnetar';
  const vullnetarMbiemri = 'TestMbiemri';
  const vullnetarEmail = 'testvullnetar@example.com';
  const vullnetarNrTel = '123456789';
  const vullnetarQyteti = 'Prishtine';
  const vullnetarPassword = 'vull1';

  const vullnetarEmriUpdate = 'TestVullnetarUpdate';

  beforeEach(() => {
    cy.visit('http://localhost:3000/vullnetare');
  });

  it('Shton një vullnetar, modifikon dhe e fshin atë', () => {
    // Shto vullnetarin
    cy.get('input[name="emri"]').clear().type(vullnetarEmri);
    cy.get('input[name="mbiemri"]').clear().type(vullnetarMbiemri);
    cy.get('input[name="email"]').clear().type(vullnetarEmail);
    cy.get('input[name="nrTel"]').clear().type(vullnetarNrTel);
    cy.get('input[name="qyteti"]').clear().type(vullnetarQyteti);
    cy.get('input[name="password"]').clear().type(vullnetarPassword);
    cy.contains('button', 'Create').click();

    // Kontrollo që u shtua në tabelë
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

    // Pris pak për rifreskimin e listës
    cy.wait(2000);

    // Kontrollo që emri u përditësua në tabelë
    cy.contains('td', vullnetarEmriUpdate, { timeout: 10000 }).should('exist');

    // Fshi vullnetarin
    cy.contains('td', vullnetarEmriUpdate)
      .parent('tr')
      .within(() => {
        cy.get('button.delete-btn').click();
      });

    // Kontrollo që modal konfirmimi shfaqet dhe klikoni për të konfirmuar fshirjen
    cy.get('.modal-overlay').should('be.visible');
    cy.contains('button', 'Po, fshije').click();

    // Kontrollo që vullnetari u fshi nga tabela
    cy.contains('td', vullnetarEmriUpdate, { timeout: 10000 }).should('not.exist');
  });
});
