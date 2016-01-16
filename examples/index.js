var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 8000 });

var goodOptions = {
    opsInterval: 1000,
    reporters: [{
      reporter: require('good-file'),
      events: { log: '*' },
      config: './logs/light.log'
    }]
  }, 
  goodRegister = {
    register: require('good'),
    options: goodOptions
  };

server.register([require('inert'), goodRegister], function (err) {
  if (err) throw err;

  server.route(require('./routes.js'));

  server.start();
});
