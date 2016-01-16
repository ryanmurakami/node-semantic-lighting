node-semantic-lighting
======================

Use the [Semantic Lighting API](https://lighting.kitt.ai) in your node projects. 

## Installation

Install via npm:

```sh
npm install semantic-lighting
```

Include in your projects:

```javascript
var SemLight = require('semantic-lighting');
```

Create a lighting client:

```javascript
var light = new SemLight(apiKey, lightsArray);
```

Query the API:

```javascript
light.sendCommand('show me barney', callbackFunc);
```