⚒️ REST API created with Node.js and Express.js using TypeScript

## 🚀 Getting Started

Clone the repository and install necessary dependencies

```bash
git clone https://github.com/classiuz/netse-api.git
# AND
cd netse-api
# AND
npm install
```

Create a .env file in the root of the project and replace the values with real values

```ini
# .env
HOSTNAME=http://localhost
PORT=3090
ROOT_PATH=/api

DB_HOST=localhost
DB_USER=myusername
DB_PASSWORD=mypassword
DB_NAME=mydatabase
```

For start the API in Development Mode run

```bash
npm run dev
```

For start the API in Production Mode run

```bash
npm run build 
# AND
npm run start
```

## 📖 Documentation

⌚ Developing...

## 📊 Test 
For testing you need to install [REST Client](https://github.com/Huachao/vscode-restclient) extension on your Visual Studio Code. Then add an key to .env file

```ini
# .env
...

TEST_KEY=TOKEN
```

Now you can test the api. Every file represents an route, for example "/api/users" is "users.http" file