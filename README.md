# Lovelystay.com
### Back-End Coding Test


## Setup
- `psql -c "CREATE ROLE lovely WITH PASSWORD 'stay' CREATEDB LOGIN SUPERUSER"`(**optional**)
- `psql -c 'CREATE DATABASE "lovely-challenge" OWNER lovely'`(**optional**)
- set your `.env` (use .env-example as a template)
- run `npm install` to install all necessary dependencies
- `db-migrate up` (I am using `db-migrate-pg` to run the migration)
- use `ts-node main.ts` to see available commands (examples will be provided in the next section)


## Examples

- Fetch and save a user from github.

  This will save the user info and their main programming languages
```
  ts-node main.ts get-user CarlosUvaSilva
```

- List all saved users.

```
  ts-node main.ts display-users
```

- List all saved users filtered by location (this is case insensitive and uses string matching).

```
  ts-node main.ts display-users \
  --location "Lisbon"
```

- List all saved users filtered by programming languages (this supports multiple languages matching all users with at least one language used).

```
  ts-node main.ts display-users \
  --languages "Ruby"
```
```
  ts-node main.ts display-users \
  --languages "Ruby,CSS"
```

- List all saved users filtered by programming languages and location.
```
  ts-node main.ts display-users \
  --location "Lisbon" --languages "Ruby,CSS"
```

## Tech choices
- Using `commander` as the tool to implement the command line options and arguments.
- `db-migrate-pg` as the lib to help create and run the migrations on the database.
- `pg-promise` as the db connector to run SQL requests. I have tried to do most request using raw SQL as I know from previous interviews this is the way Lovely Stay usually runs their code.

## Improvements
Some types are configured as `any` as my knowledge of Typescript is not great and I'm not sure what is the exact type of an error object. Would need to refresh this topic going forward.

I'm in the process of moving to and renovating my new house, due to time constraits I wasn't able to do tests. Which I believe are 100% necessary in a real scenario. Given more time I'd like to have tested some edge cases, specially for empty/null params
