# Angular Survey Application

This is a full-featured **Survey Management App** built with **Angular** and **Angular Material**, designed to allow both **Survey Coordinators** and **Survey Respondents** to manage, complete, and review surveys in an interactive and user-friendly interface. The application supports role-based access, graphical results, and fake backend simulation for development purposes.

---

## ✨ Features

### 🧑‍💼 Survey Coordinators (Admin)
- Login access to the admin dashboard.
- Create new surveys with:
  - 1 to 10 single-choice questions.
  - Custom survey title.
- Save or cancel a survey draft.
- View a list of saved surveys.
- Open a survey for responses.
- Close an open survey.
- View results of closed surveys:
  - In both **tabular format** and **interactive charts** .

### 👤 Survey Respondents (Users)
- Can log in to their dashboard.
- Complete only surveys that are currently open.
- Submit answers (must complete all questions).
- Cannot respond to the same survey more than once.
- Cancel a response before submission.
- Automatically uncheck a previous response when selecting another.
- View results of closed surveys:
  - In **tabular format** and **graphical format**.

---

## 🧩 Modularity and Code Structure

The application was developed with a focus on **modular architecture**. Notable patterns include:
- Component-level encapsulation of functionality (`SurveyCardComponent`, `SurveyResultsChartComponent`, etc.)
- Use of Angular Signals for reactive state management in select components.
- Adoption of Reactive Forms for type-safe, scalable, and maintainable form validation logic.
- Centralized and reusable styling via global CSS files:
  - `buttons.css`, `cards.css`, `charts.css`, `typography.css`, etc.
- Consistent UI experience using Angular Material and global styling rules for inputs, cards, and buttons.
- Clearly defined routing structure with guarded routes and role-based access control.
- Unified user feedback system via a custom `DialogSnackbarComponent` for consistent notifications and confirmations.
- Dynamic text handling and potential for multi-language support using centralized `constants.ts`
- Form validation logic designed for progressive feedback and enhanced accessibility (ARIA labels, dynamic focus handling, etc.).

---

## 📊 Graphical Results View
Users can switch between multiple chart types when viewing results:
- Bar Chart
- Pie Chart
- Line Chart
- Doughnut Chart

This feature enhances the visual understanding of survey data and was implemented in a modular way via a reusable `SurveyResultsChartComponent`.

---

## 🧪 Fake Backend API

The application uses [JSON Server](https://www.npmjs.com/package/json-server) to simulate backend APIs for:
- Surveys
- User roles
- Responses

---

## 🛠️ Technologies Used

- **Angular** (CLI, Routing, Signals)
- **Angular Material** (UI Components)
- **RxJS** and Signals (Reactive patterns)
- **JSON Server** (mock API)
- **TypeScript**
- **CSS modular architecture**

---

## 🚀 Getting Started

### Prerequisites
- Node.js (>= 16)
- Angular CLI
- npm

### Installation
```bash
git clone <repo-url>
cd survey_app
npm install
```

### Run the Application
```bash
ng serve
```

### Run the Fake Backend
```bash
npx json-server --watch db.json
```

---

## 📁 Project Structure Highlights

- `src/app/components`: Contains all reusable and feature-specific components.
- `src/assets/styles`: Global stylesheets (`buttons.css`, `cards.css`, `charts.css`, etc.)
- `src/app/services`: API and utility services.
- `src/app/modules`: Modules and primary pages.
- `db.json`: Simulated backend for surveys, users, responses and so on.

---

## 🔐 Authentication & Role Management

While simple in logic (no real backend auth), the app differentiates users by:
- Storing user type (Coordinator or Respondent) on login. (Local Storage)
- Enforcing access restrictions based on role.
