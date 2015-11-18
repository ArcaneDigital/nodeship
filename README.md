# nodeship
Node wrapper for Codeship API

[Codeship API Docs](https://codeship.com/documentation/integrations/api/)
You can get your API key on [your account page](https://codeship.com/user/edit)

## Install

```sh
npm install nodeship
```

## Examples

```javascript
var NodeShip = require('nodeship');

var nodeShip = new NodeShip({
  apiKey : 'APIKEY'
});

nodeShip.projects(function(response){
    console.log(response);
});
nodeShip.project(114064, function(response){
    console.log(response);
});
nodeShip.builds(114064, function(response){
    console.log(response);
});
nodeShip.buildRestart(9655702, function(response){
    console.log(response);
});
```