'use strict';
var   request         = require('request'),
      _               = require('underscore'),
      API_URL         = 'https://codeship.com/api/v1/';

var NodeShip  = {
  pagedBuilds: [],
  projects : function (callback) {
    var url = API_URL + "projects.json?api_key=" + this.apiKey;

    request({url:url, json:true}, function (err,httpResponse,body) {
      return callback(body);
    });
  },
  project : function (projectID, callback) {
    if (!projectID) throw 'must specify project id';

    var url = API_URL + "projects/" + projectID + ".json?api_key=" + this.apiKey;
    request({url:url, json:true}, function (err,httpResponse,body) {
      return callback(body);
    });
  },
  builds : function (projectID, callback) {
    if (!projectID) throw 'must specify project id';

    var page = 1;
    var url = API_URL + "builds?api_key=" + this.apiKey + "&project_id=" + projectID;

    buildRequest(
      url,
      1,
      function(results){
        for(var r in results.builds){
          NodeShip.pagedBuilds.push(results.builds[r]);
        }
      },
      function () {
         callback(NodeShip .pagedBuilds);
      }
    );

  },
  buildRestart : function (buildID, callback) {
    if (!buildID) throw 'must specify build id';

    var url = API_URL + "builds/" + buildID + "/restart.json?api_key=" + this.apiKey;
    request.post({url:url, json:true}, function (err,httpResponse,body) {
      return callback(body);
    });
  }


};

function buildRequest(url, page, fn, callback) {
  var pagedURL = url + '&page=' + page;
  request.get({
      url: pagedURL,
      json: true
  }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          fn(body);
          if(body.builds.length) {
            buildRequest(url, ++page, fn, callback);
          } else {
            callback();
          }
      } else {
          throw error;
      }

  });
}
module.exports = NodeShip;