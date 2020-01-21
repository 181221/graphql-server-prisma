# Graphql server with Prisma

## Dependencies

## Install

```sh
$ yarn
```

Then you can start the development server with.

```sh
$ docker-compose up -d
```

## Notes

1. you should fix volumes for docker-compose file
2. command should be change when server is production ready
   from

```sh
command: bash -c "yarn prisma deploy && yarn dev"

to

command: bash -c "yarn prisma deploy && yarn start"
```

also set PRISMA_MANAGEMENT_API_SECRET in Dockerfile-alternative to something other than my-secret

## Environment variables

1. touch a .env.development and a .env.production in root dir

| Key            |        Value        |
| -------------- | :-----------------: |
| APP_SECRET     |     very secret     |
| RADARR_API_KEY | your radarr api_key |
| EMAIL          |        email        |
| EMAIL_PASSWORD |      password       |

for nodemailer to send notifications.

### endpoints for server

playground at http://localost:4000
admin endpoint at http://localhost:4466/_admin
