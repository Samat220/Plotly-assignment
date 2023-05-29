<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Assessment Project for Plotly, by Ramazan Samat. I hope this project showcases my fit for Software Engineering position at Plotly! Let's solve new problems and create new tools together!


## Starting the Application

To start this application, follow these steps:

Clone the repository to your local machine.
Make sure you have Node.js installed. You can download it from here.
Navigate to the project root directory in your terminal and run npm install to install all necessary dependencies.
Once all dependencies are installed, run npm start to start the application.
Now, the GraphQL server is up and running. You can visit http://localhost:3000/graphql to explore the GraphQL playground.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## How I Achieved the Requirements

1. Inserting Data to Users and Products Entities

I implemented mutations in GraphQL for creating Users and Products.

For the User entity, I created the createUser mutation that accepts a CreateUserInput object. This object includes properties for the user's name, email, age, and their orders (which is an array of CreateProductInput).

Similarly, for the Product entity, I created the createProduct mutation that accepts a CreateProductInput object. This object includes properties for the product's name and price.

2. Querying Users along with the Product Information

To allow the fetching of Users along with their associated Products under the "orders" field, I implemented a users query. When called, it fetches the Users from the database, and for each User, it also fetches and includes their associated Products under the "orders" field.

## Thought Process and Design Considerations

My primary goal while developing this project was to create a well-structured, readable, and testable codebase.

I adhered to the principles of clean code and the best practices recommended by NestJS and TypeScript. I separated concerns by creating individual services for each entity (User and Product) and made use of dependency injection, which made the code more maintainable and easier to test.

For handling the GraphQL API, I used the @nestjs/graphql module, which allows for the easy creation of GraphQL servers. I defined mutations and queries for the desired operations and connected them with the services I created.

Regarding testing, I used Jest to create unit tests for the User and Product services and resolvers. I leveraged the power of nestjs/testing to create isolated modules for each test, ensuring they do not affect each other. I also made use of Jest's mocking capabilities to mock the services in my resolver tests.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
