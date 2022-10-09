## Notes

- Users do not have to log in to auth0 manually before visiting supervision.
  It is shown here for simplicity, and the app will ask you to log in when visited.
- Auth0 dependency is intended to be phased out for integration with UoA SAML service.

## SuperVision Roles

SuperVision is designed to function as an educational patient management tool
that allows supervisors to monitor and approve/disapprove of student data entries.

While this functionality has not yet been implemented (as of 2022-10-08), the
separate roles are still present in preparation for the future.

## Auth0

Supervisors also have access to the auth0 management console, where users can be enable/disabled
or created. Creating an entry in auth0 is sufficent for them to gain access to
the application as a **student**.

To assign a user as a **supervisor**, they must be manually added to the auth0 console.
The production database must also be modified to change their role to `supervisor`.
