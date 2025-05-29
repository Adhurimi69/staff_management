describe('Faqja kryesore e aplikacionit', () => {
  it('Duhet të hapet dhe të ketë titullin e duhur', () => {
    cy.visit('http://localhost:3000')  // ndrysho portin nëse aplikacioni yt hapet në port tjetër
    cy.title().should('include', 'React App') // kontrollon nëse titulli i faqes përmban "Staff"
  })
})
