describe('Faqja kryesore e stafit me filtrat', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/staff'); // Rregullo url-në nëse duhet
  });

  it('Duhet të hapet, të ketë titullin dhe të filtrojë me role dhe qytet', () => {
    // Kontrollo titullin e faqes
    cy.title().should('include', 'React App'); // Ndrysho në 'Staff' ose sipas titullit të faqes

    // Kontrollo se titulli në faqe është i pranishëm
    cy.contains('h2', 'Të Gjithë Anëtarët e Staff-it').should('exist');

    // Fillo filtrimin me "Mentor"
    cy.get('select#roleFilter').select('Mentor');
    cy.wait(500); // pak kohë për rifreskim

    // Sigurohu që tabela përmban vetëm rreshta me rol Mentor
    cy.get('tbody tr').each(($row) => {
      cy.wrap($row).find('td').eq(5).should('have.text', 'Mentor');
    });

    // Tani filtro edhe sipas qytetit, zgjidh një nga opsionet në filterin e qytetit
    cy.get('select#qytetiFilter').then(($select) => {
      // Merr vlerën e parë (poshtë 'all') për test
      const firstCity = $select.find('option').not('[value="all"]').first().val();
      if (firstCity) {
        cy.get('select#qytetiFilter').select(firstCity);
        cy.wait(500);

        // Sigurohu që çdo rresht ka rol Mentor dhe qytetin e zgjedhur
        cy.get('tbody tr').each(($row) => {
          cy.wrap($row).find('td').eq(5).should('have.text', 'Mentor');
          cy.wrap($row).find('td').eq(4).should('have.text', firstCity);
        });
      }
    });

    // Pas heqjes së filtrave, shiko që shfaqen të gjithë anëtarët
    cy.get('select#roleFilter').select('all');
    cy.get('select#qytetiFilter').select('all');
    cy.wait(500);

    // Kontrollo që tabela nuk është bosh (mund të ndryshosh në varësi të të dhënave)
    cy.get('tbody tr').should('not.have.length', 0);
  });
});
