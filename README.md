# Frontend Service for Advanced Roadside Assistance Project

To run, clone this repo.

- npm install
- npm run dev

### Important

To use,

- Create an Account.
- Login
- On dashboard, Click Add Vehicle Info, to create a Vehcile.
- Click `Vehicle Problem` button to Simulate action when there's a breakdown.
- The simulate action
  - sends the error log info to the User Service,
  - the backend logs it by creating a log entry in the DB
  - it then retrieve the Defect Component Status from the Vehicle service.
  - the user service then returns to the frontend service the Emergency contacts and defect component status
