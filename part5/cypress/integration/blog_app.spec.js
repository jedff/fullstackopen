describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'user',
      password: 'pass'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function() {
    cy.contains('Blogs')
    
  })
  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('Login').click()
      cy.get('[placeholder="Username"]').type('user')
      cy.get('[placeholder="Password"]').type('pass')
      cy.get('#form-login-btn').click()
      cy.contains('Add new blog')
    })

    it('fails with wrong credentials', function() {
      cy.contains('Login').click()
      cy.get('[placeholder="Username"]').type('mluukkai')
      cy.get('[placeholder="Password"]').type('wrong')
      cy.get('#form-login-btn').click()
      cy.get('.error').should('contain', 'Wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('Login').click()
      cy.get('[placeholder="Username"]').type('user')
      cy.get('[placeholder="Password"]').type('pass')
      cy.get('#form-login-btn').click()
    })

    it('A blog can be created', function() {
      cy.contains('Add new blog').click()
      cy.get('[placeholder="Title"]').type('Blog 1')
      cy.get('[placeholder="Author"]').type('User')
      cy.get('[placeholder="URL"]').type('blog.com')
      cy.get('#add-btn').click()
      cy.get('.success').should('contain', 'added')
    })
  })

})