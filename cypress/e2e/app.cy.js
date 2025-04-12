import '@4tw/cypress-drag-drop'

const persistedRoot = {
  auth: JSON.stringify({
    user: {
      username: '_bharatrana',
      email: '28brana@gmail.com',
      password:
        'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a6',
    },
    isLogin: true,
  }),
  projects: JSON.stringify({
    list: [
      {
        id: "0a5e4fd8-d21c-4993-a4d9-74e5b9e1b3ad",
        title: "Test 1",
        description: "Testing of cypress",
        coverImage: "https://picsum.photos/200/300"
      }
    ]
  }),
  _persist: JSON.stringify({ version: -1, rehydrated: true }),
};
// describe('User Registration and Login Flow', () => {
//   //  Registration Tests
//   describe('Registration Form', () => {
//     beforeEach(() => {
//       cy.visit('/auth/register');
//     });

//     it('shows validation errors for empty fields', () => {
//       cy.get('[data-cy=register-button]').click();
//       cy.contains('Username is required').should('be.visible');
//       cy.contains('Email is required').should('be.visible');
//       cy.contains('Password is required').should('be.visible');
//     });

//     it('shows validation error for invalid email', () => {
//       cy.get('input[name="username"]').type('testuser');
//       cy.get('input[name="email"]').type('invalidemail');
//       cy.get('input[name="password"]').type('123456');
//       cy.get('[data-cy=register-button]').click();
//       cy.contains('Invalid email').should('be.visible');
//     });

//     it('shows validation error for short password', () => {
//       cy.get('input[name="username"]').type('testuser');
//       cy.get('input[name="email"]').type('user@example.com');
//       cy.get('input[name="password"]').type('123');
//       cy.get('[data-cy=register-button]').click();
//       cy.contains('Password must be at least 6 characters').should('be.visible');
//     });

//     it('navigates to dashboard on valid submission', () => {
//       cy.get('input[name="username"]').clear().type('john');
//       cy.get('input[name="email"]').clear().type('john@example.com');
//       cy.get('input[name="password"]').clear().type('password123');
//       cy.get('[data-cy=register-button]').click();
//       cy.location('pathname').should('eq', '/');
//     });
//   });

//   //  Login Tests
//   describe('Login Form', () => {
//     beforeEach(() => {
//       cy.visit('/auth/login');
//     });

//     it('shows validation errors for empty fields', () => {
//       cy.get('[data-cy=login-button]').click();
//       cy.contains('Email is required').should('be.visible');
//       cy.contains('Password is required').should('be.visible');
//     });

//     it('logs in successfully with valid credentials', () => {
//       window.localStorage.setItem('persist:root', JSON.stringify(persistedRoot));
//       cy.get('input[name="email"]').type('28brana@gmail.com');
//       cy.get('input[name="password"]').type('12345678');
//       cy.get('[data-cy=login-button]').click();
//     });
//   });

//   //  Logout Tests
//   describe('Logout Flow with Redux Persist', () => {
//     beforeEach(() => {
//       window.localStorage.setItem('persist:root', JSON.stringify(persistedRoot));
//       cy.visit('/');
//     });

//     it('navigates to login on logout', () => {
//       cy.get('[data-cy=logout-button]').click();
//       cy.location('pathname').should('eq', '/auth/login');
//     });
//   });
// });


describe('Project creation flow and task CURD operation', () => {
  describe('Flow to test project creation', () => {
    beforeEach(() => {
      window.localStorage.setItem('persist:root', JSON.stringify(persistedRoot));
      cy.visit('/');
    });

    it('should create a new project and show it on the dashboard', () => {
      cy.get('[data-cy=add-project-button]').click();

      cy.get('input[name=title]').type('Test Project Title');
      cy.get('input[name=description]').type('This is a sample project description');
      cy.get('input[name=coverImage]').type('https://placehold.co/300x200');

      cy.get('[data-cy=add-project-submit]').click();

      cy.contains('Test Project Title').should('be.visible');
      cy.contains('This is a sample project description').should('be.visible');

      cy.get('[data-cy=project-card-0]').should('be.visible').click();

      cy.url().should('include', '/project/');
    });

  })

  describe('Flow to test task creation,updation & column creation', () => {
    beforeEach(() => {
      window.localStorage.setItem('persist:root', JSON.stringify(persistedRoot));
      cy.visit('/');
    });

    const projectUrl = '/project/0a5e4fd8-d21c-4993-a4d9-74e5b9e1b3ad';

    it('for add column', () => {
      cy.visit(projectUrl);

      cy.get('[data-cy=open-add-column]').click();

      cy.get('[data-cy=column-input]')
        .type('Review')

      cy.get('[data-cy=add-column-button]').click();

      cy.contains('Review').should('exist');
    });

    it('for add task', () => {
      cy.visit(projectUrl);

      cy.get('[data-cy=open-add-task]').first().click();

      cy.get('[data-cy=task-input]').type('New Task');

      cy.get('[data-cy=submit-task]').click();

      cy.contains('New Task').should('exist');
    });

    it('for update task', () => {
      cy.visit(projectUrl);

      cy.get('[data-cy=task-card-1]').click();

      cy.get('[data-cy=title]')
        .clear()
        .type('Updated Task Title');

      cy.get('[data-cy=description]')
        .clear()
        .type('Updated Description');

      cy.get('[data-cy=assignedTo]')
        .select('Bharat');

      cy.get('[data-cy=date]')
        .clear()
        .type('2025-04-15');

      cy.get('[data-cy=update-submit-button]').click();

      cy.contains('Updated Task Title').should('exist');
    });
  })

});
