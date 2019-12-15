const express = require('express');
const graphqlHTPP = require('express-graphql');
const schema = require('./schema/schema')
const app = express();

app.use('/graphql', graphqlHTPP({
schema
})); //memberikan route

app.listen(4040, () => {
    console.log("Server running in port 4040")
});

