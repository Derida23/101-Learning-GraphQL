const express = require('express');
const graphqlHTPP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(
  "mongodb+srv://admin:qwerty123@niomicgraphql-b7hi3.mongodb.net/test?retryWrites=true&w=majority"
);

mongoose.connection.once('open', () => {
    console.log('Server running with Mongoose // 4040')
})

app.use('/graphql', graphqlHTPP({
schema,
graphiql : true
})); //memberikan route

app.listen(4040, () => {
    console.log("Server running in port 4040")
});

