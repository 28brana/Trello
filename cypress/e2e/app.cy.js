const persistedRoot = {
  auth: JSON.stringify({
    user: {
      username: '_bharatrana',
      email: '28brana@gmail.com',
      password:
        'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f',
    },
    isLogin: true,
  }),
  projects: JSON.stringify({ list: [] }),
  _persist: JSON.stringify({ version: -1, rehydrated: true }),
};
describe('User Registration and Login Flow', () => {
  //  Registration Tests
  describe('Registration Form', () => {
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
      cy.contains('Invalid email').should('be.visible');
    });

    it('shows validation error for short password', () => {
      cy.get('input[name="username"]').type('testuser');
      cy.get('input[name="email"]').type('user@example.com');
      cy.get('input[name="password"]').type('123');
      cy.get('[data-cy=register-button]').click();
      cy.contains('Password must be at least 6 characters').should('be.visible');
    });

    it('navigates to dashboard on valid submission', () => {
      cy.get('input[name="username"]').clear().type('john');
      cy.get('input[name="email"]').clear().type('john@example.com');
      cy.get('input[name="password"]').clear().type('password123');
      cy.get('[data-cy=register-button]').click();
      cy.location('pathname').should('eq', '/');
    });
  });

  // 🧪 Login Tests00
  describe('Login Form', () => {
    beforeEach(() => {
      cy.visit('/auth/login');
    });

    it('shows validation errors for empty fields', () => {
      cy.get('[data-cy=login-button]').click();
      cy.contains('Email is required').should('be.visible');
      cy.contains('Password is required').should('be.visible');
    });

    it('logs in successfully with valid credentials', () => {
      window.localStorage.setItem('persist:root', JSON.stringify(persistedRoot));
      cy.get('input[name="email"]').type('28brana@gmail.com');
      cy.get('input[name="password"]').type('12345678');
      cy.get('[data-cy=login-button]').click();
      cy.location('pathname').should('eq', '/');
    });
  });

  // 🧪 Logout Tests
  describe('Logout Flow with Redux Persist', () => {
    beforeEach(() => {
      window.localStorage.setItem('persist:root', JSON.stringify(persistedRoot));
      cy.visit('/');
    });

    it('navigates to login on logout', () => {
      cy.get('[data-cy=logout-button]').click();
      cy.location('pathname').should('eq', '/auth/login');
    });
  });
});
