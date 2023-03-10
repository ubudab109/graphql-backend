# Graphql-Backend

## TECH STACK
- Node.js
- TypeScript
- Sequelize.js
- GraphQL
- GraphiQL
- Apollo Server
- Postgree SQL

## REQUIREMENTS
- NODE 16.15.0+
- NPM 8.55 or Yarn
- Postgree SQL
- Typescript

## CONFIGURATION
- Change name `.env.example` to `.env`
- Change the env value with Your Own
- Run `npm install` or `yarn install` if You prefer Yarn
- Run `npm run start:dev` to run this project in Your local environment
- By default, this project running on port 5000. You can change this port on `.env` with `APP_PORT` key

## ENDPOINT
- `/graphql` is the GRAPHQL Endpoint

![image](https://user-images.githubusercontent.com/62287144/216623319-efb93d53-05aa-421c-b67a-efe474b1b178.png)

- `/graphiql` is the GRAPHQL Interface Endpoint

![image](https://user-images.githubusercontent.com/62287144/216623408-69b98ac3-cf75-4784-99e5-5fd253ed6395.png)

## Query & Mutation
- First thing, You need to login before using any Query and Mutation. Using this credentials:
`username : user`
`password : 123123`

![image](https://user-images.githubusercontent.com/62287144/216716651-849ca518-fdb8-4746-bee2-2decf457f163.png)

- After get the token, You can use that in the headers 

![image](https://user-images.githubusercontent.com/62287144/216716785-4d290bf9-5749-4f53-8034-48f79c067bca.png)



Link Demo : https://backend-graphql-test.herokuapp.com/graphiql
