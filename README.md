# Exhibitor Registration Form

This project implements the Exhibitor Registration Form for an event, where exhibitors can register their colleagues onsite by scanning a QR code and filling out registration details. The form is mobile responsive and interacts with APIs to submit exhibitor data.

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [Third-Party Libraries](#third-party-libraries)
- [Known Limitations or Areas for Improvement](#known-limitations-or-areas-for-improvement)
- [API Endpoints](#api-endpoints)

## Setup Instructions

1. **Clone the repository:**

```bash
git clone git@github.com:hairus0223/challenge-ex.git
```

2. **Navigate to the project folder:**

```bash
cd challenge-ex
```

3. **Install dependencies: Ensure you have Angular CLI installed and then run::**

```bash
yarn install
# or
npm install
```

4. **Run the application: Start the Angular development server:**

```bash
ng serve
```

This will start the application on http://localhost:4200. Open the URL in your browser.

## Third-Party Libraries

- **Angular**: The core framework used to build the application.
  Version: 14 or higher
- **tailwindcss**: A utility-first CSS framework for styling. Used for layout styling, form controls, and UI components.
- **zod**: A TypeScript-first schema validation library.
- **RxJS**: A library for reactive programming used for handling asynchronous data streams.
- **HTML2Canvas**: Used for saving the registration form as an image (to save the generated code).
- **TypeScript**: The language used for development, ensuring type safety and better maintainability.

## Known Limitations or Areas for Improvement

- API Error Handling: Further validation of API responses could be added to handle network or server issues more gracefully.
- Customization: TailwindCSS is used for styling, but custom themes or extended configurations may be necessary for more complex designs.

## API Endpoints

- /exhibitor-company-list: Used to fetch the list of event companies.
- /add-exhibitor: Used to submit exhibitor registration data. The payload structure is as follows:

```bash
{
  "S_added_via": "Web Form",
  "S_company": "Company",
  "S_email_address": "Email_Address",
  "S_group_reg_id": "Random_Five_Letter_Code",
  "S_name_on_badge": "Name_on_Badge",
  "S_job_title": "Job_Title",
  "S_country": "Country",
  "S_company_on_badge": "Company_on_Badge",
  "SB_event_fha": true,  // If FHA-Food & Beverage is selected
  "SB_event_prowine": true // If Prowine Singapore is selected
}
```

- /provinces.json: Provides the list of countries for selection.

**Note:** The API endpoints are CORS-protected and only accept requests from localhost:4200.
