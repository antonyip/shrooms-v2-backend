async function _sendQueryWeb(req,res) {

if (!req.body) {
  res.send({"ERROR":"Invalid Body"})
  return;
}

if (!req.body.query) {
  res.send({"ERROR":"No query in body"})
  return;
}

if (!req.body.token) {
  res.send({"ERROR":"Missing token"})
  return;
}

if (!global.uuidToUser[req.body.token]){
  console.log(global.uuidToUser)
  res.send({"ERROR":"Invalid ant-api-token"})
  return;
}

let buff = Buffer.from(req.body.query, 'base64url')
let queryStringDecoded = buff.toString('ascii')
queryStringDecoded += ";"

var axios = require('axios');
var data = JSON.stringify({
  "jsonrpc": "2.0",
  "method": "createQueryRun",
  "params": [
    {
      "resultTTLHours": 1,
      "maxAgeMinutes": 0,
      "sql": queryStringDecoded,
      "tags": {
        "source": "ant-flipside-api",
        "env": "dev"
      },
      "dataSource": "snowflake-default",
      "dataProvider": "flipside"
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

exports.sendQueryWeb = _sendQueryWeb
