# Message Web app

Application messaging in organization with client-server architecture, using ReactJs for FE, ExpressJS for BE and database Mysql

# Prerequisites

You need to install Node.js and NPM on your desktop. You can download Node at this [link](https://nodejs.org/en)

If you wish to check the existing version of Node and NPM on your desktop, run the command:

```bash
node -v
npm -v
```

# Installation

Inside backend and frontend folder run this command to install neccesary library:

```bash
npm install
```

# Run the app

Create a mysql database and config the database variables in `knex.js` file

Run these commands from backend folder to create table in database:

```bash
npm run migrate
npm run seed
```

Run this command in both backend and frontend folder to start the server:

```bash
npm start
```
