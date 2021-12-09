# Circulo Patient API

This project is a demo API for a mock healthcare provider that serves veterans
of the US Military.

See https://circulo.michaelphillips.dev for a working demo.

## Configuration

Set the following two environment variables in the `.env` file with the correct
values:

```bash
APP_VA_API_URL=https://sandbox-api.va.gov
APP_VA_API_KEY=va-api-test-key
```

## Start the Server

To start the server locally on port 8080, from within the project root
directory you may run:

```bash
make start
```

See the `Makefile` for other targets like `make test` and `make build`.

## Accessing the GraphQL API

The GraphQL API is located at the `/graphql` route.  If you are running the
project locally, the fully qualified URL should be
http://localhost:8080/graphql.

### Request Data

When executing requests against the API, you may use patient data from any one of
the [Veteran Test Accounts](https://github.com/department-of-veterans-affairs/vets-api-clients/blob/master/test_accounts/verification_test_accounts.md).
