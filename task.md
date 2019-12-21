- Write a simple microservices with CRUD actions to maintain a user-database
- Wildcard (partial) search on mail/names & city
- It must be written in NodeJS and exposing a REST API on OpenAPI 3.0 specification
- The REST API must comply to the Google API Guidelines: https://cloud.google.com/apis/design/
- Use a Mongo database and commit the code to GIT
- Data-model:
o Email address (required, unique + validated)
o Password (required, 7 alphanumeric characters and 1 capital letter)
o First name (required, 25 chars)
o Last name (required, 25 chars)
o City (optional, 25 chars)
- Automated tests