# Graphql server with Prisma

## Dependencies

## Install

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

| Key                  |        Value         |
| -------------------- | :------------------: |
| APP_SECRET           |     very secret      |
| RADARR_API_KEY       | your radarr api_key  |
| EMAIL                |        email         |
| EMAIL_PASSWORD       |       password       |
| WEB_PUSH_PRIVATE_KEY | private web-push-key |
| WEB_PUSH_PUBLIC_KEY  | public web-push-key  |

Email and password is for nodemailer to send notifications.

2. prisma configurations at prisma/prisma.yml

## Structure

server starts at src/index.ts.
setInterval function is scanning for movies in radarr to see if they are finished. If they are a user gets a notification via mail iff they have notification set to true.

```sh
const movieUpdatePushRequest = async ()
```

is a method that subscribes to a movie update. When server sees that a movie has been downloaded, it will update the movie and movieUpdatePushRequest will run and send push request to the user via mail.

For push request you should set up a mail service

### Endpoints for server

1. Playground at http://localost:4000
2. Admin endpoint at http://localhost:4466/_admin
