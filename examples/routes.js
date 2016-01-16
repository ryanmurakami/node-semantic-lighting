var SemLight = require('../light.js');
  
var apiKey = '178391157a9c09b82c31edfd5f76e01885f73ec0',
  lights = ['kitchen', 'bedroom'],
  myLight = new SemLight(apiKey, lights);

module.exports = [{
    method: 'POST',
    path: '/light',
    handler: lightHandler
  },
  {
    method: 'GET',
    path: '/',
    handler: {
      file: './app/index.html'
    }
  },
  {
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'app'
      }
    }
  }];

function lightHandler (req, reply) {
  req.server.log('request: ' + req.payload.query);
  
  myLight.sendCommand(req.payload.query, function (err, data) {
    if (err) {
      console.error(err);

      if (err.statusCode) {
        return reply(Boom.create(err.statusCode));
      }

      return reply();
    }
    req.server.log('response: ' + JSON.stringify(data));
    return reply(data.api[1] ? data.api[1].params : data.api[0].params);
  });
}