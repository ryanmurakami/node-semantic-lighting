node-semantic-lighting
======================

Use the [Semantic Lighting API](https://lighting.kitt.ai) in your node projects. 

## Installation

Install via npm:

```sh
npm install semantic-lighting
```

## Usage

Include in your projects:

```javascript
var SemLight = require('semantic-lighting');
```

Create a lighting client:

```javascript
var myLight = new SemLight(apiKey, lightsArray);
```

Query the API:

```javascript
myLight.sendCommand('show me barney', callbackFunc);
```

Register a function to be called based on response:

```javascript
function colorHandler(lights, colors) {}

myLight.registerFunction('set_lights_to_color', colorHandler);

myLight.sendCommand('show me pee wee herman');
```