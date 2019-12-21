# The Task
- Write a simple microservices with CRUD actions to maintain a user-database
- Wildcard (partial) search on mail/names & city
- It must be written in NodeJS and exposing a REST API on OpenAPI 3.0 specification
- The REST API must comply to the Google API Guidelines: https://cloud.google.com/apis/design/
- Use a Mongo database and commit the code to GIT
- Data-model:
    - Email address (required, unique + validated)
    - Password (required, 7 alphanumeric characters and 1 capital letter)
    - First name (required, 25 chars)
    - Last name (required, 25 chars)
    - City (optional, 25 chars)
- Automated tests

# Description
API description is documented in the `swagger.yml`

# Startup

## API
After running ``docker-compose up`` the service will be available on port 8080

## Tests

Test cover the core business-logic component of the service, namely,
user object validation

Run `npm i && npm t`