var axios = require('axios');

async function _getQueryStatusWeb(req, res) {

if (!req.body) {
  res.send({"ERROR":"Invalid Body"})
  return;
}

if (!req.body.queryId) {
  res.send({"ERROR":"No queryId in body"})
  return;
}

var data = JSON.stringify({
  "jsonrpc": "2.0",
  "method": "getQueryRun",
  "params": [
    {
      "queryRunId": req.body.queryId
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

exports.getQueryStatusWeb = _getQueryStatusWeb
