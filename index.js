require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const { defaultEndpoint } = require('./defaultEndpoint')
const { sendQueryWeb } = require('./sendQuery')
const { getTokenWeb } = require('./getToken')
const { getQueryStatusWeb } = require('./getQueryStatus')
const { getQueryResultsWeb } = require('./getQueryResults')

// Init globals
global.uuidToUser = {}

const endpoints = [
  ['/', defaultEndpoint],
  ['/sendQuery', sendQueryWeb],
  ['/getToken', getTokenWeb],
  ['/getQueryStatus', getQueryStatusWeb],
  ['/getQueryResults', getQueryResultsWeb],
];

app.options('*',cors());

app.use(express.json());

app.get(endpoints[0][0], (req,res) => {
    endpoints[0][1](req,res)
});

endpoints.forEach(element => {
    console.log("Registering", element[0], element[1])
    app.post(element[0], cors(), (req, res) => {
        element[1](req, res);
      })
});

app.listen(port, () => {
  console.log(`shrooms-v2-backend app listening on port ${port}`)
});
