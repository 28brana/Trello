describe('User Registration', () => {
  beforeEach(() => {
    cy.visit('/auth/register');
  });

  it('shows validation errors for empty fields', () => {
    cy.get('[data-cy=register-button]').click();
    cy.contains('Username is required').should('be.visible');
    cy.contains('Email is required').should('be.visible');
    cy.contains('Password is required').should('be.visible');
  });

  it('shows validation error for invalid email', () => {
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="email"]').type('invalidemail');
    cy.get('input[name="password"]').type('123456');
    cy.get('[data-cy=register-button]').click();
    cy.contains('Invalid email').should('exist');
  });

  it('shows validation error for short password', () => {
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('123');
    cy.get('[data-cy=register-button]').click();
    cy.contains('Password must be at least 6 characters').should('exist');
  });

  it('navigates to dashboard on valid submission', () => {
    cy.get('input[name="username"]').type('john');
    cy.get('input[name="email"]').type('john@example.com');
    cy.get('input[name="password"]').type('password123');

    cy.get('[data-cy=register-button]').click();

    cy.location('pathname').should('eq', '/dashboard');
  });
});
