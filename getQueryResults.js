async function _getQueryResultsWeb(req,res) {

if (!req.body) {
  res.send({"ERROR":"Invalid Body"})
  return;
}

if (!req.body.queryId) {
  res.send({"ERROR":"No queryId in body"})
  return;
}

var axios = require('axios');
var data = JSON.stringify({
  "jsonrpc": "2.0",
  "method": "getQueryRunResults",
  "params": [
    {
      "queryRunId": req.body.queryId,
      "format": "json",
      "page": {
        "number": 1,
        "size": 1
      }
    }
  ],
  "id": 1
});

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: 'https://api-v2.flipsidecrypto.xyz/json-rpc',
  headers: { 
    'Content-Type': 'application/json', 
    'x-api-key': process.env.FLIPSIDE_API_KEY
  },
  data : data
};

axios(config)
.then(function (response) {
res.send(response.data)
})
.catch(function (error) {
  console.log(error);
});
}

exports.getQueryResultsWeb = _getQueryResultsWeb
