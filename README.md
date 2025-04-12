# Trello Clone

This project is a clone of Trello with basic task and project management functionality. The application allows users to register, log in, create projects, manage tasks, and use drag-and-drop to move tasks between columns.

## Project Setup

### Prerequisites
1. **Node.js**: Ensure you have Node.js (version >= 14.x.x) installed. You can download it from [here](https://nodejs.org/).
2. **Git**: Ensure Git is installed. If not, you can download it from [here](https://git-scm.com/).

### Steps to Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/28brana/Trello.git
    cd Trello
    ```

2. **Install dependencies**:
    Run the following command to install the necessary packages:
    ```bash
    npm install
    ```

3. **Run the development server**:
    To start the project in development mode, run:
    ```bash
    npm run dev
    ```
    The application will be available at [http://localhost:3000](http://localhost:3000).

4. **Build the project**:
    To build the project for production, run:
    ```bash
    npm run build
    ```

5. **Preview the build**:
    To preview the production build, run:
    ```bash
    npm run preview
    ```

6. **Lint the code**:
    To check for code style and linting issues, run:
    ```bash
    npm run lint
    ```

## Running Tests

1. **Install Cypress** (if not already installed):
    ```bash
    npm install cypress --save-dev
    ```

2. **Open Cypress**:
    Run the following command to open Cypress for running tests:
    ```bash
    npx cypress open
    ```

3. **Run the Tests**:
    The tests will be available in the Cypress Test Runner. You can run the tests for registration, login, logout, project and task creation, task update, and drag-and-drop functionality.

## Test Cases

### 1. **User Registration and Login Flow**

#### Registration Tests
- **Shows validation errors for empty fields**: Ensures that missing fields show appropriate validation errors.
- **Shows validation error for invalid email**: Verifies that invalid email format is caught.
- **Shows validation error for short password**: Ensures password must be at least 6 characters.
- **Navigates to dashboard on valid submission**: Verifies that valid registration credentials redirect to the dashboard.

#### Login Tests
- **Shows validation errors for empty fields**: Ensures that both email and password fields must be filled.
- **Logs in successfully with valid credentials**: Verifies that valid credentials allow the user to log in.

#### Logout Tests
- **Navigates to login on logout**: Verifies that clicking the logout button redirects the user to the login page.

---

### 2. **Project Creation Flow and Task Flow**

#### Project Creation Tests
- **Create a new project and display on dashboard**: Verifies the creation of a project and its appearance on the dashboard.

#### Task Flow Tests
- **Add a new column**: Tests the creation of a new column in a project.
- **Add a new task**: Verifies the addition of a task to a project.
- **Update a task**: Ensures task details (title, description, assignee, date) can be updated.

---

### 3. **Task Drag and Drop Test**

- **Drag task from "To Do" to "Done"**: Verifies the drag-and-drop functionality for tasks between columns, ensuring realistic movement and state updates.

