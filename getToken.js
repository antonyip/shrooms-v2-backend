var crypto = require('crypto')
var axios = require('axios')

async function _sendQueryWeb(req,res) {

if (!req.body) {
  res.send({"ERROR":"Invalid Body"})
  return;
}

if (!req.body.username) {
  res.send({"ERROR":"No username in body"})
  return;
}

if (!req.body.password) {
  res.send({"ERROR":"No password in body"})
  return;
}

var options = {
  method: 'GET',
  url: 'https://nocodb.oracle.antonyip.com/api/v1/db/data/noco/prtquin5mgo4oz9/users/views/users',
  params: {offset: '0', limit: '25', where: ''},
  headers: {
    'xc-auth': process.env.NOCODB_API_KEY
  }
};

axios.request(options).then(function (response) {
/*
{"list":[{"Id":1,"username":"Antonidas","password":"password","queries":"1"},{"Id":3,"username":"user","password":"password","queries":"1"}],
"pageInfo":{"totalRows":2,"page":1,"pageSize":25,"isFirstPage":true,"isLastPage":true}}
*/
  var found = false
  response.data.list.forEach( obj => { if(obj.username === req.body.username && obj.password === req.body.password) {found = true} });
  if (found) {
    var uuid = crypto.randomUUID()
    global.uuidToUser[uuid] = req.body.username
    res.send({"token":uuid})
  }
   else {
    res.send({"ERROR":"Login Failed"})
  }
}).catch(function (error) {
  console.error(error);
});

}

exports.getTokenWeb = _sendQueryWeb
