# node-auth

Authentication boilerplate for Node.js.

## Development

First, create a `.env` file:

```sh
cp .env.example .env
```

Some helpful npm scripts:
```sh
    "start":              "nodemon index.js",
    "db:create":          "npx sequelize-cli db:create",
    "migration":          "npx sequelize-cli db:migrate",
    "undo:migration":     "npx sequelize-cli db:migrate:undo",
    "undo:all:migration": "npx sequelize-cli db:migrate:undo:all",
    "make:seed":          "npx sequelize-cli seed:generate --name init",
    "db:seed:all":        "npx sequelize-cli db:seed:all",
    "db:migrate:seed":    "npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all",
    "db:reset":           "npx sequelize-cli db:drop && npx sequelize-cli db:create && npx sequelize-cli db:migrate && npx sequelize-cli      db:seed:all"
```

Finally, boot the server:

```sh
npm start
```