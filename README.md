# Customer Profile - API
Customer profile dashboard API which is use to serve the data for the [Customer Profile Client App](https://github.com/emmafallancy/customer-profile-client).

## Overview
This API is use for serving as the backend services for [Customer Profile client app](https://github.com/emmafallancy/customer-profile-client). Currently, there is only one service available to be serve. Refer to the list below:
- Customers

Endpoint handler service(s) can be found in the `modules` folder inside `src` folder.

## Endpoints
Available endpoints are as of below:

> GET /v1/customers

_Get all customers._

> GET /v1/customers?term={search}

_Get customer(s) that match with particular search term from the query provided. Any match with customer name or email shall be returned._

> GET /v1/customers/:id

_Get a particular customer based on their UUID._

> POST /v1/customers

_Create customer profile. Should at least contain the name and email of the customer in the body request._

> PUT /v1/customers/:id

_Endpoint for updating customer profile based on their UUID, which should contain their name and email in the body request._

> DEL /v1/customers/:id

_Endpoint for deleting the customer profile based on their UUID._

## Installing dependencies
To run the API, make sure to install the dependencies. To install the dependencies, run the command below:

Using `yarn`:
```sh
yarn install
```

Using `NPM`:
```sh
npm install
```

## Running the application
To run the application, make sure dependencies are already installed. Refer to the section above to install the dependencies.

To run the server in development, run the following command below:

```sh
# yarn
yarn dev

# or if you prefer NPM
npm run dev
```

To run the server in production environment, run the following command:

```sh
# yarn
yarn start

# NPM
npm start
```

By default, the server will run at `http://localhost:4200`. If you prefer to run the server in different port, set the `PORT` value in the environment.

**NOTE**: For simplicity, data (to simulate as DB) is available in `customers.json`, which can be found in `src/data` folder.

## Testing
The test can be run by the referring to the command below.

```sh
# yarn
yarn test
```

```sh
# NPM
npm run test
```
