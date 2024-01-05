# J WatchParty

A application were users can watch YouTube videos together live. A host can organize a watch party with other users. Pause/Play action will be live. If host pause the video then video will be paused for every user.

## Installation & Run

Cloning the git monorepo into the local machine.

```bash
git clone git@github.com:JanayAlam/j-watchprarty.git j-watchprarty
```

Installing packages.

```bash
cd j-watchprarty
yarn
```

### Installing the backend server

```bash
cd ./packages/server-api
cp default.env .env
mkdir ./public
mkdir ./public/images
```

Now update the `.env` file's environmental variable. (See the `Environment Variable` section for details)

### Running the application

To run the both fronend and backend application run the following command.

```bash
yarn run dev
```

## Running Tests

To run tests for both the frontend and backend application run the following command.

```bash
yarn run test
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### Backend Server

`.env` file-

| Variable Name | Description                                    |
| :------------ | :--------------------------------------------- |
| `NODE_ENV`    | Node environment (development/production/test) |
| `PORT`        | Port number for backend server                 |
| `DB_URI`      | Your mongodb database connection string        |
| `JWT_SECRET`  | Your generated JWT secret key                  |

## Documentation

- **Rest API Documentation with Swagger:** /api-docs
- **React Story Book**

For API reference visit [here](./packages/server-api/README.md).
