var https = require('https');

var lightingHostname = 'lighting.kitt.ai'
  lightingPath = '/api/v1/',
  functions = [];

// SemLight API

function SemLight(apiKey, lights) {
  this.apiKey = apiKey;
  this.lights = lights;
}

SemLight.prototype.functionKeys = {
  turnOnLights: 'turn_on_lights',
  turnOffLights: 'turn_off_lights',
  setLightsToColor: 'set_lights_to_color',
  blinkLights: 'blink_lights',
  adjustBrightness: 'adjust_brightness',
  colorloop: 'colorloop',
  retrieveColorFor: 'retrieve_color_for'
};

SemLight.prototype.sendCommand = function(command, callback) {
  var body = {
    text: command,
    lights: this.lights
  },
    options = {
      hostname: lightingHostname,
      path: lightingPath,
      method: 'POST',
      port: 443,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + this.apiKey
      }
    };
  var req = https.request(options, function (res) {
    var d = '';
    res.on('data', function (data) {
      d += data;
    });
    res.on('end', function () {
      processResponseData(res.statusCode, d, callback);
    });
  }).on('error', function (err) {
    callback(err);
  });

  // POST the data
  req.write(JSON.stringify(body));
  req.end();
};

SemLight.prototype.registerFunction = function(key, func) {
  if (functions[key]) {
    console.warn('Function already registered for ' + key + '. Replacing...');
  }
  
  functions[key] = func;
};

// private functions

// called with response data
function processResponseData (statusCode, data, callback) {
  var parsed;

  if (statusCode !== 200) {
    callback({ statusCode: statusCode, msg: data });
  } else {
    parsed = JSON.parse(data);

    if (!parsed.success) {
      callback(parsed);
    } else {
      resolveCallback(callback, parsed);
    }
  }
}

// used to decide to call registered func or callback
function resolveCallback (callback, data) {
  var res = data.api[1] || data.api[0],
    params = [];

  if (functions[res.func]) {
    // function is registered, so call it
    for (var k in res.params) {
      params.push(res.params[k]);
    }
    functions[res.func].apply(this, params);
  } else {
    // no match, so send back the whole shebang
    callback(null, data);
  }
}

module.exports = SemLight;