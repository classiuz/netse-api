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

### 🔐 Authentication

Most routes are protected and an API KEY will need to be provided to access the information. The API KEY can be sent in three different ways:

1. Using Query params with `?key=VALUE`. For example

```htth
https://localhost:3090/api/users?key=KEY
```

2. Using `Authorization` header. For example
```http
GET https://localhost:3090/api/users
Authorization: KEY
```

3. Using the `body` of the request. For example
```http
GET https://localhost:3090/api/users
content-type: application/json

{
  "key": "KEY"  
}
```

### 🧮 Endpoints Table

| Route                                   | Method        | Endpoint                      | Authentication     | Description                                        |
| -------------                           | ------------- | -------------                 | -------------      | -------------                                      |
| [/users](#users)                        | `GET`         | /users                        | `API Token`        | Get all users                                      |
| [/users](#users)                        | `GET`         | /users/:username              | `API Token`        | Get user by username                               |
| [/users](#users)                        | `POST`        | /users                        | `API Token`        | Create a new user                                  |
| [/users](#users)                        | `DELETE`      | /users/:username              | `API Token`        | Delete a user by username                          |
| [/users](#users)                        | `PATCH`       | /users/:username              | `API Token`        | Update a user by username                          |
| [/tokens](#tokens)                      | `GET`         | /tokens                       | `API Token`        | Get all tokens                                     |
| [/tokens](#tokens)                      | `POST`        | /tokens                       | `API Token`        | Create a new token                                 |
| [/tokens](#tokens)                      | `DELETE`      | /tokens/:name                 | `API Token`        | Delete a token by token name                       |
| [/auth](#auth)                          | `GET`         | /auth                         | `API Token`        | Validate user authentication                       |
| [/blacklist](#blacklist)                | `GET`         | /blacklist                    | `API Token`        | Get all blacklist                                  |
| [/blacklist](#blacklist)                | `GET`         | /blacklist/:clientId          | `API Token`        | Get blacklist by clientId                          |
| [/blacklist](#blacklist)                | `POST`        | /blacklist                    | `API Token`        | Create a new blacklist                             |
| [/blacklist](#blacklist)                | `DELETE`      | /blacklist/:clientId          | `API Token`        | Delete a blacklist by clientId                     |
| [/blacklist](#blacklist)                | `PATCH`       | /blacklist/:clientId          | `API Token`        | Update a blacklist by clientId                     |
| [/services](#services)                  | `GET`         | /services                     | `API Token`        | Get all services                                   |
| [/services](#services)                  | `GET`         | /services/:name               | `API Token`        | Get service by name                                |
| [/services](#services)                  | `POST`        | /services                     | `API Token`        | Create a new service                               |
| [/services](#services)                  | `DELETE`      | /services/:name               | `API Token`        | Delete a service by name                           |
| [/services](#services)                  | `PATCH`       | /services/:name               | `API Token`        | Update a service by name                           |
| [/plans](#plans)                        | `GET`         | /plans                        | `API Token`        | Get all plans                                      |
| [/plans](#plans)                        | `GET`         | /plans/:name                  | `API Token`        | Get plan by name                                   |
| [/plans](#plans)                        | `POST`        | /plans                        | `API Token`        | Create a new plan                                  |
| [/plans](#plans)                        | `DELETE`      | /plans/:name                  | `API Token`        | Delete a plan by name                              |
| [/plans](#plans)                        | `PATCH`       | /plans/:name                  | `API Token`        | Update a plan by name                              |
| [/additionals](#additionals)            | `GET`         | /additionals                  | `API Token`        | Get all additionals                                |
| [/additionals](#additionals)            | `GET`         | /additionals/:name            | `API Token`        | Get additional by name                             |
| [/additionals](#additionals)            | `POST`        | /additionals                  | `API Token`        | Create a new                                       |
| [/additionals](#additionals)            | `DELETE`      | /additionals/:name            | `API Token`        | Delete a additional by name                        |
| [/additionals](#additionals)            | `PATCH`       | /additionals/:name            | `API Token`        | Update a additional by name                        |
| [/services-areas](#services-areas)      | `GET`         | /services-areas               | `API Token`        | Get all services areas                             |
| [/services-areas](#services-areas)      | `GET`         | /services-areas/:name         | `API Token`        | Get services arreas by name                        |
| [/services-areas](#services-areas)      | `POST`        | /services-areas               | `API Token`        | Create a new services areas                        |
| [/services-areas](#services-areas)      | `DELETE`      | /services-areas/:name         | `API Token`        | Delete a services areas by name                    |
| [/services-areas](#services-areas)      | `PATCH`       | /services-areas/:name         | `API Token`        | Update a services areas by name                    |
| [/sales](#sales)                        | `GET`         | /sales                        | `API Token`        | Get all sales                                      |
| [/sales](#sales)                        | `GET`         | /sales/:id                    | `API Token`        | Get sale by id                                     |
| [/sales](#sales)                        | `POST`        | /sales                        | `API Token`        | Create a new sale                                  |
| [/sales](#sales)                        | `DELETE`      | /sales/:id                    | `API Token`        | Delete a sale by id                                |
| [/sales](#sales)                        | `PATCH`       | /sales/:id                    | `API Token`        | Update a sale by id                                |

### 🔀 Routes

#### /users

⌚ Developing...

#### /tokens

⌚ Developing...

#### /auth

⌚ Developing...

#### /blacklist

⌚ Developing...

#### /clients

⌚ Developing...

#### /services

⌚ Developing...

#### /plans

⌚ Developing...

#### /additionals

⌚ Developing...

## 📊 Test 
For testing you need to install [REST Client](https://github.com/Huachao/vscode-restclient) extension on your Visual Studio Code. Then check the key on `.env` file is valid key.

```ini
# .env
...

KEY=VALID KEY
```

Now you can test the api. Every file inside `test` folder represents an route, for example `/api/users` is `users.http` file, `/api/services` is `services.http` file and so on.