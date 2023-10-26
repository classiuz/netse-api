⚒️ REST API created with Node.js and Express.js using TypeScript

## 🚀 Getting Started

Clone the repository and install necessary dependencies.

```bash
git clone https://github.com/classiuz/netse-api.git
# AND
cd netse-api
# AND
npm install
```

Create a `.env` file in the root of the project and replace the values with real values.

```ini
# .env
URL=http://localhost
PORT=3090
ROOT_PATH=/api

DB_HOST=databaseHost
DB_USER=databaseUsername
DB_PASSWORD=databasePassword
DB_NAME=databaseName

API_KEY=KEY

SECRET_KEY=KEYWORD
```

For start the API in Development Mode run.

```bash
npm run dev
```

For start the API in Production Mode run.

```bash
npm run build 
# AND
npm run start
```

For Production purposes, is highly recommended install [pm2](https://github.com/Unitech/pm2) package for process management. And run production command to clean unnecessary data.

```bash
npm run production
```

## 📖 Documentation

### 🧮 Endpoints Table

| Route         | Method        | Endpoint              | Authentication     | Description                        |
| ------------- | ------------- | -------------         | -------------      | -------------                      |
| /users        | `GET`         | /users                | `API Token`        | Get all users                      |
| /users        | `GET`         | /users/:username      | `API Token`        | Get user by username               |
| /users        | `POST`        | /users                | `API Token`        | Create a new user                  |
| /users        | `DELETE`      | /users/:username      | `API Token`        | Delete a user by username          |
| /users        | `PATCH`       | /users/:username      | `API Token`        | Update a user by username          |
| /tokens       | `GET`         | /tokens               | `API Token`        | Get all tokens                     |
| /tokens       | `POST`        | /tokens               | `API Token`        | Create a new token                 |
| /tokens       | `DELETE`      | /tokens/:tokenName    | `API Token`        | Delete a token by tokenName        |
| /auth         | `GET`         | /auth                 | `API Token`        | Validate user authentication       |
| /blacklist    | `GET`         | /blacklist            | `API Token`        | Get all blacklist                  |
| /blacklist    | `GET`         | /blacklist/:clientId  | `API Token`        | Get blacklist by clientId          |
| /blacklist    | `POST`        | /blacklist            | `API Token`        | Create a new blacklist             |
| /blacklist    | `DELETE`      | /blacklist/:clientId  | `API Token`        | Delete a blacklist by clientId     |
| /blacklist    | `PATCH`       | /blacklist/:clientId  | `API Token`        | Update a blacklist by clientId     |
| /clients      | `GET`         | /clients              | `API Token`        | Get all clients                    |
| /clients      | `GET`         | /clients/:clientId    | `API Token`        | Get client by clientId             |
| /clients      | `POST`        | /clients              | `API Token`        | Create a new client                |
| /clients      | `DELETE`      | /clients/:clientId    | `API Token`        | Delete a client by clientId        |
| /clients      | `PATCH`       | /clients/:clientId    | `API Token`        | Update a client by clientId        |



## 📊 Test 
For testing you need to install [REST Client](https://github.com/Huachao/vscode-restclient) extension on your Visual Studio Code. Then check the key on `.env` file is valid key.

```ini
# .env
...

KEY=VALID KEY
```

Now you can test the api. Every file inside `test` folder represents an route, for example `/api/users` it is `users.http` file.